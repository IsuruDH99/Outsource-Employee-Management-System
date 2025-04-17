import React, { useState } from 'react';

const HourlyTarget = () => {
  const [formData, setFormData] = useState({
    productNo: '',
    productName: '',
    targetHourly: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      const res = await fetch('/api/product-target', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productNo: formData.productNo,
          productName: formData.productName,
          targetHourly: parseInt(formData.targetHourly, 10),
        }),
      });

      // log raw text on error to debug
      if (!res.ok) {
        const text = await res.text();
        console.error('Server response:', text);
        let msg = 'Failed to save';
        try {
          msg = JSON.parse(text).message || msg;
        } catch {}
        throw new Error(msg);
      }

      setSubmitted(true);
      setFormData({ productNo: '', productName: '', targetHourly: '' });
    } catch (err) {
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
