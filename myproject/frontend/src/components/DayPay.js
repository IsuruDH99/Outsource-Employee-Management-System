import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";

const DayPay = () => {
  const HrID = "HR001";
  const [payment, setPayment] = useState(100);
  const [editValue, setEditValue] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/daypay/${HrID}`);
        if (!response.ok) throw new Error("Not found");
        
        const data = await response.json();
        if (data && data.DailyRate) {
          setPayment(data.DailyRate);
          setEditValue(data.DailyRate);
        } else {
          // Set default if no data found
          await setDefaultPayment();
        }
      } catch (error) {
        console.warn("Using default payment (Rs. 100)");
        await setDefaultPayment();
      }
    };

    const setDefaultPayment = async () => {
      try {
        await fetch("http://localhost:3001/daypay/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ HrID, DailyRate: 100 }),
        });
        setPayment(100);
        setEditValue(100);
      } catch (err) {
        console.error("Failed to insert default:", err);
        setError("Failed to load payment data");
      }
    };

    fetchPaymentData();
  }, [HrID]);

  const handleSave = async () => {
    const newRate = Number(editValue);
    if (isNaN(newRate) || newRate <= 0) {
      setError("Please enter a valid positive number");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/daypay/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          HrID,
          DailyRate: newRate,
        }),
      });

      if (!response.ok) throw new Error("Update failed");

      setPayment(newRate);
      setIsModalOpen(false);
      setSaveMessage("✅ Successfully saved");
      setError(null);
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update:", err);
      setError("Failed to update payment");
    }
  };

  return (
    <div className="flex justify-center w-full mt-6">
      <div className="p-6 w-full max-w-xl border rounded-lg shadow-sm bg-white">
        <div className="grid grid-cols-2 gap-4 text-xl font-bold border-b pb-3 mb-5 text-left text-blue-500">
          <div>Daily Payment</div>
          <div>Action</div>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center text-left text-lg">
          <div>Rs. {payment}</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 font-medium text-blue-600 hover:underline border-2 border-blue-600 rounded-lg px-3 py-2 transition-all hover:bg-blue-50"
          >
            <FaEdit className="text-xl" />
            <span>Edit</span>
          </button>
        </div>

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        {saveMessage && <p className="mt-2 text-green-600 text-sm">{saveMessage}</p>}

        {/* Modal for editing */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Update Daily Payment</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Current Payment</label>
                <div className="p-2 bg-gray-100 rounded-lg">Rs. {payment}</div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">New Payment (Rs.)</label>
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1"
                  step="1"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setError(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayPay;