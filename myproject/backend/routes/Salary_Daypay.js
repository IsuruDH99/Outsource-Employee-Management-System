const express = require("express");
const router = express.Router();
const { Salary_Daypay } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
router.post("/add",validateToken, async (req, res) => {
  try {
    const { date, epf, dailySalary, overtimeHours, overtimeSalary, totalDailySalary } = req.body;
    
    const daypay = await Salary_Daypay.create({
      date,
      epf,
      dailySalary,
      overtimeHours,
      overtimeSalary,
      totalDailySalary
    });

    res.status(201).json(daypay);
  } catch (error) {
    console.error("Error creating day pay record:", error);
    res.status(500).json({ message: "Failed to create day pay record" });
  }
});


module.exports = router;
