import React, { useState, useEffect } from "react";
import axios from "axios";
import Target from "../components/Target";
import DayPay from "../components/DayPay";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductEdit = () => {
  const [selectedOption, setSelectedOption] = useState("target");
  const [isEditing, setIsEditing] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [productNo, setProductNo] = useState(null);

  useEffect(() => {
    if (isEditing && productNo) {
      axios
        .get(`http://localhost:3001/target/product/${productNo}`)
        .then((response) => {
          setProductDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
          toast.error("Failed to load product details.");
        });
    }
  }, [isEditing, productNo]);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/target/update-product/${productDetails.productNo}`,
        {
          ProductName: productDetails.ProductName,
          price: productDetails.price,
        }
      );

      toast.success("Successfully saved");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-2 pt-3">
      <div className="w-full max-w-4xl mx-auto bg-white p-1 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-800 pt-3">
          Product Rate Update
        </h1>

        {/* Navbar-like Selection */}
        <div className="border-b border-gray-200 mb-2 pt-3 pb-4 ">
          <nav className="flex justify-center space-x-3">
            <button
              onClick={() => setSelectedOption("target")}
              className={`px-4 py-2 rounded font-medium text-sm ${
                selectedOption === "target"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-blue-100 "
              }`}
            >
              Target
            </button>
            <button
              onClick={() => setSelectedOption("daypay")}
              className={`px-4 py-2 rounded font-medium text-sm ${
                selectedOption === "daypay"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-blue-100"
              }`}
            >
              DayPay
            </button>
          </nav>
        </div>

        {/* Conditional Rendering */}
        <div className="mb-4">
          {selectedOption === "target" && (
            <Target
              setIsEditing={setIsEditing}
              setProductDetails={setProductDetails}
              setProductNo={setProductNo}
            />
          )}
          {selectedOption === "daypay" && (
            <DayPay priceLabel={"Payment per Hour (Rs.)"} noArrows={true} />
          )}
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: "65px" }}
      />
    </div>
  );
};

export default ProductEdit;
