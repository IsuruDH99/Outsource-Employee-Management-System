import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workeradd from "./pages/Workeradd";
import Attendance from "./pages/Attendance";
import Workerview from "./pages/Workerview";
import Productedit from "./pages/Productedit";
import Salarycal from "./pages/Salarycal";
import Header from "./components/Header";
import UserReg from "./pages/UserReg";
import HourlyTarget from "./pages/HourlyTarget";
import Home from "./pages/Home";
import SalaryView from "./pages/SalaryView";
import TaskAssign from "./pages/TaskAssign";
import TaskKpi from "./pages/TaskKpi";
import KPIMonthly from "./pages/KPIMonthly";
import ProductAdd from "./pages/ProductAdd";
import AddAttendance from "./pages/AddAttendance";


function AppWrapper() {
  const location = useLocation();
  
  // Hide the Header on /login, /home, and /dashboard pages
  const showHeader = !['/login', '/', '/dashboard'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/UserReg' element={<UserReg />} />
        <Route path='/HourlyTarget' element={<HourlyTarget />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/Workeradd' element={<Workeradd />} />
        <Route path='/attendance' element={<Attendance />} />
        <Route path='/workerview' element={<Workerview />} />
        <Route path='/productedit' element={<Productedit />} />
        <Route path='/salarycal' element={<Salarycal />} />
        <Route path='/salaryView' element={<SalaryView />} />
        <Route path='/taskassign' element={<TaskAssign />} />
        <Route path='/taskkpi' element={<TaskKpi />} />
        <Route path='/taskPerformance' element={<KPIMonthly />} />
        <Route path='/productAdd' element={<ProductAdd />} />
        <Route path='/add-attendance' element={<AddAttendance />} />
       
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppWrapper />
      </Router>
    </div>
  );
}

export default App;
