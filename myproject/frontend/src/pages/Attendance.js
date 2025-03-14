import React, { useState, useEffect } from "react";
import axios from "axios";

const Attendance = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  const handleFetchAttendance = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both from and to dates.");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.get("http://localhost:3001/attendance/get-attendance", {
        params: {
          fromDate,
          toDate,
        },
      });

      setAttendanceData(response.data); // Assuming response contains an array of attendance details
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <button
            onClick={handleFetchAttendance}
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            Fetch Attendance
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">EPF</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">In Time</th>
              <th scope="col" className="px-6 py-3">Out Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center">Loading...</td>
              </tr>
            ) : attendanceData.length > 0 ? (
              attendanceData.map((attendance, index) => (
                <tr key={index}>
                  <td className="px-6 py-3">{attendance.epf}</td>
                  <td className="px-6 py-3">{attendance.date}</td>
                  <td className="px-6 py-3">{attendance.intime}</td>
                  <td className="px-6 py-3">{attendance.outtime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
