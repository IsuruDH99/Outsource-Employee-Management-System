const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = require('./models');

const usersRouter = require('./routes/Login');
app.use("/auth", usersRouter);

const attendanceRouter = require('./routes/Attendance');
app.use("/attendance", attendanceRouter);

const producteditRouter = require('./routes/Target');
app.use("/target", producteditRouter);

const workeraddRouter = require('./routes/Workeradd');
app.use("/workeradd", workeraddRouter);

const salarycalRouter = require('./routes/Salarycal');
app.use("/salarycal", salarycalRouter);

const daypayRouter = require('./routes/Daypay');
app.use("/daypay", daypayRouter);

const productTgtRoute = require('./routes/ProductTgt');
app.use('/producttarget', productTgtRoute);

const empviewRoute = require('./routes/Employee_attendance_view');
app.use('/Employee_attendance_view', empviewRoute);

const saldetailsRoute = require('./routes/Salary_details');
app.use('/Salarydetails', saldetailsRoute);

const salheaderRoute = require('./routes/Salary_headers');
app.use('/Salaryheaders', salheaderRoute);

const salarydaypayRoute = require('./routes/Salary_Daypay');
app.use('/Salarydaypay', salarydaypayRoute);

const taskassignRoute = require('./routes/TaskAssign');
app.use('/TaskAssign', taskassignRoute);

const dailykpiRoute = require('./routes/Daily_KPI');
app.use('/dailykpi', dailykpiRoute);

const kpimonthly_viewRoute = require('./routes/KPImonthly_view');
app.use('/kpimonthly_view', kpimonthly_viewRoute);

const finalSalary_viewRoute = require('./routes/Final_Salary_view');
app.use('/finalSalary', finalSalary_viewRoute);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
