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

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
