import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalaryView = () => {
  const navigate = useNavigate();
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [salaryData, setSalaryData] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("Please login first");
      navigate('/login');
    } else {
      initializeMonthSelection();
    }
  }, [navigate]);

  const initializeMonthSelection = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const startYear = currentYear - 1;
    const startMonth = currentMonth;

    const months = [];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    for (let year = startYear; year <= currentYear; year++) {
      const start = year === startYear ? startMonth : 0;
      const end = year === currentYear ? currentMonth - 1 : 11;
      for (let month = start; month <= end; month++) {
        months.push(`${year} - ${monthNames[month]}`);
      }
    }

    setAvailableMonths(months);

    const latestYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const latestMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const initialMonthYear = `${latestYear} - ${monthNames[latestMonth]}`;
    setSelectedMonthYear(initialMonthYear);
    fetchSalaryData(initialMonthYear);
  };

  const handleMonthYearChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMonthYear(selectedValue);
    fetchSalaryData(selectedValue);
  };

  const fetchSalaryData = async (monthYear) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/finalSalary/monthly-salary?monthYear=${monthYear}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        throw new Error('Failed to fetch salary data');
      }

      const data = await response.json();
      setSalaryData(data.map(item => ({
        epfNo: item.epf,
        name: item.name,
        monthlySalary: item.monthlySalary
      })));
    } catch (error) {
      console.error("Error fetching salary data:", error);
      if (error.message === 'Unauthorized') {
        localStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        toast.error("Failed to load salary data");
      }
      setSalaryData([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1); // Better than window.history.back()
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-4xl mt-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Monthly Salary
      </h1>

      <div className="mb-6 flex justify-center">
        <label
          htmlFor="monthYear"
          className="text-lg font-medium text-gray-600 mr-2"
        >
          Select Month:
        </label>
        <select
          id="monthYear"
          value={selectedMonthYear}
          onChange={handleMonthYearChange}
          className="border rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          {availableMonths.map((monthYear) => (
            <option key={monthYear} value={monthYear}>
              {monthYear}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
  <table className="w-3/4 mx-auto border-collapse border border-gray-300 shadow-md rounded-lg pt-2">
    <thead>
      <tr className="bg-blue-500 text-white">
        <th className="border border-gray-300 p-1 text-center w-24">EPF No</th>
        <th className="border border-gray-300 p-1 text-center w-24">Employee Name</th>
        <th className="border border-gray-300 p-1 text-center w-32">Monthly Salary Rs.</th>
      </tr>
    </thead>
    <tbody>
      {salaryData.map((employee, index) => (
        <tr
          key={employee.epfNo}
          className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
        >
          <td className="border border-gray-300 p-1 text-center">{employee.epfNo}</td>
          <td className="border border-gray-300 p-1 text-center">{employee.name}</td>
          <td className="border border-gray-300 p-1 text-center font-semibold">
            {employee.monthlySalary}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>




      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ml-40"
        >
          Print
        </button>
        <button
          onClick={handleBack}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 mr-40"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SalaryView;
