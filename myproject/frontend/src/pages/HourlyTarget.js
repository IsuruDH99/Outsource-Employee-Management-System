import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HourlyTarget = () => {
  const [formData, setFormData] = useState({
    productNo: '',
    productName: '',
    packSize: '',
    targetHourly: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Please login first');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Session expired. Please login again.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/producttarget/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productNo: formData.productNo,
          productName: formData.productName,
          packSize: formData.packSize,
          targetHourly: parseInt(formData.targetHourly, 10),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save');
      }

      setSubmitted(true);
      setFormData({ 
        productNo: '', 
        productName: '',
        packSize: '', 
        targetHourly: '' 
      });
      
      // Reset submission status after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
      
    } catch (err) {
      if (err.message === 'Unauthorized' || err.message === 'Invalid token') {
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
      setError(err.message);
      console.error('Submission error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Product Hourly Target</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product No</label>
          <input
            type="text"
            name="productNo"
            value={formData.productNo}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pack Size</label>
          <input
            type="number"
            name="packSize"
            value={formData.packSize}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target (Hourly)</label>
          <input
            type="number"
            name="targetHourly"
            value={formData.targetHourly}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <p className="text-green-600 font-semibold text-center mt-4"> saved successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600 font-medium text-center mt-4">
          {error}
        </p>
      )}
    </div>
  );
};

export default HourlyTarget;
