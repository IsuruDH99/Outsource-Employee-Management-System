import React, { useState } from 'react';

const DayPay = () => {
  const [hourlyRate, setHourlyRate] = useState(0);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Day Pay Settings</h2>
      <label className="block">Payment per Hour:</label>
      <input
        type="number"
        min="0"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
        className="border p-2 rounded mb-4 w-64"
      />
    </div>
  );
};

export default DayPay;