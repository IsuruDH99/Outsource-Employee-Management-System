import React, { useState } from 'react';

const DayPay = ({ priceLabel, noArrows }) => {
  const [price, setPrice] = useState('');

  const handleClear = () => {
    setPrice('');
  };

  const handleSave = () => {
    alert('Payment per Hour saved: ' + price);
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-lg font-semibold">{priceLabel}</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="p-2 border border-gray-300 rounded w-32"  // Reduced width
        style={noArrows ? { '-moz-appearance': 'textfield', '-webkit-appearance': 'none', appearance: 'none' } : {}}
      />
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DayPay;


 // Make sure to export it as default


// export default DayPay;
// import React from 'react';

// const DayPay = ({ priceLabel, noArrows }) => {
//   return (
//     <div className="flex flex-col space-y-4">
//       <label className="text-lg font-semibold">{priceLabel}</label>
//       <input
//         type="number"
//         className="p-2 border border-gray-300 rounded"
//         style={noArrows ? { '-moz-appearance': 'textfield', '-webkit-appearance': 'none', appearance: 'none' } : {}}
//       />
//     </div>
//   );
// };

// export default DayPay;
