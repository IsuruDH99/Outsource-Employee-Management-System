import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

const DayPay = () => {
  const HrID = "HR001"; // You can make this dynamic later
  const [payment, setPayment] = useState(100);
  const [editValue, setEditValue] = useState(100);
  const [showPopup, setShowPopup] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    // Fetch the current payment rate from backend
    fetch(`http://localhost:3001/daypay/${HrID}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (data && data.HourlyRate) {
          setPayment(data.HourlyRate);
          setEditValue(data.HourlyRate);
        }
      })
      .catch(() => {
        console.warn("Using default payment/hour (Rs. 100)");
        // Insert default value in backend if no data found
        fetch("http://localhost:3001/daypay/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ HrID, HourlyRate: 100 }),
        })
          .then(() => {
            setPayment(100);
            setEditValue(100);
          })
          .catch((err) => {
            console.error("Failed to insert default:", err);
          });
      });
  }, [HrID]);

  const handleSave = () => {
    const newRate = Number(editValue);
    setPayment(newRate); // Update UI with new value
    setShowPopup(false);

    // Send PUT request to backend to update value
    fetch("http://localhost:3001/daypay/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        HrID,
        HourlyRate: newRate,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Updated successfully");
        setSaveMessage("✅ Successfully saved"); // Show success message
        setTimeout(() => setSaveMessage(""), 3000); // Hide message after 3 sec
      })
      .catch((err) => {
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
          className="flex items-center space-x-2 font-medium text-blue-600 hover:underline border-2 border-blue-600 rounded-lg px-2 py-1 transition-all hover:scale-100"
        >
          <FaEdit className="text-lg" />
          <span>Edit</span>
        </button>
      </div>

      {/* Edit Popup */}
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

      {/* Success Message */}
      {saveMessage && (
        <p className="mt-4 text-green-600 text-sm text-center">{saveMessage}</p>
      )}
    </div>
  );
};

export default DayPay;
