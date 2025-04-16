import React, { useState } from "react";

const TaskAssign = () => {
  const [date, setDate] = useState("");
  const [product, setProduct] = useState("");
  const [target, setTarget] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [targetTime, setTargetTime] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const employeesList = ["Alice", "Bob", "Charlie", "David", "Eve"];

  const handleEmployeeSelection = (employee) => {
    setSelectedEmployees((prev) =>
      prev.includes(employee)
        ? prev.filter((e) => e !== employee)
        : [...prev, employee]
    );
  };

  const calculateTargetTime = () => {
    const totalTargetTime = (quantity / (target * selectedEmployees.length)).toFixed(2);
    setTargetTime(totalTargetTime);
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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

  return (
    <div className="p-6 w-full max-w-2xl mx-auto border rounded-lg shadow-lg">
      {showToast && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded shadow-md transition-all duration-300">
          {errorMessage}
        </div>
      )}

      <h2 className="text-xl font-bold mb-6">Task Assign</h2>

      <div className="flex items-center mb-4 gap-4">
        <label className="w-48">Date</label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      </div>

      <div className="flex items-center mb-4 gap-4">
        <label className="w-48">Product</label>
        <select
          className="flex-1 p-2 border rounded"
          value={product}
          onChange={(e) => setProduct(Number(e.target.value))}
        >
          <option value="">Select Product</option>
          <option value="30">P001 30 Box Packing</option>
          <option value="50">P002 100 Box Packing</option>
        </select>
      </div>

      <div className="flex items-center mb-4 gap-4">
        <label className="w-48">Target (Per Hr/Per Person)</label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="flex-1 p-2 border rounded"
        />
      </div>

      <div className="flex items-center mb-4 gap-4">
        <label className="w-48">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="flex-1 p-2 border rounded"
        />
      </div>

      <div className="flex items-start mb-4 gap-4">
        <label className="w-48 pt-2">Select Employees</label>
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-2 border rounded bg-gray-100 text-left"
          >
            {selectedEmployees.length > 0
              ? selectedEmployees.join(", ")
              : "Select Employees"}
          </button>

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
      </div>

      <div className="flex items-center mb-4 gap-4">
        <label className="w-48">No. of Employees</label>
        <input
          type="number"
          value={selectedEmployees.length}
          disabled
          className="flex-1 p-2 border rounded"
        />
      </div>

      <div className="mb-4">
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
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Calculate Target Time
        </button>
      </div>

      <div className="flex items-center mb-4 gap-4">
        <label className="w-48 font-semibold">Target Time (Hours)</label>
        <input
          type="text"
          value={targetTime}
          disabled
          className="flex-1 p-2 border rounded"
        />
      </div>

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
  );
};

export default TaskAssign;
