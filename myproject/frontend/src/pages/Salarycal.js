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
  const [processedWorkers, setProcessedWorkers] = useState([]);
  const dayPayRate = 10;

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
    updatedProducts[index].payment = value * 5;
    setTargetProducts(updatedProducts);
  };

  const totalTargetPayment = targetProducts.reduce((sum, p) => sum + p.payment, 0);
  const totalDayPay = workHours * dayPayRate;

  const handleSubmit = () => {
    if (workerType === "Target") {
      setProcessedWorkers((prev) => [...prev, { epf: worker, date }]);
    }
    alert("Salary submitted successfully!");
  };

  const filteredWorkersList = workersList.filter(
    (w) => !processedWorkers.some((processed) => processed.epf === w.epf && processed.date === date)
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Salary Calculator</h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setWorkerType("Target")}
            className={`px-4 py-2 rounded-l ${
              workerType === "Target" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Target
          </button>
          <button
            onClick={() => setWorkerType("Day Pay")}
            className={`px-4 py-2 rounded-r ${
              workerType === "Day Pay" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Day Pay
          </button>
        </div>

        <label className="block mb-2">Select Date:</label>
        <input type="date" value={date} onChange={handleDateChange} className="border p-2 w-full rounded mb-4" />

        <label className="block mb-2">Select Worker:</label>
        <select value={worker} onChange={(e) => setWorker(e.target.value)} className="border p-2 w-full rounded mb-4">
          <option value="">Select Worker</option>
          {filteredWorkersList.map((w) => (
            <option key={w.epf} value={w.epf}>{`${w.epf} - ${w.name}`}</option>
          ))}
        </select>

        {workerType === "Target" && (
          <div>
            <table className="w-full border mb-4 text-center">
              <thead>
                <tr className="bg-gray-300">
                  <th className="p-2">Product Code</th>
                  <th className="p-2">Product Name</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Payments</th>
                </tr>
              </thead>
              <tbody>
                {targetProducts.map((product, index) => (
                  <tr key={product.code}>
                    <td className="border p-2">{product.code}</td>
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2">
                      <input
                        type="number"
                        min="0"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                        className="border p-1 w-16 text-center"
                      />
                    </td>
                    <td className="border p-2">Rs.{product.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="font-bold text-center">Total Payment: Rs.{totalTargetPayment}</h3>
          </div>
        )}

        {workerType === "Day Pay" && (
          <div>
            <label className="block mb-2">Enter Work Hours:</label>
            <input
              type="number"
              min="0"
              value={workHours}
              onChange={(e) => setWorkHours(parseInt(e.target.value) || 0)}
              className="border p-2 w-full rounded mb-4"
            />
            <h3 className="font-bold text-center">Total Day Pay: Rs.{totalDayPay}</h3>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>Clear</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Salarycal;
