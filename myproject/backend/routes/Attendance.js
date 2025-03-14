const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");

router.post("/add-attendance", async (req, res) => {
    try {
      const { epf, date, intime, outtime } = req.body;
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
      res.json();
    }
  });

  router.get('/get-attendance', async (req, res) => {
    const { fromDate, toDate } = req.query;
  
    // Example query: Fetch attendance data within the given date range
    const attendanceDetails = await Attendance.findAll({
      date: { $gte: new Date(fromDate), $lte: new Date(toDate) }
    });
  
    res.json(attendanceDetails);
  });
  

module.exports = router;