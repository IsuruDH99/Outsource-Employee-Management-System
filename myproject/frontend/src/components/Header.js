import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <nav className="w-full px-6 py-3" ref={navRef}>
        <ul className="flex justify-between items-center">
          <li className="relative px-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-base font-semibold leading-normal tracking-wide transition duration-200 ${
                  isActive ? "text-gray-300" : "text-white hover:text-gray-400"
                }`
              }
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </NavLink>
          </li>

          {/* Manage Employee */}
          <li className="relative px-3">
            <div
              onClick={() => toggleDropdown("employee")}
              className="font-medium text-base hover:text-gray-300 cursor-pointer flex items-center"
            >
              Manage Employee <span className="ml-1 text-xs">▾</span>
            </div>
            {openDropdown === "employee" && (
              <ul className="mt-1 bg-white text-black rounded shadow px-3 py-1 space-y-1 absolute z-10 text-sm">
                <li>
                  <NavLink
                    to="/Workeradd"
                    className="font-bold hover:underline"
                    onClick={closeDropdown}
                  >
                    Add Workers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/workerview"
                    className="font-bold hover:underline"
                    onClick={closeDropdown}
                  >
                    View Workers
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="relative px-3">
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `text-base font-semibold leading-normal tracking-wide transition duration-200 ${
                  isActive ? "text-gray-300" : "text-white hover:text-gray-400"
                }`
              }
              style={{ textDecoration: "none" }}
            >
              View Attendance
            </NavLink>
          </li>

          {/* Salary Calculation */}
          <li className="relative px-3">
            <div
              onClick={() => toggleDropdown("salary")}
              className="font-medium text-base hover:text-gray-300 cursor-pointer flex items-center"
            >
              Salary Calculation <span className="ml-1 text-xs">▾</span>
            </div>
            {openDropdown === "salary" && (
              <ul className="mt-1 bg-white text-black rounded shadow px-3 py-1 space-y-1 absolute z-10 text-sm">
                <li>
                  <NavLink
                    to="/salarycal"
                    className="font-bold hover:underline"
                    onClick={closeDropdown}
                  >
                    Salary Calculate
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/salaryView"
                    className="font-bold hover:underline"
                    onClick={closeDropdown}
                  >
                    View Salary
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="relative px-3">
            <NavLink
              to="/productedit"
              className={({ isActive }) =>
                `text-base font-semibold leading-normal tracking-wide transition duration-200 ${
                  isActive ? "text-gray-300" : "text-white hover:text-gray-400"
                }`
              }
              style={{ textDecoration: "none" }}
            >
              Manage Products
            </NavLink>
          </li>

          {/* Manage Work Package */}
          <li className="relative px-3">
            <div
              onClick={() => toggleDropdown("work")}
              className="font-medium text-base hover:text-gray-300 cursor-pointer flex items-center"
            >
              Manage Work Package <span className="ml-1 text-xs">▾</span>
            </div>
            {openDropdown === "work" && (
              <ul className="mt-1 bg-white text-black rounded shadow px-3 py-1 space-y-1 absolute z-10 text-sm">
                <li>
                  <NavLink
                    to="/taskassign"
                    className="font-bold hover:underline"
                    onClick={closeDropdown}
                  >
                    Assign work
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/taskPerformance"
                    className="font-bold hover:underline"
                    onClick={closeDropdown}
                  >
                    View Performance
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
