import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddAttendance = () => {
  const [formData, setFormData] = useState({
    epf: "",
    date: "",
    intime: "",
    outtime: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login first");
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      const dataToSend = {
        ...formData,
        status: "just-attend",
      };

      const response = await axios.post(
        "http://localhost:3001/attendance/add-attendance",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Attendance added successfully.");
        setFormData({
          epf: "",
          date: "",
          intime: "",
          outtime: "",
        });
      } else {
        toast.error(response.data.message || "Failed to add attendance.");
      }
    } catch (error) {
      if (error.response) {
        // Handle different HTTP status codes
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("accessToken");
          navigate("/login");
        } else if (error.response.status === 409) {
          toast.error("Attendance record already exists.");
        } else {
          toast.error(error.response.data.message || "An error occurred");
        }
      } else {
        console.error(error);
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="mt-16 p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-lg">
  <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
    Add Attendance
  </h2>
  <form onSubmit={handleSubmit} className="space-y-5">
    <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
    <input
      type="text"
      name="epf"
      value={formData.epf}
      onChange={handleChange}
      placeholder="EPF Number"
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
    <div className="space-y-4">
  <div>
    <label htmlFor="intime" className="block text-gray-700 font-medium mb-1">
      In Time
    </label>
    <input
      type="time"
      id="intime"
      name="intime"
      value={formData.intime}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>

  <div>
    <label htmlFor="outtime" className="block text-gray-700 font-medium mb-1">
      Out Time
    </label>
    <input
      type="time"
      id="outtime"
      name="outtime"
      value={formData.outtime}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
</div>

    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition duration-200"
    >
      Submit
    </button>
  </form>

  {/* Toast container for showing messages */}
  <ToastContainer
    position="top-center"
    autoClose={1200}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    style={{ marginTop: "70px" }}
  />
</div>

  );
};

export default AddAttendance;

