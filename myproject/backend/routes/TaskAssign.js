const express = require('express');
const router = express.Router();
const { TaskAssign } = require('../models'); // Adjust the path if models folder is different

// Create Task Assignment
router.post('/assign-task', async (req, res) => {
  try {
    const { date, epf, productNo, targetQuantity, targetTimeHrs } = req.body;

    if (!date || !epf || !productNo || !targetQuantity || !targetTimeHrs) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Optional: Auto-generate ID if not handled by database
    const latestTask = await TaskAssign.findOne({ order: [['id', 'DESC']] });
    const newId = latestTask ? latestTask.id + 1 : 1;

    const newTask = await TaskAssign.create({
      id: newId,
      date,
      epf,
      productNo,
      targetQuantity,
      targetTimeHrs,
    });

    res.status(201).json({ message: "Task Assigned Successfully", task: newTask });
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get All Assigned Tasks (optional for you)
router.get('/get-assigned-tasks', async (req, res) => {
  try {
    const tasks = await TaskAssign.findAll({
      order: [['date', 'DESC']],
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// (Optional) Get Assigned Tasks by Date
router.get('/get-assigned-tasks-by-date', async (req, res) => {
  const { date } = req.query;
  try {
    if (!date) {
      return res.status(400).json({ error: "Date is required." });
    }

    const tasks = await TaskAssign.findAll({ where: { date } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks by date:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
