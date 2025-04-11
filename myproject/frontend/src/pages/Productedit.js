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

      

      {/* Success Message */}
      {isSaved && <p className="mt-2 text-green-600">Successfully saved</p>}
    </div>
  );
};

export default ProductEdit;
