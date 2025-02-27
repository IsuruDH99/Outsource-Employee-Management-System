import React from "react";

const Workerview = () => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                EPF
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[{ epf: "12345", name: "John Doe" }, { epf: "67890", name: "Jane Smith" }, { epf: "11223", name: "Alex Johnson" }].map((worker, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {worker.epf}
                </th>
                <td className="px-6 py-4">{worker.name}</td>
                <td className="px-6 py-4">
                  <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-800 focus:outline-none">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workerview;
