import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon from react-icons

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    navigate("/"); // Navigate to home page
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
        <div className="flex items-center">
          <ul className="flex space-x-24">
            {" "}
            {/* Increased space between nav items */}
            <li className="relative">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-base font-semibold leading-normal tracking-wide transition duration-200 ${
                    isActive
                      ? "text-gray-300"
                      : "text-white hover:text-gray-400"
                  }`
                }
                style={{ textDecoration: "none" }}
              >
                Dashboard
              </NavLink>
            </li>
            {/* Manage Employee */}
            <li className="relative">
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
            <li className="relative">
              <NavLink
                to="/attendance"
                className={({ isActive }) =>
                  `text-base font-semibold leading-normal tracking-wide transition duration-200 ${
                    isActive
                      ? "text-gray-300"
                      : "text-white hover:text-gray-400"
                  }`
                }
                style={{ textDecoration: "none" }}
              >
                View Attendance
              </NavLink>
            </li>
            {/* Manage Work Package */}
            <li className="relative">
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
            {/* Salary Calculation */}
            <li className="relative">
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
            {/* Manage Products */}
            <li className="relative">
              <div
                onClick={() => toggleDropdown("manage")}
                className="font-medium text-base hover:text-gray-300 cursor-pointer flex items-center"
              >
                Manage Products <span className="ml-1 text-xs">▾</span>
              </div>
              {openDropdown === "manage" && (
                <ul className="mt-1 bg-white text-black rounded shadow px-3 py-1 space-y-1 absolute z-10 text-sm">
                  <li>
                    <NavLink
                      to="/productedit"
                      className="font-bold hover:underline"
                      onClick={closeDropdown}
                    >
                      Edit Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/productadd"
                      className="font-bold hover:underline"
                      onClick={closeDropdown}
                    >
                      Add Products
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-white pt-1 hover:text-gray-300 transition duration-200 flex items-center"
                title="Logout"
              >
                <FiLogOut className="text-xl" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
