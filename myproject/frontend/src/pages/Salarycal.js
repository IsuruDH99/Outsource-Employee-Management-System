import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Salarycal = () => {
  // State management
  const [date, setDate] = useState("");
  const [workerType, setWorkerType] = useState("Target");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [dailyRate, setDailyRate] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productList, setProductList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [overtimeRate, setOvertimeRate] = useState(0);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [dailySalary, setDailySalary] = useState(0);
  const [overtimeSalary, setOvertimeSalary] = useState(0);
  const [totalDailySalary, setTotalDailySalary] = useState(0);
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [normalWorkHours, setNormalWorkHours] = useState(0);
  const navigate = useNavigate();
  const [selectedEPF, setSelectedEPF] = useState("");

  // Constants
  const HrID = "HR001";

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

  // Fetch data on component mount and when date changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch employees if date is selected
        if (date) {
          const endpoint =
            workerType === "Target"
              ? `http://localhost:3001/Employee_attendance_view/get-names-target?date=${date}`
              : `http://localhost:3001/Employee_attendance_view/get-names-daypay?date=${date}`;

          const employeesRes = await axios.get(endpoint);
          setEmployeesList(employeesRes.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        showError("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, [date, workerType]);
  // Fetch products for selected employee and date when in Target mode
  useEffect(() => {
    const fetchProductsForEmployee = async () => {
      if (workerType === "Target" && date && selectedEmployee) {
        try {
          const epf = selectedEmployee.split(" - ")[0];
          setSelectedEPF(epf);

          // First fetch assigned products from TaskAssign table
          const taskAssignResponse = await axios.get(
            `http://localhost:3001/TaskAssign/get-products-by?date=${date}&epf=${epf}`
          );

          // Then fetch product details from Target table for each assigned product
          const productsWithDetails = await Promise.all(
            taskAssignResponse.data.map(async (taskProduct) => {
              try {
                const targetResponse = await axios.get(
                  `http://localhost:3001/Target/get-product-details?productNo=${taskProduct.productNo}`
                );
                return {
                  ...taskProduct,
                  ProductName: targetResponse.data.ProductName,
                  price: targetResponse.data.price,
                };
              } catch (err) {
                console.error(
                  `Failed to fetch details for product ${taskProduct.productNo}:`,
                  err
                );
                return {
                  ...taskProduct,
                  ProductName: "Unknown Product",
                  price: 0,
                };
              }
            })
          );

          setProductList(productsWithDetails);
        } catch (err) {
          console.error("Failed to fetch products:", err);
          showError("Failed to fetch products. Please try again.");
        }
      }
    };

    fetchProductsForEmployee();
  }, [date, selectedEmployee, workerType]);

  useEffect(() => {
    const fetchAttendanceAndRate = async () => {
      if (!date || !selectedEmployee) return;

      try {
        const epf = selectedEmployee.split(" - ")[0];
        const [attendanceRes, rateRes] = await Promise.all([
          axios.get(
            `http://localhost:3001/Employee_attendance_view/get-attendance-by-epf?date=${date}&epf=${epf}`
          ),
          axios.get(`http://localhost:3001/daypay/${HrID}`),
        ]);

        setAttendanceData(attendanceRes.data);
        const rate = rateRes.data?.DailyRate || 0;
        setDailyRate(rate);
        setOvertimeRate(rate / 9);

        if (attendanceRes.data?.inTime && attendanceRes.data?.outTime) {
          const calculatedHours = calculateWorkHours(
            attendanceRes.data.inTime,
            attendanceRes.data.outTime
          );
          setWorkHours(calculatedHours);
          setInTime(attendanceRes.data.inTime);
          setOutTime(attendanceRes.data.outTime);
          setNormalWorkHours(calculatedHours);
        }
      } catch (err) {
        console.error("Failed to fetch attendance data:", err);
        setDailyRate(0);
        setOvertimeRate(0);
        showError("Failed to fetch attendance data. Please try again.");
      }
    };

    fetchAttendanceAndRate();
  }, [date, selectedEmployee, workerType]);

  // Helper functions
  const calculateWorkHours = (inTime, outTime) => {
    const inDate = new Date(`1970-01-01T${inTime}`);
    const outDate = new Date(`1970-01-01T${outTime}`);
    if (outDate < inDate) outDate.setDate(outDate.getDate() + 1);
    return (outDate - inDate) / (1000 * 60 * 60);
  };

  const handleAddProduct = () => {
    if (!date || !selectedEmployee || !product || !quantity) {
      showError("⚠️ Please fill in all required fields.");
      return;
    }

    const selectedProduct = productList.find((p) => p.productNo === product);
    if (!selectedProduct) {
      showError("Selected product not found");
      return;
    }

    const payment = parseFloat(selectedProduct.price) * parseFloat(quantity);
    const existingIndex = addedProducts.findIndex(
      (p) => p.productNo === product
    );

    if (existingIndex >= 0) {
      const updatedProducts = [...addedProducts];
      updatedProducts[existingIndex] = {
        ...updatedProducts[existingIndex],
        quantity: parseFloat(quantity),
        payment,
      };
      setAddedProducts(updatedProducts);
    } else {
      setAddedProducts((prev) => [
        ...prev,
        {
          productNo: product,
          productName: selectedProduct.productName,
          quantity: parseFloat(quantity),
          price: parseFloat(selectedProduct.price),
          payment,
        },
      ]);
    }

    setQuantity("");
  };

  useEffect(() => {
    if (!attendanceData || workerType !== "Day Pay") return;

    const calculateWorkHoursAndOvertime = () => {
      console.log("Calculating work hours and overtime...");
      const inTime = attendanceData.inTime;
      const outTime = attendanceData.outTime;
      let workHours = 0;
      let calculatedOvertimeHours = 0;

      // Full day (07:00-07:30 to 17:30-18:00)
      if (
        inTime >= "07:00" &&
        inTime <= "07:30" &&
        outTime >= "17:30" &&
        outTime <= "18:00"
      ) {
        workHours = 9;
      }
      // Half day morning (07:00-07:30 to 12:00-12:30)
      else if (
        inTime >= "07:00" &&
        inTime <= "07:30" &&
        outTime >= "12:00" &&
        outTime <= "12:30"
      ) {
        workHours = 4.5;
      }
      // Half day afternoon (12:00-12:30 to 17:30-18:00)
      else if (
        inTime >= "12:00" &&
        inTime <= "12:30" &&
        outTime >= "17:30" &&
        outTime <= "18:00"
      ) {
        workHours = 4.5;
      }
      // Overtime case (out time between 18:00-22:00)
      else if (outTime >= "18:00" && outTime <= "22:00") {
        workHours = 9; // Regular work hours

        // Calculate overtime (difference between out time and 17:30)
        const [outH, outM] = outTime.split(":").map(Number);
        // Round to nearest half hour
        const roundedM = outM >= 45 ? 30 : outM >= 15 ? 30 : 0;
        const roundedOutH = outM >= 45 ? outH + 1 : outH;
        const roundedOutTime = `${roundedOutH}:${roundedM === 0 ? "00" : "30"}`;

        // Calculate overtime hours
        const endTime = "17:30";
        const diff = calculateWorkHours(endTime, roundedOutTime);
        calculatedOvertimeHours = diff > 0 ? diff : 0;
      }

      const calculatedDailySalary =
        workHours === 9 ? dailyRate : workHours === 4.5 ? dailyRate / 2 : 0;
      const calculatedOvertimeSalary = calculatedOvertimeHours * overtimeRate;
      const calculatedTotalDailySalary =
        calculatedDailySalary + calculatedOvertimeSalary;

      console.log("Calculated values:", {
        date,
        workHours,
        calculatedOvertimeHours,
        dailyRate,
        overtimeRate,
        calculatedDailySalary,
        calculatedOvertimeSalary,
        calculatedTotalDailySalary,
      });

      setWorkHours(workHours);
      setOvertimeHours(calculatedOvertimeHours);
      setDailySalary(calculatedDailySalary);
      setOvertimeSalary(calculatedOvertimeSalary);
      setTotalDailySalary(calculatedTotalDailySalary);
    };

    calculateWorkHoursAndOvertime();
  }, [attendanceData, workerType, dailyRate, overtimeRate]);

  const handleSubmit = async () => {
    if (workerType === "Target" && addedProducts.length === 0) {
      showError("Please add at least one product.");
      return;
    }

    try {
      const epf = selectedEmployee.split(" - ")[0];
      const name = selectedEmployee.split(" - ")[1];
      let paymentData;
      let statusToUpdate = "";

      if (workerType === "Target") {
        paymentData = {
          type: "Target",
          totalPayment: addedProducts.reduce((sum, p) => sum + p.payment, 0),
        };
        statusToUpdate = "Target-salary-added";
      } else {
        paymentData = {
          type: "Day Pay",
          totalPayment: totalDailySalary,
          dailySalary,
          overtimeHours,
          overtimeSalary,
          totalDailySalary,
        };
        statusToUpdate = "Daypay-salary-added";
      }
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      // Axios request config with JWT header
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Save salary data (Target/Day Pay)
      if (workerType === "Target") {
        // 1. Save salary header
        await axios.post(
          "http://localhost:3001/Salaryheaders/add",
          {
            date,
            epf,
            totalPayment: paymentData.totalPayment,
          },
          axiosConfig
        );

        // 2. Save salary details (products)
        await Promise.all(
          addedProducts.map((product) =>
            axios.post(
              "http://localhost:3001/Salarydetails/add",
              {
                epf,
                productNo: product.productNo,
                productName: product.productName,
                quantity: product.quantity,
                price: product.price,
                payment: product.payment,
              },
              axiosConfig
            )
          )
        );
      } else {
        // Save Day Pay data
        await axios.post(
          "http://localhost:3001/Salarydaypay/add",
          {
            date,
            epf,
            dailySalary,
            overtimeHours,
            overtimeSalary,
            totalDailySalary,
          },
          axiosConfig
        );
      }

      // Update attendance status
      await axios.put(
        "http://localhost:3001/attendance/update-status-td",
        {
          date,
          epf,
          status: statusToUpdate,
        },
        axiosConfig
      );

      // Reset form
      setDate("");
      setSelectedEmployee("");
      setDailySalary("");
      setOvertimeHours("");
      setOvertimeSalary("");
      setTotalDailySalary("");
      setInTime("");
      setOutTime("");
      setWorkHours("");
      showSuccess("Successfully Saved!");
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      showError(error.message || "Failed to submit salary. Please try again.");
    }
  };

  const resetForm = () => {
    setSelectedEmployee("");
    setProduct("");
    setQuantity("");
    setAddedProducts([]);
  };

  const handleClear = () => {
    setDate("");
    resetForm();
  };

  useEffect(() => {
    const total = addedProducts.reduce((sum, p) => sum + p.payment, 0);
    setTotalPayment(total);
  }, [addedProducts]);

  const renderEmployeeDropdown = () => (
    <div className="flex items-center mb-4 gap-4 ml-16">
      <label className="w-48">Select Employee:</label>
      <div className="relative w-48">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full p-2 border rounded bg-gray-100 text-left"
        >
          {selectedEmployee || "Select Employee"}
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-2 border rounded-lg bg-white shadow-lg max-h-80 overflow-y-auto">
            <div className="space-y-2 p-2">
              {employeesList.map((emp) => {
                const employeeLabel = `${emp.epf} - ${emp.name}`;
                return (
                  <div
                    key={emp.epf}
                    className={`flex items-center p-2 cursor-pointer rounded-lg ${
                      selectedEmployee === employeeLabel
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setSelectedEmployee(employeeLabel);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {employeeLabel}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTargetWorkerForm = () => (
    <>
      <div className="pt-4">
        {/* Product Row */}
        <div className="flex items-center gap-6 mb-4 ml-16">
          <label className="w-20">Product:</label>
          <div className="relative w-20"></div>
          <select
            className="w-48 p-2 border rounded"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            disabled={!date || !selectedEmployee}
          >
            <option value="">Select Product</option>
            {productList.map((p) => (
              <option key={p.productNo} value={p.productNo}>
                {p.productNo} - {p.productName}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Row */}
        <div className="flex items-center gap-6 mb-6 ml-16">
          <label className="w-20">Quantity:</label>
          <div className="relative w-20"></div>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-48 p-1 border rounded"
          />
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={handleAddProduct}
          className="w-96 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto"
        >
          Add Product
        </button>
      </div>

      {addedProducts.length > 0 && (
        <div className="mb-6">
          <table className="w-full border mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border text-left">Product Name</th>
                <th className="p-2 border text-right">Rate (Rs.)</th>
                <th className="p-2 border text-right">Quantity</th>
                <th className="p-2 border text-right">Payment (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {addedProducts.map((product, index) => (
                <tr key={index}>
                  <td className="p-2 border">{product.productName}</td>
                  <td className="p-2 border text-right">
                    {product.price.toFixed(2)}
                  </td>
                  <td className="p-2 border text-right">{product.quantity}</td>
                  <td className="p-2 border text-right">
                    {product.payment.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td className="p-2 border text-right" colSpan="3">
                  Total Payment:
                </td>
                <td className="p-2 border text-right">
                  Rs. {totalPayment.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );

  const renderDayPayWorkerForm = () => {
    return (
      <>
        {attendanceData && (
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 text-sm font-medium">In Time</label>
              <div className="p-2 bg-gray-50 rounded">{inTime || "0"}</div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Out Time</label>
              <div className="p-2 bg-gray-50 rounded">{outTime || "0"}</div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Normal Work Hours
              </label>
              <div className="p-2 bg-gray-50 rounded">
                {workHours ? workHours : "0"}
              </div>
            </div>
          </div>
        )}

        {overtimeHours > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Overtime Hours
              </label>
              <div className="p-2 bg-gray-50 rounded">
                {overtimeHours.toFixed(1)}
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Overtime Payment (Rs.)
              </label>
              <div className="p-2 bg-gray-50 rounded">
                {overtimeSalary.toFixed(2)}
              </div>
            </div>
          </div>
        )}
        {selectedEmployee && (
          <div className="bg-blue-50 rounded-lg pt-2 mb-4 pb-3">
            <h3 className="font-bold text-center text-blue-800 pt-2">
              Total Daily Salary: Rs. {totalDailySalary.toFixed(2)}
            </h3>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex justify-center pb-40 pt-12 bg-gray-100">
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

      <div className="w-full max-w-3xl bg-white pl-4 pr-4 pt-4 pb-24 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Salary Calculator
        </h2>

        <div className="flex justify-center mb-4 gap-2 ">
          <button
            onClick={() => setWorkerType("Target")}
            className={`px-4 py-2 rounded font-medium text-sm ${
              workerType === "Target" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Target
          </button>
          <button
            onClick={() => setWorkerType("Day Pay")}
            className={`px-4 py-2 rounded font-medium text-sm ${
              workerType === "Day Pay"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Day Pay
          </button>
        </div>

        <div className="flex items-center mb-4 gap-4 ml-16">
          <label className="w-48">Select Date : </label>
          <div className="relative w-48">
            <input
              type="date"
              value={date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 pl-3  pr-10 border rounded cursor-pointer"
            />

            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500"></div>
          </div>
        </div>

        {renderEmployeeDropdown()}

        {workerType === "Target"
          ? renderTargetWorkerForm()
          : renderDayPayWorkerForm()}

        <div className="flex justify-between mt-4 mr-20 ml-20 pt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="bg-blue-500 hover:bg-indigo-500 text-white px-4 py-2 rounded transition-colors duration-200"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Salarycal;
