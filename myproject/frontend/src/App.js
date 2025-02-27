import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workeradd from "./pages/Workeradd";
import Attendance from "./pages/Attendance";
import Workerview from "./pages/Workerview";
import Productedit from "./pages/Productedit"
import Productadd from "./pages/Productadd";
import Salarycal from "./pages/Salarycal";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/Workeradd' element={<Workeradd/>}/>
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/workerview' element={<Workerview/>}/>
          <Route path='/productedit' element={<Productedit/>}/>
          <Route path='/productadd' element={<Productadd/>}/>
          <Route path='/salarycal' element={<Salarycal/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
