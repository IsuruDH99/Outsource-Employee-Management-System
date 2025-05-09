import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Modal from "react-modal";

// Make sure to bind modal to your appElement
Modal.setAppElement("#root");

const Target = ({ setIsEditing, setProductDetails }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    productNo: "",
    ProductName: "",
    price: "",
    packSize: "",
    hourlyTarget: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/target/get-products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load product data.");
      }
    };
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setUpdatedProduct(product);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3001/target/update-product/${updatedProduct.productNo}`,
        updatedProduct
      );
      setProducts(
        products.map((p) =>
          p.productNo === updatedProduct.productNo ? updatedProduct : p
        )
      );
      setIsModalOpen(false);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/target/delete-product/${updatedProduct.productNo}`
      );
      setProducts(
        products.filter((p) => p.productNo !== updatedProduct.productNo)
      );
      setIsModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    }
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      maxWidth: "600px",
      borderRadius: "0.5rem",
      backgroundColor: "#f8fafc",
      border: "none",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white dark:bg-gray-800 p-6">
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full text-base text-left text-black  rounded-lg border-collapse">
        <thead className="text-base text-gray-700  bg-gradient-to-r from-blue-500 to-indigo-400 dark:bg-gray-600 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product Code
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Rate
            </th>
            <th scope="col" className="px-6 py-3">
              Pack Size
            </th>
            <th scope="col" className="px-6 py-3">
              Hourly Target
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.productCode}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ease-in-out"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-black dark:text-white"
                >
                  {product.productNo}
                </th>
                <td className="px-6 py-4">{product.ProductName}</td>
                <td className="px-6 py-4">Rs. {product.price}</td>
                <td className="px-6 py-4 text-center">{product.packSize}</td>
                <td className="px-6 py-4 text-center">{product.hourlyTarget}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="flex items-center space-x-2 font-medium text-blue-600 dark:text-blue-400 hover:underline border-2 border-blue-600 rounded-lg px-4 py-2 transform transition-all duration-300 hover:scale-105"
                  >
                    <FaEdit className="text-lg" />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
          setDeleteConfirm(false);
        }}
        style={modalStyles}
        contentLabel="Edit Product Modal"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Edit Product
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product Code</label>
            <input
              type="text"
              value={updatedProduct.productNo}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={updatedProduct.ProductName}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price (Rs.)</label>
            <input
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  price: e.target.value,
                })
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Pack Size</label>
            <input
              type="text"
              value={updatedProduct.packSize}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Hourly Target</label>
            <input
              type="number"
              value={updatedProduct.hourlyTarget}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  hourlyTarget: e.target.value,
                })
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-between">
            <div>
              {!deleteConfirm ? (
                <button
                  onClick={() => setDeleteConfirm(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <FaTrash className="inline mr-2" />
                  Delete Product
                </button>
              ) : (
                <div className="space-x-2">
                  <span className="text-red-600 font-medium">
                    Are you sure?
                  </span>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Confirm Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {!deleteConfirm && (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setDeleteConfirm(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Product
                </button>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          Operation completed successfully!
        </div>
      )}
    </div>
  );
};

export default Target;
