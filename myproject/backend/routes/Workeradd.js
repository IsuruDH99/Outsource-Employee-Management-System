const express = require("express");
const router = express.Router();
const { Workeradd } = require("../models");

router.post("/add-employee", async (req, res) => {
  try {
    const { epf, name } = req.body;
    console.log(epf);
    if (!epf || !name) {
      return res.status(400).json({ error: "epf and name are required" });
    }

    await Workeradd.create({ epf, name });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Route to fetch all workers
router.get("/get-workers", async (req, res) => {
  try {
    const workers = await Workeradd.findAll(); // Fetch all records from the table
    res.status(200).json(workers);
  } catch (error) {
    console.error("Error fetching workers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a worker by ID
router.delete("/delete-worker/:epf", async (req, res) => {
    try {
      const { epf } = req.params;
  
      // Check if worker exists
      const worker = await Workeradd.findByPk(epf);
      if (!worker) {
        return res.status(404).json({ error: "Worker not found" });
      }
  
      // Delete worker
      await Workeradd.destroy({ where: { epf } });
  
      res.status(200).json({ message: "Worker deleted successfully!" });
    } catch (error) {
      console.error("Error deleting worker:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
