import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskAssign = () => {
  const [activeTab, setActiveTab] = useState("Task Assign");

  // Tab1 states
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");
  const [target, setTarget] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [productList, setProductList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [productName, setProductName] = useState("");

  // Tab2 states
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState("");
  const [kpiData, setKpiData] = useState([]);
  const [savedMessages, setSavedMessages] = useState({});
  const [submitMessage, setSubmitMessage] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);

  // Fetch products and employees
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/target/product-name"
        );
        setProductList(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    const fetchEmployees = async () => {
      if (!date && !selectedDate) return;
      try {
        const dateToUse = activeTab === "Task Assign" ? date : selectedDate;
        const res = await axios.get(
          `http://localhost:3001/Employee_attendance_view/get-names?date=${dateToUse}`
        );
        setEmployeesList(res.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };

    fetchProducts();
    fetchEmployees();
  }, [date, selectedDate, activeTab]);

  // Fetch assigned tasks when date changes in Daily KPI tab
  useEffect(() => {
    if (activeTab === "Daily KPI" && selectedDate && selectedEmployee) {
      const fetchAssignedTasks = async () => {
        try {
          const epf = selectedEmployee.split(" - ")[0];
          const res = await axios.get(
            `http://localhost:3001/TaskAssign/get-tasks?date=${selectedDate}&epf=${epf}`
          );
          setAssignedTasks(res.data);
        } catch (err) {
          console.error("Failed to fetch assigned tasks:", err);
        }
      };
      fetchAssignedTasks();
    }
  }, [selectedDate, activeTab, selectedEmployee]);

  const calculateTargetTime = () => {
    if (!quantity || !target || !selectedEmployee || !product) {
      setTargetTime("");
      return;
    }

    const selected = productList.find((p) => p.productNo === product);
    const packSize = selected?.packSize;

    if (!packSize || target === 0) {
      setTargetTime("Invalid product or target value");
      return;
    }

    const step1 = quantity / packSize;
    const step2 = step1 / target;

    setTargetTime(step2.toFixed(2));
  };

  const handleSave = async () => {
    if (!date || !product || !quantity || !selectedEmployee || !targetTime) {
      setErrorMessage("⚠️ Please fill in all required fields before saving.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
  
    try {
      const epf = selectedEmployee.split(" - ")[0];
      const payload = {
        date,
        epf: parseInt(epf),
        productNo: product,
        productName: productName,
        targetQuantity: parseInt(quantity),
        targetTimeHrs: parseFloat(targetTime),
      };
      
      // First save the task assignment
      await axios.post("http://localhost:3001/TaskAssign/assign-task", payload);
  
      // Then update the attendance status to "Target"
      await axios.put("http://localhost:3001/attendance/update-status", {
        date,
        epf: parseInt(epf),
        status: "Target"
      });
  
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      handleClear();
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
    setSelectedEmployee("");
    setTargetTime("");
    setErrorMessage("");
    setShowToast(false);
  };

  const saveKpiData = async (task) => {
    try {
      const epf = selectedEmployee.split(" - ")[0];
      const found = kpiData.find(
        (d) => d.productCode === task.productNo && d.taskId === task.id
      );

      if (!found || !found.actualTime) {
        setErrorMessage("⚠️ Please enter actual time before saving.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      const payload = {
        date: selectedDate,
        epf: parseInt(epf),
        productNo: task.productNo,
        ActualTime: parseFloat(found.actualTime),
        kpi: parseFloat(found.kpi),
      };

      await axios.post("http://localhost:3001/dailykpi/save-kpi", payload);
      setSavedMessages((prev) => ({
        ...prev,
        [`${task.id}-${task.productNo}`]: true,
      }));
    } catch (error) {
      console.error("Error saving KPI data:", error);
      setErrorMessage("⚠️ Failed to save KPI data. Please try again.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "Task Assign"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("Task Assign")}
        >
          Task Assign
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "Daily KPI" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("Daily KPI")}
        >
          Daily KPI
        </button>
      </div>

      {showToast && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded shadow-md">
          {errorMessage}
        </div>
      )}

      {activeTab === "Task Assign" && (
        <div className="p-6 w-full max-w-2xl mx-auto border rounded-lg shadow-lg">
          <h2 className="text-xl text-center font-bold mb-6">
            TaskAssign - Assign Work
          </h2>

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
                setProductName(selected?.ProductName || "");
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
                  !selectedEmployee ||
                  !product ||
                  !quantity ||
                  !selectedEmployee
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

      {activeTab === "Daily KPI" && (
        <div className="w-full p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Daily KPI
          </h2>

          <div className="flex items-center mb-4 gap-4 ml-16">
            <label className="w-48">Select Date : </label>
            <div className="relative w-48">
              <input
                type="date"
                value={selectedDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 pl-3 pr-10 border rounded cursor-pointer"
              />
            </div>
          </div>

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

          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-2 w-25 border text-center">
                      Product Name
                    </th>
                    <th className="p-2 w-24 border text-center">Quantity</th>
                    <th className="p-2 w-40 border text-center">
                      Target Time (Hrs)
                    </th>
                    <th className="p-2 w-40 border text-center">
                      Actual Time (Hrs)
                    </th>
                    <th className="p-2 border text-center">KPI</th>
                    <th className="p-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedTasks.length > 0 ? (
                    assignedTasks.map((task) => {
                      const foundKpi = kpiData.find(
                        (d) =>
                          d.productCode === task.productNo &&
                          d.taskId === task.id
                      );

                      // Check if this task's input should be disabled
                      const isDisabled =
                        savedMessages[`${task.id}-${task.productNo}`] || false;

                      return (
                        <tr
                          key={`${task.id}-${task.productNo}`}
                          className="text-center"
                        >
                          <td className="p-2 border">{task.productName}</td>
                          <td className="p-2 border">{task.targetQuantity}</td>
                          <td className="p-2 border">{task.targetTimeHrs}</td>
                          <td className="p-2 border">
                            <input
                              type="number"
                              min="0"
                              step="0.1"
                              required
                              value={foundKpi?.actualTime || ""}
                              onChange={(e) => {
                                if (isDisabled) return; // Don't allow changes if disabled

                                const updated = [...kpiData];
                                const index = updated.findIndex(
                                  (d) =>
                                    d.productCode === task.productNo &&
                                    d.taskId === task.id
                                );

                                const newActual = parseFloat(e.target.value);

                                if (index !== -1) {
                                  updated[index].actualTime = newActual;
                                  updated[index].kpi = (
                                    updated[index].targetTime / newActual
                                  ).toFixed(2);
                                } else {
                                  updated.push({
                                    taskId: task.id,
                                    productCode: task.productNo,
                                    productName: task.productName,
                                    targetTime: task.targetTimeHrs,
                                    actualTime: newActual,
                                    kpi: (
                                      task.targetTimeHrs / newActual
                                    ).toFixed(2),
                                  });
                                }
                                setKpiData(updated);
                              }}
                              className={`border px-2 py-1 text-sm rounded w-20 text-center ${
                                isDisabled
                                  ? "bg-gray-100 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={isDisabled}
                            />
                          </td>
                          <td
                            className={`p-2 border ${
                              foundKpi?.actualTime > 0
                                ? foundKpi.kpi >= 1
                                  ? "text-green-600"
                                  : "text-red-600"
                                : "text-black"
                            }`}
                          >
                            {foundKpi?.kpi || "0.00"}
                          </td>
                          <td className="p-2 border">
                            {savedMessages[`${task.id}-${task.productNo}`] ? (
                              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <button
                                onClick={() => saveKpiData(task)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400"
                                disabled={!foundKpi?.actualTime} // Disable save button if no actual time entered
                              >
                                Save
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        {selectedDate && selectedEmployee
                          ? "No tasks assigned for this employee on selected date"
                          : "Please select a date and employee to view assigned tasks"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="mt-6 flex flex-col items-end space-y-2">
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
