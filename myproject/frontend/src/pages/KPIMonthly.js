import React, { useState, useEffect } from "react";

const KPIMonthly = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [availableMonths, setAvailableMonths] = useState([]);

  // Sample KPI data
  const [kpiData, setKpiData] = useState([
    
    { epf: "1005", name: "Tom Cruz", kpi: 0.65 },
  ]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-based (Jan = 0)

    const startYear = currentYear - 1; // If December, start from current year, else last year
    const startMonth = currentMonth; // Next month of current month, if December back to Jan

    const months = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let year = startYear; year <= currentYear; year++) {
      const start = year === startYear ? startMonth : 0;
      const end = year === currentYear ? currentMonth - 1 : 11;
      for (let month = start; month <= end; month++) {
        const formatted = `${year} - ${monthNames[month]}`;
        months.push(formatted);
      }
    }

    setAvailableMonths(months);

    const latestYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const latestMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const initialMonthYear = `${latestYear} - ${monthNames[latestMonth]}`;
    setSelectedMonthYear(initialMonthYear);
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonthYear(e.target.value);
    // Here you would typically fetch KPI data for the selected month
    // For now, we'll just use the sample data
  };

  const getGrade = (kpi) => {
    if (kpi >= 1.2) return "A";
    if (kpi >= 1.0) return "B";
    if (kpi >= 0.85) return "C";
    if (kpi >= 0.7) return "D";
    return "F";
  };

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Monthly KPI</h2>

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
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
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
              {kpiData.map((entry) => {
                const grade = getGrade(entry.kpi);
                return (
                  <tr key={entry.epf} className="hover:bg-gray-50">
                    <td className="p-3 border">{entry.epf}</td>
                    <td className="p-3 border">{entry.name}</td>
                    <td className="p-3 border">{entry.kpi.toFixed(2)}</td>
                    <td className="p-3 border font-semibold">{grade}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KPIMonthly;