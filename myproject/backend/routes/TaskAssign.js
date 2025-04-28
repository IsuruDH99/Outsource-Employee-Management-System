const express = require("express");
const router = express.Router();
const { TaskAssign } = require("../models"); // Adjust the path if models folder is different

// Create Task Assignment
router.post("/assign-task", async (req, res) => {
  try {
    const { date, epf, productNo, productName, targetQuantity, targetTimeHrs } =
      req.body;

    if (
      !date ||
      !epf ||
      !productNo ||
      !productName ||
      !targetQuantity ||
      !targetTimeHrs
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Optional: Auto-generate ID if not handled by database
    const latestTask = await TaskAssign.findOne({ order: [["id", "DESC"]] });
    const newId = latestTask ? latestTask.id + 1 : 1;

    const newTask = await TaskAssign.create({
      id: newId,
      date,
      epf,
      productNo,
      productName,
      targetQuantity,
      targetTimeHrs,
    });

    res
      .status(201)
      .json({ message: "Task Assigned Successfully", task: newTask });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-tasks", async (req, res) => {
  try {
    const { date, epf } = req.query;
    if (!date && !epf) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    const tasks = await TaskAssign.findAll({
      where: { date, epf},
    });

    // Format the response to include employee name
    const formattedTasks = tasks.map((task) => ({
      ...task.get({ plain: true }),
      name: task.Employee?.name || "Unknown",
    }));

    res.status(200).json(formattedTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
