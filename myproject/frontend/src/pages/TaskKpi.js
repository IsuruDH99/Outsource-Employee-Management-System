import { useState } from "react";

const TaskKpi = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting state
  const today = new Date().toISOString().split("T")[0];

  // Sample KPI Data
  const [kpiData, setKpiData] = useState([
    { epf: 1002, name: "Alice", productCode: "P345", productName: "Gadget X", targetTime: 6, actualTime: 5.5, kpi: 92 },
    { epf: 1001, name: "John", productCode: "P123", productName: "Widget A", targetTime: 5, actualTime: 4.5, kpi: 90 },
    { epf: 1003, name: "Bob", productCode: "P678", productName: "Device Z", targetTime: 7, actualTime: 6, kpi: 86 },
  ]);

  // Function to update actual time and calculate KPI
  const updateActualTime = (index, actualTime) => {
    const updatedKpiData = [...kpiData];
    updatedKpiData[index].actualTime = actualTime;
    const kpi = ((updatedKpiData[index].targetTime / actualTime) * 100).toFixed(2);
    updatedKpiData[index].kpi = kpi;
    setKpiData(updatedKpiData);
  };

  // Sorting function
  const sortTable = () => {
    const sortedData = [...kpiData].sort((a, b) => {
      return sortOrder === "asc"
        ? a.productCode.localeCompare(b.productCode)
        : b.productCode.localeCompare(a.productCode);
    });
    setKpiData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
       Daily KPI
      </h2>

      {/* Single Date Selection */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 text-sm text-center">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={today}
            className="border rounded px-3 py-1 w-40 text-sm text-center focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* KPI Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 border">EPF</th>
              <th className="p-2 border">Name</th>
              <th
                className="p-2 border cursor-pointer hover:bg-blue-700"
                onClick={sortTable}
              >
                Product Code {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Target Time</th>
              <th className="p-2 border">Actual Time</th>
              <th className="p-2 border">KPI (%)</th>
            </tr>
          </thead>
          <tbody>
            {kpiData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{item.epf}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.productCode}</td>
                <td className="p-2 border">{item.productName}</td>
                <td className="p-2 border">{item.targetTime} hrs</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.actualTime}
                    min="0"
                    step="0.1"
                    onChange={(e) => updateActualTime(index, parseFloat(e.target.value))}
                    className="border px-2 py-1 text-sm rounded"
                  />
                </td>
                <td className="p-2 border text-green-600">{item.kpi}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskKpi;
