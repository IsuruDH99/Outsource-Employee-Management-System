// import React, { useState } from 'react';

// const Productedit = () => {
//   const [workerType, setWorkerType] = useState('Target');
//   const [hourlyRate, setHourlyRate] = useState(0);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Select Worker Type</h2>
//       <select
//         value={workerType}
//         onChange={(e) => setWorkerType(e.target.value)}
//         className="border p-2 rounded mb-4 w-full"
//       >
//         <option value="Target">Target</option>
//         <option value="Day Pay">Day Pay</option>
//       </select>

//       {workerType === 'Target' && (
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-6 py-3">Product Code</th>
//                 <th scope="col" className="px-6 py-3">Product Name</th>
//                 <th scope="col" className="px-6 py-3">Price</th>
//                 <th scope="col" className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
//                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">P001</th>
//                 <td className="px-6 py-4">Apple MacBook Pro 17"</td>
//                 <td className="px-6 py-4">$2999</td>
//                 <td className="px-6 py-4 flex space-x-3">
//                   <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline border-2 border-blue-600 rounded-lg px-4 py-2">Edit</button>
//                   <button className="font-medium text-red-600 dark:text-red-500 hover:underline border-2 border-red-600 rounded-lg px-4 py-2">Delete</button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}

//       {workerType === 'Day Pay' && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold mb-4">Day Pay Settings</h2>
//           <label className="block">Payment per Hour:</label>
//           <input
//             type="number"
//             min="0"
//             value={hourlyRate}
//             onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
//             className="border p-2 rounded mb-4 w-full"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Productedit;

import React, { useState } from 'react';
import Target from '../components/Target';
import DayPay from '../components/DayPay';

const ProductEdit = () => {
  const [selectedOption, setSelectedOption] = useState('target');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Edit</h1>

      {/* Navbar-like Selection */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-4">
          <button
            onClick={() => setSelectedOption('target')}
            className={`px-4 py-2 font-medium ${
              selectedOption === 'target'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            Target
          </button>
          <button
            onClick={() => setSelectedOption('daypay')}
            className={`px-4 py-2 font-medium ${
              selectedOption === 'daypay'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            DayPay
          </button>
        </nav>
      </div>

      {/* Conditional Rendering */}
      {selectedOption === 'target' && <Target />}
      {selectedOption === 'daypay' && <DayPay />}
    </div>
  );
};

export default ProductEdit;
