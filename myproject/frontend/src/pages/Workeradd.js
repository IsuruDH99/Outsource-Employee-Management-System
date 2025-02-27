import React, { useState } from 'react';

const Workeradd = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [epf, setEpf] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (Make sure fields are not empty)
    if (!employeeName || !epf) {
      setError('Please fill in both fields.');
      return;
    }

    // Clear error if validation passes
    setError('');

    // Mock API call or state update
    const newEmployee = {
      name: employeeName,
      epf: epf,
    };

    console.log('Employee Added:', newEmployee);

    // Here, you would typically send this data to a backend API
    // For now, we'll just log it to the console.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Worker</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label htmlFor="epf" className="block text-sm font-medium text-gray-600">EPF Number</label>
            <input
              type="text"
              id="epf"
              value={epf}
              onChange={(e) => setEpf(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter EPF number"
            />
          </div>

          <div>
            <label htmlFor="employeeName" className="block text-sm font-medium text-gray-600">Worker Name</label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter worker name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Worker
          </button>
        </form>
      </div>
    </div>
  );
};

export default Workeradd;
