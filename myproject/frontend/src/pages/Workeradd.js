import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ⬅️ Step 1

const Workeradd = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [epf, setEpf] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // ⬅️ Step 2

  const handleSubmit = async (e) => {
    e.preventDefault();

    const epfRegex = /^[0-9]{4}$/;

    if (!employeeName || !epf) {
      setError('Please fill in both fields.');
      setSuccessMessage('');
      return;
    } else if (!epfRegex.test(epf)) {
      setError('EPF must be a 4-digit number (e.g., 0001, 1234).');
      setSuccessMessage('');
      return;
    }

    setError('');

    const newEmployee = {
      name: employeeName,
      epf: epf,
    };

    try {
      await axios.post('http://localhost:3001/workeradd/add-employee', newEmployee);
      setEmployeeName('');
      setEpf('');
      setSuccessMessage('Worker Added Successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Failed to add worker. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-10">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Worker</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter 4-digit EPF (e.g., 0001)"
              maxLength={4}
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

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Worker
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              onClick={() => navigate('/workerview')} // ⬅️ Step 3
            >
              View
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <p className="text-green-600 text-sm text-center mt-2">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Workeradd;
