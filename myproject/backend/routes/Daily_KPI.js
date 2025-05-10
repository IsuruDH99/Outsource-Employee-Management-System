const express = require("express");
const router = express.Router();
const { Daily_KPI } = require("../models");

router.post("/save-kpi", async (req, res) => {
  try {
    const { date, epf, productNo, ActualTime } = req.body;

    if (!date || !epf || !productNo || !ActualTime) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Optional: Auto-generate ID if not handled by database
    const latestTask = await Daily_KPI.findOne({ order: [["id", "DESC"]] });
    const newId = latestTask ? latestTask.id + 1 : 1;

    const newTask = await Daily_KPI.create({
      id: newId,
      date,
      epf,
      productNo,
      ActualTime,
      status: "actual-time-updated" // Explicitly set status
    });

    res.status(201).json({ 
      message: "Task Assigned Successfully", 
      task: newTask 
    });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// In your Daily_KPI routes file
router.put("/update-status", async (req, res) => {
  try {
    const { date, epf, productNo, status } = req.body;
    
    if (!date || !epf || !productNo || !status) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const updated = await Daily_KPI.update(
      { status },
      { 
        where: { 
          date,
          epf,
          productNo
        } 
      }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ error: "KPI record not found" });
    }

    res.status(200).json({ message: "KPI status updated successfully" });
  } catch (error) {
    console.error("Error updating KPI status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new route to update existing tasks
router.put("/update-kpi/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ActualTime } = req.body;

    if (!ActualTime) {
      return res.status(400).json({ error: "ActualTime is required." });
    }

    const updatedTask = await Daily_KPI.update(
      {
        ActualTime,
        status: "actual-time-updated" // Update status when updating time
      },
      {
        where: { id }
      }
    );

    if (updatedTask[0] === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ 
      message: "Task updated successfully",
      status: "actual-time-updated"
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;