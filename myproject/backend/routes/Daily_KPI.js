const express = require("express");
const router = express.Router();
const { Daily_KPI } = require("../models");

router.post("/save-kpi", async (req, res) => {
  try {
    const { date, epf, productNo, ActualTime } =
      req.body;

    if (
      !date ||
      !epf ||
      !productNo ||
      !ActualTime
    ) {
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
    });

    res
      .status(201)
      .json({ message: "Task Assigned Successfully", task: newTask });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;