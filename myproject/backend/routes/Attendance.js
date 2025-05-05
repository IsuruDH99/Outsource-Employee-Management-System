const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { Op } = require("sequelize");

// POST: Add attendance
router.post("/add-attendance", async (req, res) => {
  try {
    const { epf, date, intime, outtime, status } = req.body;

    if (!epf || !date || !intime || !outtime) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const attendance = await Attendance.create({
      epf,
      date,
      intime,
      outtime,
      status: status || "just-attend" // Use provided status or default to "just-attend"
    });

    res.status(201).json({ success: true, attendance });
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ success: false, error: "Failed to add attendance" });
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

router.put("/update-status-td", async (req, res) => {
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
