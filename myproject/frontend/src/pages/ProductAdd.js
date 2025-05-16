import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductAdd = () => {
  const [productNo, setproductNo] = useState("");
  const [ProductName, setProductName] = useState("");
  const [price, setprice] = useState("");
  const [packSize, setpackSize] = useState("");
  const [hourlyTarget, sethourlyTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("Please login first");
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/target/add-products",
        {
          productNo,
          ProductName,
          price,
          packSize,
          hourlyTarget,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        toast.success("Product added successfully!");
        setproductNo("");
        setProductName("");
        setprice("");
        setpackSize("");
        sethourlyTarget("");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || "Error adding product.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative">

        {/* Toast container */}
        <ToastContainer position="top-center" autoClose={1200} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover style={{ marginTop: "65px" }} />

        <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Add Products</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-bold text-1xl">
          {[
            { id: "productNo", label: "Product No", value: productNo, setter: setproductNo },
            { id: "ProductName", label: "Product Name", value: ProductName, setter: setProductName },
            { id: "price", label: "Rate", value: price, setter: setprice },
            { id: "packSize", label: "Pack Size", value: packSize, setter: setpackSize },
            { id: "hourlyTarget", label: "Hourly Target", value: hourlyTarget, setter: sethourlyTarget },
          ].map(({ id, label, value, setter }) => (
            <div key={id} className="grid grid-cols-3 items-center gap-4">
              <label htmlFor={id} className="text-m font-medium text-gray-700">
                {label}
              </label>
              <input
                type="text"
                id={id}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                className="col-span-2 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
