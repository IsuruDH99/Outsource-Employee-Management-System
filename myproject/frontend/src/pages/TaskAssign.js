import { useState } from "react";

export default function TaskAssign() {
  const [product, setProduct] = useState(30);
  const [quantity, setQuantity] = useState(0);
  const [target, setTarget] = useState(0);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [targetTime, setTargetTime] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

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
        ? prevSelected.filter((e) => e !== employee) // Remove if already selected
        : [...prevSelected, employee] // Add if not selected
    );
  };

  return (
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
  );
}
