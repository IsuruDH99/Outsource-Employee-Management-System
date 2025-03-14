import React, { useState } from "react";

const KPI = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  // TaskAssign State Variables
  const [product, setProduct] = useState(30);
  const [quantity, setQuantity] = useState(0);
  const [target, setTarget] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [targetTime, setTargetTime] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // TaskKpi State Variables
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const today = new Date().toISOString().split("T")[0];

  const [kpiData, setKpiData] = useState([
    { epf: 1002, name: "Alice", productCode: "P345", productName: "Gadget X", targetTime: 6, actualTime: 5.5, kpi: (6 / 5.5).toFixed(2) },
    { epf: 1001, name: "John", productCode: "P123", productName: "Widget A", targetTime: 5, actualTime: 4.5, kpi: (5 / 4.5).toFixed(2) },
    { epf: 1003, name: "Bob", productCode: "P678", productName: "Device Z", targetTime: 7, actualTime: 6, kpi: (7 / 6).toFixed(2) },
  ]);

  // TaskAssign Functions
  const employeesList = ["Alice", "Bob", "Charlie", "David", "Emma"];

  const calculateTargetTime = () => {
    const numEmployees = selectedEmployees.length;
    if (product > 0 && target > 0 && numEmployees > 0) {
      const time = (quantity / product) / target / numEmployees;
      setTargetTime(time.toFixed(2));
    }
  };

  const handleEmployeeSelection = (employee) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employee)
        ? prevSelected.filter((e) => e !== employee)
        : [...prevSelected, employee]
    );
  };

  // TaskKpi Functions
  const updateActualTime = (index, actualTime) => {
    const updatedKpiData = [...kpiData];
    updatedKpiData[index].actualTime = actualTime;
    const kpi = (updatedKpiData[index].targetTime / actualTime).toFixed(2);
    updatedKpiData[index].kpi = kpi;
    setKpiData(updatedKpiData);
  };

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab("Tab1")}
            className={`px-4 py-2 rounded-l ${
              activeTab === "Tab1" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Tab 1
          </button>
          <button
            onClick={() => setActiveTab("Tab2")}
            className={`px-4 py-2 rounded-r ${
              activeTab === "Tab2" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Tab 2
          </button>
        </div>

        {/* Tab 1: Task Assign */}
        {activeTab === "Tab1" && (
          <div className="p-6 max-w-lg mx-auto mt-10 border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Task Assign</h2>

            {/* Date Selection */}
            <label className="block mb-2">Date</label>
            <input 
              type="date" 
              value={date} 
              max={new Date().toISOString().split('T')[0]} 
              onChange={(e) => setDate(e.target.value)} 
              className="mb-4 w-full p-2 border rounded" 
            />

            {/* Product Selection */}
            <label className="block mb-2">Product</label>
            <select className="mb-4 w-full p-2 border rounded" onChange={(e) => setProduct(Number(e.target.value))}>
              <option value="30">Product A (30)</option>
              <option value="50">Product B (50)</option>
              <option value="80">Product C (80)</option>
            </select>

            {/* Target Input */}
            <label className="block mb-2">Target (Per Hr/Per Person)</label>
            <input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="mb-4 w-full p-2 border rounded" />

            {/* Quantity Input */}
            <label className="block mb-2">Quantity</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="mb-4 w-full p-2 border rounded" />

            {/* Employee Selection Using Checkboxes */}
            <label className="block mb-2">Select Employees</label>
            <div className="mb-4 p-2 border rounded bg-gray-100">
              {employeesList.map((employee) => (
                <label key={employee} className="block cursor-pointer">
                  <input
                    type="checkbox"
                    value={employee}
                    checked={selectedEmployees.includes(employee)}
                    onChange={() => handleEmployeeSelection(employee)}
                    className="mr-2"
                  />
                  {employee}
                </label>
              ))}
            </div>

            {/* Display Number of Employees */}
            <label className="block mb-2">No. of Employees</label>
            <input type="number" value={selectedEmployees.length} disabled className="mb-4 w-full p-2 border rounded" />

            {/* Display Selected Employees */}
            <label className="block mb-2">Selected Employees:</label>
            <div className="mb-4 p-2 border rounded bg-gray-100">
              {selectedEmployees.length > 0 ? selectedEmployees.join(", ") : "No employees selected"}
            </div>

            {/* Calculate Target Time Button */}
            <button onClick={calculateTargetTime} className="mb-4 w-full p-2 bg-blue-500 text-white rounded">Calculate Target Time</button>

            {/* Display Target Time */}
            <label className="block mb-2 font-semibold">Target Time (Hours)</label>
            <input type="text" value={targetTime} disabled className="mb-4 w-full p-2 border rounded" />
          </div>
        )}

        {/* Tab 2: Task KPI */}
        {activeTab === "Tab2" && (
          <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Daily KPI</h2>

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
                    <th className="p-2 border">KPI</th>
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
                      <td className="p-2 border text-green-600">{item.kpi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPI;
