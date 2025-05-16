import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null); // <- Track clicked menu
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    const isSameMenu = openDropdown === menu;
    setOpenDropdown(isSameMenu ? null : menu);
    setSelectedMenu(isSameMenu ? null : menu); // <- Highlight clicked menu
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      localStorage.removeItem("accessToken");
      navigate("/"); // Navigate to home page
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuStyle = (menu) =>
    `font-medium text-base cursor-pointer flex items-center transition ${
      selectedMenu === menu ? "text-gray-300" : "text-white hover:text-gray-400"
    }`;

  return (
    <header className="bg-blue-700 text-white shadow-md relative z-20">
      <nav className="w-full px-6 py-3" ref={navRef}>
        <div className="flex items-center">
          <ul className="flex space-x-24">
            <li className="relative">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-base font-semibold transition duration-200 no-underline ${
                    isActive
                      ? "text-gray-300"
                      : "text-white hover:text-gray-400"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>

            {/* Manage Employee */}
            <li className="relative">
              <div
                onClick={() => toggleDropdown("employee")}
                className={menuStyle("employee")}
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
            {/* Attendance */}
            <li className="relative">
              <div
                onClick={() => toggleDropdown("attend")}
                className={menuStyle("attend")}
              >
                Attendance <span className="ml-1 text-xs">▾</span>
              </div>
              {openDropdown === "attend" && (
                <ul className="mt-1 bg-white text-black rounded shadow px-2 py-1 space-y-1 absolute z-10 text-sm">
                  <li>
                    <NavLink
                      to="/add-attendance"
                      className="font-bold hover:underline"
                      onClick={closeDropdown}
                    >
                      Add Attendance
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/attendance"
                      className="font-bold hover:underline"
                      onClick={closeDropdown}
                    >
                      View Attendance
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Manage Work Package */}
            <li className="relative">
              <div
                onClick={() => toggleDropdown("work")}
                className={menuStyle("work")}
              >
                Manage Work Package <span className="ml-1 text-xs">▾</span>
              </div>
              {openDropdown === "work" && (
                <ul className="mt-1 bg-white text-black rounded shadow px-2 py-1 space-y-1 absolute z-10 text-sm">
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
                className={menuStyle("salary")}
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
                className={menuStyle("manage")}
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

            {/* Logout Button */}
            <li>
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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-80 text-center">
            <h2 className="text-base font-semibold mb-2">Confirm Logout</h2>
            <p className="text-sm text-gray-700 mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center space-x-1">
              <button
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
          Successfully logged out.
        </div>
      )}
    </header>
  );
};

export default Header;
