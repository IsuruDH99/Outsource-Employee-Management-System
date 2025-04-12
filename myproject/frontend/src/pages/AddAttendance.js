import React, { useState } from "react";
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
        params: { fromDate, toDate },
      });
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Attendance
      </h1>

      {/* Date Inputs + Button */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-700 mb-1">From:</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md shadow-sm text-sm"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            max={currentDate}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">To:</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md shadow-sm text-sm"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            min={fromDate || currentDate}
            max={currentDate}
          />
        </div>
        <button
          onClick={handleFetchAttendance}
          className="bg-blue-500 text-white px-6 py-2 mt-2 md:mt-6 md:ml-4 rounded-md hover:bg-blue-600 transition"
        >
          Fetch
        </button>
      </div>

      {/* Attendance Table */}
      <div className="w-full max-w-xl overflow-x-auto rounded-lg shadow bg-white">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-1 text-xs border">EPF</th>
              <th className="p-1 text-xs border">Date</th>
              <th className="p-1 text-xs border">In Time</th>
              <th className="p-1 text-xs border">Out Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-4">Loading...</td>
              </tr>
            ) : attendanceData.length > 0 ? (
              attendanceData.map((attendance, index) => (
                <tr key={index} className="text-center">
                  <td className="p-1 text-xs border">{attendance.epf}</td>
                  <td className="p-1 text-xs border">{attendance.date}</td>
                  <td className="p-1 text-xs border">{attendance.intime}</td>
                  <td className="p-1 text-xs border">{attendance.outtime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
