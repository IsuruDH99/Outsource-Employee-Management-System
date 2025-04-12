import React, { useState } from "react";

const KPI = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  // TaskAssign State Variables
  const [product, setProduct] = useState(30);
  const [quantity, setQuantity] = useState(0);
  const [target, setTarget] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [targetTime, setTargetTime] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ✅ FIXED: add this line

  // TaskKpi State Variables
  const [selectedDate, setSelectedDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const today = new Date().toISOString().split("T")[0];

  const [kpiData, setKpiData] = useState([
    {
      epf: 1002,
      name: "Alice",
      productCode: "P345",
      productName: "Gadget X",
      targetTime: 6,
      actualTime: 5.5,
      kpi: (6 / 5.5).toFixed(2),
    },
    {
      epf: 1001,
      name: "John",
      productCode: "P123",
      productName: "Widget A",
      targetTime: 5,
      actualTime: 4.5,
      kpi: (5 / 4.5).toFixed(2),
    },
    {
      epf: 1003,
      name: "Bob",
      productCode: "P678",
      productName: "Device Z",
      targetTime: 7,
      actualTime: 6,
      kpi: (7 / 6).toFixed(2),
    },
  ]);

  // TaskAssign Functions
  const employeesList = ["Alice", "Bob", "Charlie", "David", "Emma"];

  const calculateTargetTime = () => {
    const numEmployees = selectedEmployees.length;
    if (product > 0 && target > 0 && numEmployees > 0) {
      const time = quantity / product / target / numEmployees;
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

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleClear = () => {
    setProduct(30);
    setQuantity(0);
    setTarget(0);
    setSelectedEmployees([]);
    setTargetTime(0);
    setDate(new Date().toISOString().split("T")[0]);
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
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
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
          <div className="p-6 w-full max-w-2xl mx-auto border rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Task Assign</h2>

            <label className="block mb-2">Date</label>
            <input
              type="date"
              value={date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="mb-4 w-full p-2 border rounded"
            />

            <label className="block mb-2">Product</label>
            <select
              className="mb-4 w-full p-2 border rounded"
              value={product}
              onChange={(e) => setProduct(Number(e.target.value))}
            >
              <option value="30">P001 30 Box Packing</option>
              <option value="50">P002 100 Box Packing</option>
            </select>

            <label className="block mb-2">Target (Per Hr/Per Person)</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="mb-4 w-full p-2 border rounded"
            />

            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mb-4 w-full p-2 border rounded"
            />

            <label className="block mb-2">Select Employees</label>
            <div className="relative mb-4">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-2 border rounded bg-gray-100 text-left"
              >
                {selectedEmployees.length > 0
                  ? selectedEmployees.join(", ")
                  : "Select Employees"}
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 border rounded-lg bg-white shadow-lg transition-opacity duration-300 max-h-60 overflow-y-auto">
                  <div className="space-y-2 p-2">
                    {employeesList.map((employee) => (
                      <label
                        key={employee}
                        className={`flex items-center p-2 cursor-pointer rounded-lg transition-colors ${
                          selectedEmployees.includes(employee)
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
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
                </div>
              )}
            </div>

            <label className="block mb-2">No. of Employees</label>
            <input
              type="number"
              value={selectedEmployees.length}
              disabled
              className="mb-4 w-full p-2 border rounded"
            />

            <button
              onClick={calculateTargetTime}
              className="mb-1 w-full p-2 bg-blue-500 text-white rounded"
            >
              Calculate Target Time
            </button>

            <label className="block mb-2 font-semibold">
              Target Time (Hours)
            </label>
            <input
              type="text"
              value={targetTime}
              disabled
              className="mb-4 w-full p-2 border rounded"
            />

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleClear}
                className="w-1/2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
              >
                Clear
              </button>
            </div>

            {showSuccess && (
              <div className="mt-4 text-green-600 text-center font-medium">
                ✅ Successfully Saved!
              </div>
            )}
          </div>
        )}

        {activeTab === "Tab2" && (
          <div className="w-full p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
              Daily KPI
            </h2>

            <div className="flex justify-center mb-6">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700 text-sm text-center">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={today}
                  className="border rounded px-3 py-1 w-40 text-sm text-center focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[1000px]">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-2 border">EPF</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Product Code</th>
                      <th className="p-2 border">Product Name</th>
                      <th className="p-2 border">Target Time</th>
                      <th className="p-2 border">Actual Time</th>
                      <th className="p-2 border">KPI</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { epf: 1001, name: "John" },
                      { epf: 1002, name: "Alice" },
                      { epf: 1003, name: "Bob" },
                    ].map((employee) => {
                      const products = [
                        { code: "P001", name: "30 Box Packing" },
                        { code: "P002", name: "100 Box Packing" },
                      ];

                      const employeeData = products.map((prod) => {
                        const found = kpiData.find(
                          (d) =>
                            d.epf === employee.epf &&
                            d.productCode === prod.code
                        );
                        return {
                          ...prod,
                          targetTime: found?.targetTime || 0,
                          actualTime: found?.actualTime || 0,
                        };
                      });

                      const totalTarget = employeeData.reduce(
                        (sum, p) => sum + p.targetTime,
                        0
                      );
                      const totalActual = employeeData.reduce(
                        (sum, p) => sum + Number(p.actualTime),
                        0
                      );
                      const dailyKPI =
                        totalActual > 0
                          ? (totalTarget / totalActual).toFixed(2)
                          : "0.00";

                      const handleSaveEmployee = () => {
                        console.log(
                          `✅ Saved KPI for ${employee.name} on ${selectedDate}`
                        );
                        alert(`Saved KPI for ${employee.name}`);
                        // You can store/save to backend here
                      };

                      return (
                        <>
                          <tr className="text-center">
                            <td className="p-2 border" rowSpan={2}>
                              {employee.epf}
                            </td>
                            <td className="p-2 border" rowSpan={2}>
                              {employee.name}
                            </td>
                            <td className="p-2 border">
                              {employeeData[0].code}
                            </td>
                            <td className="p-2 border">
                              {employeeData[0].name}
                            </td>
                            <td className="p-2 border">
                              {employeeData[0].targetTime} hrs
                            </td>
                            <td className="p-2 border">
                              <input
                                type="number"
                                value={employeeData[0].actualTime}
                                min="0"
                                step="0.1"
                                onChange={(e) => {
                                  const updated = [...kpiData];
                                  const index = updated.findIndex(
                                    (d) =>
                                      d.epf === employee.epf &&
                                      d.productCode === employeeData[0].code
                                  );
                                  if (index !== -1) {
                                    updated[index].actualTime = parseFloat(
                                      e.target.value
                                    );
                                    updated[index].kpi = (
                                      updated[index].targetTime /
                                      updated[index].actualTime
                                    ).toFixed(2);
                                  } else {
                                    updated.push({
                                      epf: employee.epf,
                                      name: employee.name,
                                      productCode: employeeData[0].code,
                                      productName: employeeData[0].name,
                                      targetTime: employeeData[0].targetTime,
                                      actualTime: parseFloat(e.target.value),
                                      kpi: (
                                        employeeData[0].targetTime /
                                        parseFloat(e.target.value)
                                      ).toFixed(2),
                                    });
                                  }
                                  setKpiData(updated);
                                }}
                                className="border px-2 py-1 text-sm rounded w-20 text-center"
                              />
                            </td>
                            <td
                              className="p-2 border text-green-600"
                              rowSpan={2}
                            >
                              {dailyKPI}
                            </td>
                            <td className="p-2 border" rowSpan={2}>
                              <button
                                onClick={handleSaveEmployee}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                              >
                                Save
                              </button>
                            </td>
                          </tr>
                          <tr className="text-center">
                            <td className="p-2 border">
                              {employeeData[1].code}
                            </td>
                            <td className="p-2 border">
                              {employeeData[1].name}
                            </td>
                            <td className="p-2 border">
                              {employeeData[1].targetTime} hrs
                            </td>
                            <td className="p-2 border">
                              <input
                                type="number"
                                value={employeeData[1].actualTime}
                                min="0"
                                step="0.1"
                                onChange={(e) => {
                                  const updated = [...kpiData];
                                  const index = updated.findIndex(
                                    (d) =>
                                      d.epf === employee.epf &&
                                      d.productCode === employeeData[1].code
                                  );
                                  if (index !== -1) {
                                    updated[index].actualTime = parseFloat(
                                      e.target.value
                                    );
                                    updated[index].kpi = (
                                      updated[index].targetTime /
                                      updated[index].actualTime
                                    ).toFixed(2);
                                  } else {
                                    updated.push({
                                      epf: employee.epf,
                                      name: employee.name,
                                      productCode: employeeData[1].code,
                                      productName: employeeData[1].name,
                                      targetTime: employeeData[1].targetTime,
                                      actualTime: parseFloat(e.target.value),
                                      kpi: (
                                        employeeData[1].targetTime /
                                        parseFloat(e.target.value)
                                      ).toFixed(2),
                                    });
                                  }
                                  setKpiData(updated);
                                }}
                                className="border px-2 py-1 text-sm rounded w-20 text-center"
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      console.log("📤 Submitting all KPI data:", kpiData);
                      alert("All KPI records submitted for the day!");
                      // Here you would send all KPI data to backend API
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
                  >
                    Submit All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPI;
