const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// POST: Add attendance
router.post("/add-attendance",validateToken, async (req, res) => {
  try {
    const { epf, date, intime, outtime, status } = req.body;

    if (!epf || !date || !intime || !outtime) {
      return res.status(400).json({ 
        success: false, 
        error: "EPF, date, in-time and out-time are required fields" 
      });
    }

    // Check if attendance already exists for this employee on this date
    const existingAttendance = await Attendance.findOne({
      where: {
        epf,
        date
      }
    });

    if (existingAttendance) {
      return res.status(409).json({ 
        success: false, 
        error: "Attendance record already exists for this employee on the selected date",
        existingRecord: existingAttendance
      });
    }

    // If no existing record, create new attendance
    const attendance = await Attendance.create({
      epf,
      date,
      intime,
      outtime,
      status: status || "just-attend" // Default status if not provided
    });

    res.status(201).json({ 
      success: true, 
      message: "Attendance record added successfully",
      attendance 
    });

  } catch (error) {
    console.error("Already exists:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to add attendance",
      details: error.message 
    });
  }
});

router.put("/update-status",validateToken, async (req, res) => {
  const { date, epf, status } = req.body;

  if (!date || !epf || !status) {
    return res.status(400).json({ error: "Date, EPF and status are required" });
  }

  try {
    const [updated] = await Attendance.update(
      { status },
      {
        where: {
          date,
          epf
        }
      }
    );

    if (updated === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update-status-td",validateToken, async (req, res) => {
  const { date, epf, status } = req.body;

  if (!date || !epf || !status) {
    return res.status(400).json({ error: "Date, EPF and status are required" });
  }

  try {
    const [updated] = await Attendance.update(
      { status },
      {
        where: {
          date,
          epf
        }
      }
    );

    if (updated === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
