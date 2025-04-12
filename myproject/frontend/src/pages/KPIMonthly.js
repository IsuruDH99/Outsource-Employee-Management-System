import React, { useState } from "react";
import { format } from "date-fns";

const KPIMonthly = () => {
  const currentMonth = format(new Date(), "yyyy-MM");
  const [selectedDate, setSelectedDate] = useState(currentMonth);

  const handleMonthChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const getGrade = (kpi) => {
    if (kpi >= 1.2) return "A";
    if (kpi >= 1.0) return "B";
    if (kpi >= 0.85) return "C";
    if (kpi >= 0.7) return "D";
    return "F";
  };

  const kpiData = [
    { epf: "1001", name: "John Doe", kpi: 1.25 },
    { epf: "1002", name: "Jane Smith", kpi: 1.1 },
    { epf: "1003", name: "Bob Lee", kpi: 0.95 },
    { epf: "1004", name: "Alice Kim", kpi: 0.8 },
    { epf: "1005", name: "Tom Cruz", kpi: 0.65 },
  ];

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Monthly KPI</h2>

      {/* Month Picker */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 text-sm text-center mb-1">Select Month</label>
          <input
            type="month"
            value={selectedDate}
            onChange={handleMonthChange}
            max={currentMonth} // disables future months
            className="border rounded px-3 py-1 w-40 text-sm text-center focus:ring-2 focus:ring-blue-400"
          />
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
