import React, { useState } from "react";

const Salarycal = () => {
  const [date, setDate] = useState("");
  const [workerType, setWorkerType] = useState("Target");
  const [worker, setWorker] = useState("");
  const [targetProducts, setTargetProducts] = useState([
    { code: "P001", name: "Product A", quantity: 0, payment: 0 },
    { code: "P002", name: "Product B", quantity: 0, payment: 0 },
  ]);
  const [workHours, setWorkHours] = useState(0);
  const [processedWorkers, setProcessedWorkers] = useState([]); // To keep track of processed workers for a specific date
  const dayPayRate = 10; // Assume $10 per hour

  const workersList = [
    { epf: "12345", name: "John Doe" },
    { epf: "67890", name: "Jane Smith" },
  ];

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];
    if (selectedDate > today) {
      alert("You can't select a future date.");
    } else {
      setDate(selectedDate);
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...targetProducts];
    updatedProducts[index].quantity = value;
    updatedProducts[index].payment = value * 5; // Assume $5 per unit
    setTargetProducts(updatedProducts);
  };

  const totalTargetPayment = targetProducts.reduce(
    (sum, p) => sum + p.payment,
    0
  );
  const totalDayPay = workHours * dayPayRate;

  const handleWorkerChange = (e) => {
    setWorker(e.target.value);
  };

  const handleSubmit = () => {
    // Add current worker to processed list for the selected date
    if (workerType === "Target") {
      setProcessedWorkers((prev) => [
        ...prev,
        { epf: worker, date },
      ]);
    }
    alert("Salary submitted successfully!");
  };

  const filteredWorkersList = workersList.filter(
    (w) =>
      !processedWorkers.some(
        (processed) => processed.epf === w.epf && processed.date === date
      )
  );

  const handleClear = () => {
    setDate("");
    setWorker("");
    setTargetProducts(
      targetProducts.map((p) => ({ ...p, quantity: 0, payment: 0 }))
    );
    setWorkHours(0);
    setProcessedWorkers([]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Salary Calculator</h2>

      {/* Navbar for Worker Type */}
      <nav className="flex mb-4">
        <button
          onClick={() => setWorkerType("Target")}
          className={`px-4 py-2 ${
            workerType === "Target" ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded-l`}
        >
          Target
        </button>
        <button
          onClick={() => setWorkerType("Day Pay")}
          className={`px-4 py-2 ${
            workerType === "Day Pay" ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded-r`}
        >
          Day Pay
        </button>
      </nav>

      {/* Date Picker */}
      <label className="block">Select Date:</label>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="border p-2 rounded mb-4 w-128"
      />

      {/* Worker Dropdown */}
      <label className="block">Select Worker:</label>
      <select
        value={worker}
        onChange={handleWorkerChange}
        className="border p-2 rounded mb-4 w-128"
      >
        <option value="">Select Worker</option>
        {filteredWorkersList.map((w) => (
          <option key={w.epf} value={w.epf}>
            {`${w.epf} - ${w.name}`}
          </option>
        ))}
      </select>

      {/* Target Worker Table */}
      {workerType === "Target" && (
        <div>
          <table className="w-full border mb-4">
            <thead>
              <tr className="bg-gray-300 text-center">
                <th className="max-w-[120px]">Product Code</th>
                <th className="max-w-[180px]">Product Name</th>
                <th className="max-w-[100px]">Quantity</th>
                <th className="max-w-[120px]">Payments</th>
              </tr>
            </thead>
            <tbody>
              {targetProducts.map((product, index) => (
                <tr key={product.code} className="text-center">
                  <td className="border p-2">{product.code}</td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      min="0"
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="border p-1 w-128"
                    />
                  </td>
                  <td className="border p-2">${product.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="font-bold">Total Payment: ${totalTargetPayment}</h3>
        </div>
      )}

      {/* Day Pay Worker Table */}
      {workerType === "Day Pay" && (
        <div>
          <label className="block">Enter Work Hours:</label>
          <input
            type="number"
            min="0"
            value={workHours}
            onChange={(e) => setWorkHours(parseInt(e.target.value) || 0)}
            className="border p-2 rounded mb-4 w-32"
          />
          <h3 className="font-bold">Total Day Pay: ${totalDayPay}</h3>
        </div>
      )}

      {/* Buttons */}
      <button
        onClick={handleClear}
        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
      >
        Clear
      </button>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default Salarycal;
