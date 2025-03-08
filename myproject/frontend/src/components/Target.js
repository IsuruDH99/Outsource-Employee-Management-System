import React from 'react';

const Target = ({ setIsEditing, setProductDetails }) => {
  const handleEditClick = () => {
    // Open the edit form and pass the selected product details
    setProductDetails({
      productCode: 'P001',
      productName: 'Apple MacBook Pro 17"',
      price: 2999,
    });
    setIsEditing(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Product Code</th>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">Price </th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              P001
            </th>
            <td className="px-6 py-4">Apple MacBook Pro 17"</td>
            <td className="px-6 py-4">2999</td>
            <td className="px-6 py-4 flex space-x-3">
              <button
                onClick={handleEditClick}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-2 border-blue-600 rounded-lg px-4 py-2"
              >
                Edit
              </button>
              <button className="font-medium text-red-600 dark:text-red-500 hover:underline border-2 border-red-600 rounded-lg px-4 py-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Target;
