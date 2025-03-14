import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workeradd from "./pages/Workeradd";
import Attendance from "./pages/Attendance";
import Workerview from "./pages/Workerview";
import Productedit from "./pages/Productedit";
import Salarycal from "./pages/Salarycal";
import Header from "./components/Header";
import UserReg from "./pages/UserReg";
import Home from "./pages/Home";
import SalaryView from "./pages/SalaryView";
import TaskAssign from "./pages/TaskAssign";
import TaskKpi from "./pages/TaskKpi";
import TaskPerformance from "./pages/TaskPerformance";
import ProductAdd from "./pages/ProductAdd";
import AddAttendance from "./pages/AddAttendance";
import KPI from "./pages/KPI";

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <Router>
        <Routes>
        <Route exact path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/UserReg' element={<UserReg/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/Workeradd' element={<Workeradd/>}/>
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/workerview' element={<Workerview/>}/>
          <Route path='/productedit' element={<Productedit/>}/>
          <Route path='/salarycal' element={<Salarycal/>}/>
          <Route path='/salaryView' element={<SalaryView/>}/>
          <Route path='/taskassign' element={<TaskAssign/>}/>
          <Route path='/taskkpi' element={<TaskKpi/>}/>
          <Route path='/taskPerformance' element={<TaskPerformance/>}/>
          <Route path='/productAdd' element={<ProductAdd/>}/>
          <Route path='/add-attendance' element={<AddAttendance/>}/>
          <Route path='/kpi' element={<KPI/>}/>
        
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
