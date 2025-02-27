const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = require('./models');
const usersRouter = require('./routes/Login'); // ✅ Ensure correct import

app.use("/login", usersRouter); // ✅ Use a valid route prefix

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
