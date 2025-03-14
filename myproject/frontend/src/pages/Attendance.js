import React, { useState } from "react";

const Attendance = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Centering the Date Input Section */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">From:</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              max={currentDate}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">To:</label>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              min={fromDate || currentDate}
              max={currentDate}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">EPF</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">In Time</th>
              <th scope="col" className="px-6 py-3">Out Time</th>
            </tr>
          </thead>
          
        </table>
      </div>
    </div>
  );
};

export default Attendance;
