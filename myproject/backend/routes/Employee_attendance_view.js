const express = require("express");
const router = express.Router();
const { Employee_attendance_view } = require("../models");
const { Op } = require("sequelize");

router.get("/get-attendance", async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    // 1. Validate if both 'fromDate' and 'toDate' are provided
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "'fromDate' and 'toDate' are required." });
    }

    // 2. Convert the 'fromDate' and 'toDate' to JavaScript Date objects
    const from = new Date(fromDate);
    const to = new Date(toDate);

    // 3. Validate the date format
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD." });
    }

    // 4. Ensure fromDate is not after toDate
    if (from > to) {
      return res.status(400).json({ error: "'fromDate' cannot be after 'toDate'." });
    }

    // 5. Query the database using Sequelize 'Op.between' operator to get data within the date range
    const attendanceDetails = await Employee_attendance_view.findAll({
      where: {
        date: {
          [Op.gte]: from,  // fromDate
          [Op.lte]: to,    // toDate
        },
      },
    });

    // 6. Return the fetched data
    res.json(attendanceDetails);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-names", async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    const attendanceDetails = await Employee_attendance_view.findAll({
      where: {
        date: date,
        status: {
          [Op.or]: ["just-attend", "Target"] // This will match either status
        }
      },
      attributes: ["epf", "name", "status"], // Include status in the response
      group: ["epf", "name", "status"], // Add status to group by
    });

    res.json(attendanceDetails);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

  router.get("/get-names-target", async (req, res) => {
    const { date } = req.query;
  
    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }
  
    try {
      const attendanceDetails = await Employee_attendance_view.findAll({
        where: {
          date: date,
          status:"Target"
        },
        attributes: ["epf", "name", "status"],
        group: ["epf", "name", "status"],
      });
  
      res.json(attendanceDetails);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/get-names-daypay", async (req, res) => {
    const { date } = req.query;
  
    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }
  
    try {
      const attendanceDetails = await Employee_attendance_view.findAll({
        where: {
          date: date,
          status: {
            [Op.or]: ["just-attend"] // This will match either status
          }
        },
        attributes: ["epf", "name", "status"], // Include status in the response
        group: ["epf", "name", "status"], // Add status to group by
      });
  
      res.json(attendanceDetails);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/get-attendance-by-epf", async (req, res) => {
    const { date, epf } = req.query;
  
    if (!date || !epf) {
      return res.status(400).json({ 
        error: "Both date and epf parameters are required" 
      });
    }
  
    try {
      const attendanceRecord = await Employee_attendance_view.findOne({
        where: {
          date,
          epf
        },
        attributes: ["id", "epf", "name", "date", "inTime", "outTime","status"]
      });
  
      if (!attendanceRecord) {
        return res.status(404).json({ 
          error: "Attendance record not found for the selected date and employee" 
        });
      }
  
      res.json(attendanceRecord);
    } catch (error) {
      console.error("Error fetching attendance record:", error);
      res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });



module.exports = router;