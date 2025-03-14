import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const Target = ({ setIsEditing, setProductDetails }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    productNo: "",
    ProductName: "",
    price: "",
  });

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
    setEditingProduct(product);
    setUpdatedProduct(product);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3001/target/update-product/${editingProduct.productNo}`,
        updatedProduct
      );
      setProducts(
        products.map((p) =>
          p.productNo === editingProduct.productNo ? updatedProduct : p
        )
      );
      setEditingProduct(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product.");
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white dark:bg-gray-800 p-6">
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300 rounded-lg border-collapse">
        <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-blue-500 to-indigo-600 dark:bg-gray-700 dark:text-gray-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product Code
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
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
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {product.productNo}
                </th>
                <td className="px-6 py-4">{product.ProductName}</td>
                <td className="px-6 py-4">${product.price}</td>
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
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingProduct && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold">Edit Product</h3>
          <input
            type="text"
            value={updatedProduct.ProductName}
            readOnly
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, ProductName: e.target.value })}
            className="w-full p-2 mt-2 border rounded-lg"
          />
          <input
            type="number"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
            className="w-full p-2 mt-2 border rounded-lg"
          />
          <button
            onClick={handleUpdate}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      )}
    </div>
  );
};

export default Target;
