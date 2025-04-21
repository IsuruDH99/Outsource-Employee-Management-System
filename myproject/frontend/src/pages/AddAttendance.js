import React, { useState } from 'react';
import axios from 'axios';

const AddAttendance = () => {
  const [formData, setFormData] = useState({
    epf: '',
    date: '',
    intime: '',
    outtime: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/attendance/add-attendance', formData); // adjust URL if needed
      if (response.data.success) {
        setStatus('Attendance added successfully.');
        setFormData({
          epf: '',
          date: '',
          intime: '',
          outtime: '',
        });
      } else {
        setStatus('Failed to add attendance.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error adding attendance.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="epf"
          value={formData.epf}
          onChange={handleChange}
          placeholder="EPF Number"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="time"
          name="intime"
          value={formData.intime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="time"
          name="outtime"
          value={formData.outtime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>

      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default AddAttendance;
