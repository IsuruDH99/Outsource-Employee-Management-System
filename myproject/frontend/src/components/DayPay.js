import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
const DayPay = () => {
  // Set initial value (default Rs. 100)
  const [payment, setPayment] = useState(100);
  const [editValue, setEditValue] = useState(payment);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Optional: fetch from backend if needed
    fetch("http://localhost:3001/daypay")
      .then((res) => res.json())
      .then((data) => {
        if (data.paymentPerHour) {
          setPayment(data.paymentPerHour);
          setEditValue(data.paymentPerHour);
        }
      })
      .catch(() => {
        // fallback to default
        console.warn("Using default payment/hour (Rs. 100)");
      });
  }, []);

  const handleSave = () => {
    // Update state
    setPayment(Number(editValue));
    setShowPopup(false);

    // Optionally send to backend
    fetch("http://localhost:3001/daypay/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentPerHour: Number(editValue) }),
    }).catch((err) => {
      console.error("Failed to update:", err);
      alert("Failed to update");
    });
  };

  return (
    <div className="p-2 w-full max-w-md">
      <div className="grid grid-cols-2 gap-4 font-semibold border-b pb-2 mb-4 text-left">
        <div>Payment / hour</div>
        <div>Action</div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center text-left">
        <div className="text-lg">Rs. {payment}</div>
        <button
  onClick={() => setShowPopup(true)}
  className="flex items-center space-x-2 font-medium text-blue-600 dark:text-blue-400 hover:underline border-2 border-blue-600 rounded-lg px-2 py-1 transform transition-all duration-300 hover:scale-100"
>
  <FaEdit className="text-lg" />
  <span>Edit</span>
</button>

      </div>

      {/* Small edit popup */}
      {showPopup && (
        <div className="absolute mt-2 bg-white border border-gray-200 shadow-md rounded-lg p-4 w-64 z-50">
          <h3 className="text-sm font-semibold mb-2">Edit Payment</h3>
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded mb-3 text-sm"
          />
          <div className="flex justify-end gap-2">
            <button
              className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
            <button
              className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayPay;
