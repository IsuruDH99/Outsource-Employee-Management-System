import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskAssign = () => {
  const [activeTab, setActiveTab] = useState("Tab1");

  // Tab1 states
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");
  const [target, setTarget] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [productList, setProductList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);

  // Fetch products and employees
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/target/get-products"
        );
        setProductList(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    const fetchEmployees = async () => {
      if (!date) return;
      try {
        const res = await axios.get(
          `http://localhost:3001/Employee_attendance_view/get-names?date=${date}`
        );
        setEmployeesList(res.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };

    fetchProducts();
    fetchEmployees();
  }, [date]);

  const calculateTargetTime = () => {
    if (!quantity || !target || selectedEmployees.length === 0 || !product) {
      setTargetTime("");
      return;
    }

    // Find the selected product and get its packSize
    const selected = productList.find((p) => p.productNo === product);
    const packSize = selected?.packSize; // <-- Make sure this field exists in your DB/API response

    if (!packSize || target === 0) {
      setTargetTime("Invalid product or target value");
      return;
    }

    const step1 = quantity / packSize;
    const step2 = step1 / target;
    const step3 = step2 / selectedEmployees.length;

    setTargetTime(step3.toFixed(2));
  };

  const handleSave = async () => {
    if (!date || !product || !quantity || !selectedEmployee || !targetTime) {
      setErrorMessage("⚠️ Please fill in all required fields before saving.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
  
    try {
      const epf = selectedEmployee.split(" - ")[0]; // Extract EPF from "1001 - John"
  
      const payload = {
        date,
        epf: parseInt(epf), // Convert EPF to integer
        productNo: product,
        targetQuantity: parseInt(quantity),
        targetTimeHrs: parseFloat(targetTime),
      };
  
      await axios.post("http://localhost:3001/task-assign/assign-task", payload);
  
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      handleClear(); // Clear input fields after saving
    } catch (error) {
      console.error("Error saving task:", error);
      setErrorMessage("⚠️ Failed to save task. Please try again.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  

  const handleClear = () => {
    setDate("");
    setProduct("");
    setTarget("");
    setQuantity("");
    setSelectedEmployees([]);
    setTargetTime("");
    setErrorMessage("");
    setShowToast(false);
  };

  // Tab2 states
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState("");
  const [kpiData, setKpiData] = useState([]);
  const [savedMessages, setSavedMessages] = useState({});
  const [submitMessage, setSubmitMessage] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "Tab1" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("Tab1")}
        >
          Task Assign
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "Tab2" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("Tab2")}
        >
          Daily KPI
        </button>
      </div>

      {activeTab === "Tab1" && (
        <div className="p-6 w-full max-w-2xl mx-auto border rounded-lg shadow-lg">
          {showToast && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded shadow-md">
              {errorMessage}
            </div>
          )}

          <h2 className="text-xl text-center font-bold mb-6">TaskAssign - Assign Work</h2>
          <div className="flex items-center mb-4 gap-4 ml-16">
          <label className="w-48">Select Date : </label>
          <div className="relative w-48">
            <input
              type="date"
              value={date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 pl-3 pr-10 border rounded cursor-pointer"
            />
          </div>
        </div>
          {/* Employee dropdown */}
          <div className="flex items-center mb-4 gap-4 ml-16">
      <label className="w-48">Select Employee:</label>
      <div className="relative w-48">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-2 border rounded bg-gray-100 text-left"
              >
                {selectedEmployee || "Select Employee"}
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 border rounded-lg bg-white shadow-lg max-h-80 overflow-y-auto">
                  <div className="space-y-2 p-2">
                    {employeesList.map((emp) => {
                      const employeeLabel = `${emp.epf} - ${emp.name}`;
                      return (
                        <div
                          key={emp.epf}
                          className={`flex items-center p-2 cursor-pointer rounded-lg ${
                            selectedEmployee === employeeLabel
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setSelectedEmployee(employeeLabel);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {employeeLabel}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center mb-4 gap-4 ml-16">
            <label className="w-48">Product :</label>
            <select
              className="flex-1 p-2 border rounded"
              value={product}
              onChange={(e) => {
                const selectedProductNo = e.target.value;
                const selected = productList.find(
                  (p) => p.productNo === selectedProductNo
                );
                setProduct(selectedProductNo);
                if (selected) {
                  setTarget(selected.HourlyTarget);
                }
              }}
            >
              <option value="">Select Product</option>
              {productList.map((p) => (
                <option key={p.productNo} value={p.productNo}>
                  {p.productNo} - {p.ProductName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center mb-4 gap-4 ml-16">
            <label className="w-48">Target (Per Hr/Per Person)</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="flex-1 p-2 border rounded"
              disabled
            />
          </div>

          <div className="flex items-center mb-4 gap-4 ml-16">
            <label className="w-48">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="flex-1 p-2 border rounded"
            />
          </div>

          <div className="mb-4 flex justify-center">
            <button
              onClick={() => {
                if (
                  !date ||
                  !product ||
                  !target ||
                  !quantity ||
                  selectedEmployees.length === 0
                ) {
                  setErrorMessage("⚠️ Please fill in all required fields.");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                  return;
                }
                setErrorMessage("");
                setShowToast(false);
                calculateTargetTime();
              }}
              className="w-96 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Calculate Target Time
            </button>
          </div>

          <div className="flex items-center mb-4 gap-4 ml-16">
            <label className="w-48 font-semibold">Target Time (Hours)</label>
            <input
              type="text"
              value={targetTime}
              disabled
              className="flex-1 p-2 border rounded"
            />
          </div>

          <div className="flex gap-56">
          <button
  onClick={handleClear}
  className="w-1/2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
>
  Clear
</button>

<button
  onClick={handleSave}
  className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-green-500"
>
  Save
</button>

          </div>

          {showSuccess && (
            <div className="mt-4 text-blue-600 text-center font-medium">
              Successfully Saved!
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
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSavedMessages({});
                  setSubmitMessage(false);
                }}
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
                          d.epf === employee.epf && d.productCode === prod.code
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

                    const handleActualChange = (productIndex, value) => {
                      const product = employeeData[productIndex];
                      const updated = [...kpiData];
                      const index = updated.findIndex(
                        (d) =>
                          d.epf === employee.epf &&
                          d.productCode === product.code
                      );

                      const newActual = parseFloat(value);

                      if (index !== -1) {
                        updated[index].actualTime = newActual;
                        updated[index].kpi = (
                          updated[index].targetTime / newActual
                        ).toFixed(2);
                      } else {
                        updated.push({
                          epf: employee.epf,
                          name: employee.name,
                          productCode: product.code,
                          productName: product.name,
                          targetTime: product.targetTime,
                          actualTime: newActual,
                          kpi: (product.targetTime / newActual).toFixed(2),
                        });
                      }

                      setKpiData(updated);
                    };

                    const handleSaveEmployee = () => {
                      // Simulate saving logic
                      setSavedMessages((prev) => ({
                        ...prev,
                        [employee.epf]: "Successfully Saved",
                      }));
                    };

                    return (
                      <React.Fragment key={employee.epf}>
                        <tr className="text-center">
                          <td className="p-2 border" rowSpan={2}>
                            {employee.epf}
                          </td>
                          <td className="p-2 border" rowSpan={2}>
                            {employee.name}
                          </td>
                          <td className="p-2 border">{employeeData[0].code}</td>
                          <td className="p-2 border">{employeeData[0].name}</td>
                          <td className="p-2 border">
                            {employeeData[0].targetTime} hrs
                          </td>
                          <td className="p-2 border">
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              value={employeeData[0].actualTime}
                              onChange={(e) =>
                                handleActualChange(0, e.target.value)
                              }
                              className="border px-2 py-1 text-sm rounded w-20 text-center"
                            />
                          </td>
                          <td className="p-2 border text-green-600" rowSpan={2}>
                            {dailyKPI}
                          </td>
                          <td className="p-2 border" rowSpan={2}>
                            <button
                              onClick={handleSaveEmployee}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                              Save
                            </button>
                            {savedMessages[employee.epf] && (
                              <div className="text-sm text-green-600 mt-1">
                                {savedMessages[employee.epf]}
                              </div>
                            )}
                          </td>
                        </tr>
                        <tr className="text-center">
                          <td className="p-2 border">{employeeData[1].code}</td>
                          <td className="p-2 border">{employeeData[1].name}</td>
                          <td className="p-2 border">
                            {employeeData[1].targetTime} hrs
                          </td>
                          <td className="p-2 border">
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              value={employeeData[1].actualTime}
                              onChange={(e) =>
                                handleActualChange(1, e.target.value)
                              }
                              className="border px-2 py-1 text-sm rounded w-20 text-center"
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-6 flex flex-col items-end space-y-2">
                <button
                  onClick={() => {
                    setSubmitMessage(true);
                    console.log("📤 Submitting all KPI data:", kpiData);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
                >
                  Submit All
                </button>

                {submitMessage && (
                  <div className="text-green-700 text-sm font-medium">
                    All KPI records submitted for the day!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAssign;
