import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KPIMonthly = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [availableMonths, setAvailableMonths] = useState([]);
  const [kpiData, setKpiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Please login first');
      navigate('/login');
    } else {
      initializeMonthSelection();
    }
  }, [navigate]);

  const initializeMonthSelection = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const startYear = currentYear - 1;
    const startMonth = currentMonth;

    const months = [];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    for (let year = startYear; year <= currentYear; year++) {
      const start = year === startYear ? startMonth : 0;
      const end = year === currentYear ? currentMonth - 1 : 11;
      for (let month = start; month <= end; month++) {
        months.push(`${year} - ${monthNames[month]}`);
      }
    }

    setAvailableMonths(months);

    const latestYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const latestMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const initialMonthYear = `${latestYear} - ${monthNames[latestMonth]}`;
    setSelectedMonthYear(initialMonthYear);
    fetchKpiData(initialMonthYear);
  };

const fetchKpiData = async (monthYear) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Session expired. Please login again.');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:3001/kpimonthlyview/monthly-kpi?monthYear=${monthYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setKpiData(response.data);
    } catch (err) {
      console.error("Error fetching KPI data:", err);
      
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || "Failed to load KPI data. Please try again.");
      }
      setKpiData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    const monthYear = e.target.value;
    setSelectedMonthYear(monthYear);
    fetchKpiData(monthYear);
  };

  const getGrade = (kpi) => {
    if (kpi === null || kpi === undefined || isNaN(kpi)) return "N/A";
    if (kpi >= 1.2) return "A";
    if (kpi >= 1.0) return "B";
    if (kpi >= 0.85) return "C";
    if (kpi >= 0.7) return "D";
    return "F";
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "C":
        return "bg-yellow-100 text-yellow-800";
      case "D":
        return "bg-orange-100 text-orange-800";
      case "F":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Monthly KPI
      </h2>

      {/* Month Picker */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 text-sm text-center mb-1">
            Select Month
          </label>
          <select
            value={selectedMonthYear}
            onChange={handleMonthChange}
            className="border rounded px-3 py-1 w-40 text-sm text-center focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Messages */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading KPI data...</p>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <div className="min-w-[600px] max-w-4xl mx-auto">
            <table className="w-full border-collapse border border-gray-300 text-center text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 border">EPF</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">KPI (M)</th>
                  <th className="p-3 border">Grade</th>
                </tr>
              </thead>
              <tbody>
                {kpiData.length > 0 ? (
                  kpiData.map((entry) => {
                    const grade = getGrade(entry.kpi);
                    const gradeColor = getGradeColor(grade);
                    return (
                      <tr key={entry.epf} className="hover:bg-gray-50">
                        <td className="p-3 border">{entry.epf}</td>
                        <td className="p-3 border">{entry.name}</td>
                        <td className="p-3 border">
                          {entry.kpi !== null && !isNaN(entry.kpi)
                            ? entry.kpi.toFixed(2)
                            : "N/A"}
                        </td>
                        <td
                          className={`p-3 border font-semibold ${gradeColor} rounded`}
                        >
                          {grade}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-gray-500 text-center">
                      No KPI data available for selected month
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default KPIMonthly;
