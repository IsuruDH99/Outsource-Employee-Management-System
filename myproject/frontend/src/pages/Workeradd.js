import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Workeradd = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [epf, setEpf] = useState("");
  const navigate = useNavigate();

  // Toast notification functions
  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const epfRegex = /^[0-9]{4}$/;

    if (!employeeName || !epf) {
      showError("Please fill in both fields.");
      return;
    } else if (!epfRegex.test(epf)) {
      showError("EPF must be a 4-digit number (e.g., 0001, 1234).");
      return;
    }

    const newEmployee = {
      name: employeeName,
      epf: epf,
    };

    try {
      await axios.post(
        "http://localhost:3001/workeradd/add-employee",
        newEmployee
      );
      setEmployeeName("");
      setEpf("");
      showSuccess("Worker Added Successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      showError("Failed to add worker. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-10">
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: "65px" }}
      />

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md ">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Add New Worker
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EPF Field */}
          <div>
            <label
              htmlFor="epf"
              className="block text-sm font-medium text-gray-700"
            >
              EPF Number
            </label>
            <input
              type="text"
              id="epf"
              value={epf}
              onChange={(e) => setEpf(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="Enter 4-digit EPF (e.g., 0001)"
              maxLength={4}
            />
          </div>

          {/* Name Field */}
          <div>
            <label
              htmlFor="employeeName"
              className="block text-sm font-medium text-gray-700"
            >
              Worker Name
            </label>
            <input
              type="text"
              id="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="Enter worker name"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Add Worker
            </button>
            <button
              type="button"
              onClick={() => navigate("/workerview")}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Workeradd;
