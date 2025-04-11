
import React, { useState, useRef, useEffect } from "react";

const TaskPerformance = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const vehicles = [
    "Car",
    "Truck",
    "Motorcycle",
    "Bicycle",
    "Bus",
    "Van",
  ];

  // Handle vehicle selection
  const handleVehicleChange = (vehicle) => {
    setSelectedVehicles((prevSelected) => {
      if (prevSelected.includes(vehicle)) {
        return prevSelected.filter((v) => v !== vehicle); // Remove if already selected
      } else {
        return [...prevSelected, vehicle]; // Add if not selected
      }
    });
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Select Vehicle Types</h2>

      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Trigger Button */}
        <button
          onClick={toggleDropdown}
          className="w-full p-3 border rounded-lg bg-gray-100 text-left flex items-center justify-between hover:bg-gray-200 transition-colors"
        >
          <span>
            {selectedVehicles.length > 0
              ? selectedVehicles.join(", ")
              : "Select vehicles"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown Content */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 border rounded-lg bg-white shadow-lg transition-opacity duration-300">
            <div className="space-y-2 p-2">
              {vehicles.map((vehicle) => (
                <label
                  key={vehicle}
                  className={`flex items-center p-2 cursor-pointer rounded-lg transition-colors ${
                    selectedVehicles.includes(vehicle)
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={vehicle}
                    checked={selectedVehicles.includes(vehicle)}
                    onChange={() => handleVehicleChange(vehicle)}
                    className="mr-2"
                  />
                  {vehicle}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Display selected vehicles */}
      {/* <div className="mt-4">
        <h3 className="font-semibold">Selected Vehicles:</h3>
        <ul>
          {selectedVehicles.map((vehicle, index) => (
            <li key={index} className="mt-1">
              {vehicle}
            </li>
          ))}
        </ul>
      </div> */}

    </div>
  );
};

export default TaskPerformance;
