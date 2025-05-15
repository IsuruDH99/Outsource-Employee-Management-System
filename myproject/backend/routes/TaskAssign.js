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
      status: "task-assigned",
    });

    res
      .status(201)
      .json({ message: "Task Assigned Successfully", task: newTask });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Task Status
router.put("/update-task-status", async (req, res) => {
  try {
    const { taskId, status } = req.body;
    
    if (!taskId || !status) {
      return res.status(400).json({ error: "Task ID and status are required." });
    }

    const updated = await TaskAssign.update(
      { status },
      { where: { id: taskId } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task status updated successfully" });
  } catch (error) {
    console.error("Error updating task status:", error);
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
      where: { date, epf, status:"task-assigned"},
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
// Get products by date and EPF
router.get("/get-products-by-date-epf", async (req, res) => {
  try {
    const { date, epf } = req.query;

    if (!date || !epf) {
      return res.status(400).json({ error: "Date and EPF are required" });
    }

    const products = await TaskAssign.findAll({
      where: {
        date,
        epf,
        status: "task-assigned"  // Only get tasks with "task-assigned" status
      },
      attributes: ["productNo", "productName"],
      group: ["productNo", "productName"] // Grouping to remove duplicates
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by date and EPF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
