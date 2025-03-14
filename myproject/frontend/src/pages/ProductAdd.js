import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const [productNo, setproductNo] = useState("");
  const [ProductName, setProductName] = useState("");
  const [price, setprice] = useState("");
  const[message,setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/target/add-products", {
        productNo: productNo,
        ProductName: ProductName,
        price : price,
      });

      if (response.status === 201) {
        setMessage("Product added successfully!");
        setproductNo('');
        setProductName('');
        setprice('');
      }
    } catch (error) {
      setMessage("Error added");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Products</h2>

        {message && (
          <p className="text-center text-sm text-red-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="productNo"
              className="block text-sm font-medium text-gray-600"
            >
              Product No
            </label>
            <input
              type="text"
              id="productNo"
              value={productNo}
              onChange={(e) => setproductNo(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>

          <div>
            <label
              htmlFor="ProductName"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="ProductName"
              value={ProductName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
