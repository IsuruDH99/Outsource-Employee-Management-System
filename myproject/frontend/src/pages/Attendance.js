import React, { useState} from "react"; 
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
    if (new Date(fromDate) > new Date(toDate)) {
      alert("'From' date cannot be later than 'To' date.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get("http://localhost:3001/Employee_attendance_view/get-attendance", {
        params: {
          fromDate,
          toDate,
        },
      });

      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 p-6 bg-gray-100 min-h-screen">
      {/* Styled Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wide text-gray-800 ">
          Attendance
        </h1>
        <p className="text-gray-500 text-sm mt-1">Track employee in/out records by date</p>
      </div>

      {/* Date Input Section */}
      <div className="flex flex-wrap justify-center items-end gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">From:</label>
          <input
            type="date"
            className="border p-2 rounded w-40"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            max={currentDate}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">To:</label>
          <input
            type="date"
            className="border p-2 rounded w-40"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            min={fromDate || currentDate}
            max={currentDate}
          />
        </div>
        <button
          onClick={handleFetchAttendance}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded shadow"
        >
          Fetch
        </button>
      </div>

      {/* Table Section */}
      <div className="relative overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">EPF</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">In Time</th>
              <th scope="col" className="px-6 py-3">Out Time</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Loading...</td>
              </tr>
            ) : attendanceData.length > 0 ? (
              attendanceData.map((attendance, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{attendance.epf}</td>
                  <td className="px-6 py-4">{attendance.name}</td>
                  <td className="px-6 py-4">{attendance.date}</td>
                  <td className="px-6 py-4">{attendance.intime}</td>
                  <td className="px-6 py-4">{attendance.outtime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
