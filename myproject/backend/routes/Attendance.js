const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { Op } = require("sequelize");

// POST: Add attendance
router.post("/add-attendance", async (req, res) => {
  try {
    const { epf, date, intime, outtime } = req.body;

    if (!epf || !date || !intime || !outtime) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const attendance = await Attendance.create({
      epf,
      date,
      intime,
      outtime,
    });

    res.status(201).json({ success: true, attendance });
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ success: false, error: "Failed to add attendance" });
  }
});


module.exports = router;
