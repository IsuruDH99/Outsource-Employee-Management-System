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

const producteditRouter = require('./routes/Productedit');
app.use("/productedit", producteditRouter);

const workeraddRouter = require('./routes/Workeradd');
app.use("/workeradd", workeraddRouter);

const salarycalRouter = require('./routes/Salarycal');
app.use("/salarycal", salarycalRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
