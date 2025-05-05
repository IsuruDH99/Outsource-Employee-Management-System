import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import attendance from "../Images/attendance.jpg";
import salary from "../Images/salary.jpeg";
import emp from "../Images/emp.jpg";
import product from "../Images/product.jpg";
import kpi from "../Images/kpi.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-5 pt-2">
      {/* Manage Employee Card with Dropdown */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Manage Employee</h5>
          <img
            src={emp}
            alt="Manage Employee"
            className="w-full h-40 object-cover mb-3"
          />
          <Dropdown>
            <Dropdown.Toggle variant="primary">Manage Employee</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/Workeradd")}>
                Add Workers
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/Workerview")}>
                View Workers
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* View Attendance Card */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">View Attendance</h5>
          <img
            src={attendance}
            alt="View Attendance"
            className="w-full h-40 object-cover mb-3"
          />
          <Button onClick={() => navigate("/attendance")}>
            View Attendance
          </Button>
        </div>
      </div>

      {/* Performance Tracking Card */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Manage Work Package</h5>
          <img
            src={kpi}
            alt="Performance Tracking"
            className="w-full h-40 object-cover mb-3"
          />
          <Dropdown>
            <Dropdown.Toggle variant="primary">
              Manage Work Package
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/taskassign")}>
                Assign Work
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/taskPerformance")}>
                View Performance
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* Salary Calculation Card with Dropdown */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Salary Calculation</h5>
          <img
            src={salary}
            alt="Salary Calculation"
            className="w-full h-40 object-cover mb-3"
          />
          <Dropdown>
            <Dropdown.Toggle variant="primary">
              Salary Calculation
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/salarycal")}>
                Salary Calculate
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/salaryview")}>
                Salary View
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Manage Products Card
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Manage Products</h5>
          <img src={product} alt="Manage Products" className="w-full h-40 object-cover mb-3" />
          <Button onClick={() => navigate("/productedit")}>Manage Products</Button>
        </div>
      </div> */}

      {/* Manage Product Card with Dropdown */}
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold">Manage Products</h5>
          <img
            src={product}
            alt="Manage Products"
            className="w-full h-40 object-cover mb-3"
          />
          <Dropdown>
            <Dropdown.Toggle variant="primary">Manage Products</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate("/productedit")}>
                Edit Products
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("/productadd")}>
                Add Products
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
