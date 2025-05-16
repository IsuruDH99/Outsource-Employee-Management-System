const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");
const { Workeradd } = require("../models"); // Make sure to import the Workeradd model

router.post("/add-attendance", validateToken, async (req, res) => {
  try {
    const { epf, date, intime, outtime, status } = req.body;

    if (!epf || !date) {
      return res.status(400).json({ 
        success: false, 
        error: "EPF and date are required fields" 
      });
    }

    // Check if EPF exists in Workeradd table
    const workerExists = await Workeradd.findOne({ where: { epf } });

    if (!workerExists) {
      return res.status(404).json({ 
        success: false, 
        error: "EPF not found in worker records" 
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
      // If record exists and we're providing outtime
      if (outtime) {
        // Prevent updating if outtime already exists
        if (existingAttendance.outtime) {
          return res.status(409).json({ 
            success: false, 
            error: "Out-time already recorded for this employee on the selected date",
            existingRecord: existingAttendance
          });
        }
        // Update only if outtime doesn't exist
        existingAttendance.outtime = outtime;
        await existingAttendance.save();
        return res.status(200).json({ 
          success: true, 
          message: "Out-time updated successfully",
          attendance: existingAttendance
        });
      }
      // If record exists and we're trying to add intime again
      else if (intime) {
        return res.status(409).json({ 
          success: false, 
          error: "In-time already recorded for this employee on the selected date",
          existingRecord: existingAttendance
        });
      }
    } else {
      // If no existing record, we must have intime to create a new record
      if (!intime) {
        return res.status(400).json({ 
          success: false, 
          error: "In-time is required to create a new attendance record" 
        });
      }

      // Create new attendance record with just intime
      const attendance = await Attendance.create({
        epf,
        date,
        intime,
        outtime: null, // Initialize outtime as null
        status: status || "just-attend"
      });

      return res.status(201).json({ 
        success: true, 
        message: "In-time recorded successfully",
        attendance 
      });
    }

  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to add attendance",
      details: error.message 
    });
  }
});

router.put("/update-status", async (req, res) => {
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
