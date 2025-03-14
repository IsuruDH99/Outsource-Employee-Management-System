import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-5">
      {/* Manage Employee Card with Dropdown */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Manage Employee</h5>
          <img src="C:/Users/DELL/Pictures/Screenshots/img.png" alt="Manage Employee" className="w-full h-40 object-cover mb-3" />
          <Dropdown>
            <Dropdown.Toggle variant="primary">Manage Employee</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/Workeradd")}>Add Workers</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/Workerview")}>View Workers</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* View Attendance Card */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">View Attendance</h5>
          <img src="/images/view_attendance.jpg" alt="View Attendance" className="w-full h-40 object-cover mb-3" />
          <Button onClick={() => navigate("/attendance")}>View Attendance</Button>
        </div>
      </div>

      {/* Salary Calculation Card with Dropdown */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Salary Calculation</h5>
          <img src="/images/salary_calculation.jpg" alt="Salary Calculation" className="w-full h-40 object-cover mb-3" />
          <Dropdown>
            <Dropdown.Toggle variant="primary">Salary Calculation</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/salarycal")}>Salary Calculate</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/salaryview")}>Salary View</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Manage Products Card */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Manage Products</h5>
          <img src="/images/manage_products.jpg" alt="Manage Products" className="w-full h-40 object-cover mb-3" />
          <Button onClick={() => navigate("/productedit")}>Manage Products</Button>
        </div>
      </div>

      {/* Performance Tracking Card */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Performance Tracking</h5>
          <img src="/images/performance_tracking.jpg" alt="Performance Tracking" className="w-full h-40 object-cover mb-3" />
          <Button onClick={() => navigate("/")}>Performance Tracking</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;