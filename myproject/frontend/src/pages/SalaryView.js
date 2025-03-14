import React, { useState, useEffect } from 'react';

const SalaryView = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState('');
  const [salaryData, setSalaryData] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const months = [];

    for (let year = 2020; year <= currentYear; year++) {
      const endMonth = year === currentYear ? currentMonth : 11;
      for (let month = 0; month <= endMonth; month++) {
        const monthYear = `${year}-${(month + 1).toString().padStart(2, '0')}`;
        months.push(monthYear);
      }
    }
    setAvailableMonths(months);
    const initialMonthYear = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}`;
    setSelectedMonthYear(initialMonthYear);
    fetchSalaryData(initialMonthYear);
  }, []);

  const handleMonthYearChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMonthYear(selectedValue);
    fetchSalaryData(selectedValue);
  };

  const fetchSalaryData = async (monthYear) => {
    try {
      setTimeout(() => {
        const dummyData = [
          
        ];
        setSalaryData(dummyData);
      }, 500);
    } catch (error) {
      console.error('Error fetching salary data:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl mt-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Monthly Salary</h1>

      <div className="mb-6 flex justify-center">
        <label htmlFor="monthYear" className="text-lg font-medium text-gray-600 mr-2">Select Month:</label>
        <select
          id="monthYear"
          value={selectedMonthYear}
          onChange={handleMonthYearChange}
          className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          {availableMonths.map((monthYear) => (
            <option key={monthYear} value={monthYear}>{monthYear}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 p-3 text-left">EPF No</th>
              <th className="border border-gray-300 p-3 text-left">Name</th>
              <th className="border border-gray-300 p-3 text-left">Monthly Salary Rs.</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((employee, index) => (
              <tr key={employee.epfNo} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-300 p-3">{employee.epfNo}</td>
                <td className="border border-gray-300 p-3">{employee.name}</td>
                <td className="border border-gray-300 p-3 font-semibold">{employee.monthlySalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Print
        </button>
        <button
          onClick={handleBack}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SalaryView;