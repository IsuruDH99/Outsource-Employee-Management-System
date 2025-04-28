import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

const DayPay = () => {
  const HrID = "HR001";
  const [payment, setPayment] = useState(100);
  const [editValue, setEditValue] = useState(100);
  const [showPopup, setShowPopup] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/daypay/${HrID}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (data && data.DailyRate) {
          setPayment(data.DailyRate);
          setEditValue(data.DailyRate);
        }
      })
      .catch(() => {
        console.warn("Using default payment/hour (Rs. 100)");
        fetch("http://localhost:3001/daypay/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ HrID, DailyRate: 100 }),
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
    setPayment(newRate);
    setShowPopup(false);

    fetch("http://localhost:3001/daypay/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        HrID,
        DailyRate: newRate,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Updated successfully");
        setSaveMessage("✅ Successfully saved");
        setTimeout(() => setSaveMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Failed to update:", err);
        alert("Failed to update");
      });
  };

  return (
    <div className="flex justify-center w-full mt-6">
      <div className="p-6 w-full max-w-xl border rounded-lg shadow-sm bg-white">
        <div className="grid grid-cols-2 gap-4 text-xl font-bold border-b pb-3 mb-5 text-left text-blue-600">
          <div>Daily Payment </div>
          <div>Action</div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center text-left text-lg">
          <div>Rs. {payment}</div>
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center space-x-2 font-medium text-blue-600 hover:underline border-2 border-blue-600 rounded-lg px-3 py-2 transition-all"
          >
            <FaEdit className="text-xl" />
            <span>Edit</span>
          </button>
        </div>

        {showPopup && (
  <div className="relative">
    <div className="absolute left-0 mt-3 bg-white border border-gray-300 shadow-xl rounded-xl p-6 w-80 z-50 animate-fade-in">
      <h3 className="text-base font-bold text-gray-800 mb-4">Update Hourly Payment</h3>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Payment (Rs.)
      </label>
      <input
        type="number"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <div className="flex justify-end gap-3">
        <button
          className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          onClick={() => setShowPopup(false)}
        >
          Cancel
        </button>
        <button
          className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

        {saveMessage && (
          <p className="mt-4 text-green-600 text-sm text-center">{saveMessage}</p>
        )}
      </div>
    </div>
  );
};

export default DayPay;
