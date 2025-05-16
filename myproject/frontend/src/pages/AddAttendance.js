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
  const [isMarkingOutTime, setIsMarkingOutTime] = useState(false);
  const [existingRecord, setExistingRecord] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch workers list on component mount
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:3001/workeradd/get-workers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWorkers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workers:", error);
        toast.error("Failed to load employee list");
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

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
      navigate("/login");
    }
  }, [navigate]);

  const checkExistingRecord = async () => {
    if (!formData.epf || !formData.date) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:3001/attendance/check?epf=${formData.epf}&date=${formData.date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.exists) {
        setExistingRecord(response.data.record);
        if (response.data.record.outtime) {
          toast.info("Both in-time and out-time already recorded for this employee");
        } else {
          toast.info("In-time already recorded. You can record out-time now.");
          setIsMarkingOutTime(true);
        }
      } else {
        setExistingRecord(null);
      }
    } catch (error) {
      console.error("Error checking existing record:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkExistingRecord();
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData.epf, formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      const dataToSend = isMarkingOutTime
        ? { epf: formData.epf, date: formData.date, outtime: formData.outtime }
        : { ...formData, status: "just-attend" };

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
        const successMessage = isMarkingOutTime
          ? "Out-time recorded successfully"
          : "In-time recorded successfully";
        
        toast.success(successMessage);
        setExistingRecord(response.data.attendance);
        
        // Reset form after successful submission
        setFormData({
          epf: formData.epf, // Keep EPF for convenience
          date: formData.date, // Keep date for convenience
          intime: "",
          outtime: "",
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("accessToken");
          navigate("/login");
        } else if (error.response.status === 409) {
          toast.error(error.response.data.error);
          setExistingRecord(error.response.data.existingRecord);
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
        {isMarkingOutTime ? "Record Out Time" : "Record In Time"}
      </h2>
      
      {existingRecord && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            Existing record: In-time: {existingRecord.intime} | 
            Out-time: {existingRecord.outtime || "Not recorded yet"}
          </p>
        </div>
      )}

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsMarkingOutTime(!isMarkingOutTime)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition duration-200"
          disabled={!existingRecord && isMarkingOutTime}
        >
          {isMarkingOutTime ? "Switch to In Time" : "Switch to Out Time"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <div>
          <label htmlFor="epf" className="block text-gray-700 font-medium mb-1">
            Employee
          </label>
          {loading ? (
            <select 
              disabled
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100"
            >
              <option>Loading employees...</option>
            </select>
          ) : (
            <select
              name="epf"
              id="epf"
              value={formData.epf}
              onChange={handleChange}
              className="w-full p-3 border border-gray-100 text-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Employee</option>
              {workers.map((worker) => (
                <option key={worker.epf} value={worker.epf}>
                  {worker.epf} - {worker.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {!isMarkingOutTime ? (
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
              required={!isMarkingOutTime}
              disabled={existingRecord?.intime}
            />
          </div>
        ) : (
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
              required={isMarkingOutTime}
              disabled={existingRecord?.outtime}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition duration-200"
          disabled={
            (!isMarkingOutTime && existingRecord?.intime) || 
            (isMarkingOutTime && existingRecord?.outtime)
          }
        >
          {isMarkingOutTime ? "Record Out Time" : "Record In Time"}
        </button>
      </form>

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