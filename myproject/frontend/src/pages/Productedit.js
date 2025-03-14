import React, { useState, useEffect } from "react";
import axios from "axios";
import Target from "../components/Target";
import DayPay from "../components/DayPay";

const ProductEdit = () => {
  const [selectedOption, setSelectedOption] = useState("target");
  const [isEditing, setIsEditing] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [productNo, setProductNo] = useState(null); // Store selected productNo

  // Fetch product details when `isEditing` is true
  useEffect(() => {
    if (isEditing && productNo) {
      axios
        .get(`http://localhost:3001/target/product/${productNo}`)
        .then((response) => {
          setProductDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [isEditing, productNo]); // Runs when isEditing or productNo changes
  console.log(productDetails);
  // Function to handle saving edited product
  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/target/update-product/${productDetails.productNo}`,
        {
          ProductName: productDetails.ProductName, // Fix casing issue
          price: productDetails.price,
        }
      );

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      setIsEditing(false); // Close the popup after saving
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Rate Update</h1>

      {/* Navbar-like Selection */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-4">
          <button
            onClick={() => setSelectedOption("target")}
            className={`px-4 py-2 font-medium ${
              selectedOption === "target"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Target
          </button>
          <button
            onClick={() => setSelectedOption("daypay")}
            className={`px-4 py-2 font-medium ${
              selectedOption === "daypay"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            DayPay
          </button>
        </nav>
      </div>

      {/* Conditional Rendering */}
      {selectedOption === "target" && (
        <Target
          setIsEditing={setIsEditing}
          setProductDetails={setProductDetails}
          setProductNo={setProductNo} // Pass productNo setter
        />
      )}
      {selectedOption === "daypay" && (
        <DayPay priceLabel={"Payment per Hour (Rs.)"} noArrows={true} />
      )}

      {/* Popup Form to Edit Product */}
      {/* {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Code
              </label>
              <input
                type="text"
                value={productDetails.productNo || ""}
                readOnly
                className="mt-1 block w-full p-2 border bg-gray-100 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={productDetails.productName || ""}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    productName: e.target.value,
                  })
                }
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price (Rs.)
              </label>
              <input
                type="number"
                value={productDetails.price || ""}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    price: e.target.value,
                  })
                }
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Success Message */}
      {isSaved && <p className="mt-2 text-green-600">Successfully saved</p>}
    </div>
  );
};

export default ProductEdit;
