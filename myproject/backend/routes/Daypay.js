const express = require("express");
const router = express.Router();
const { Daypay } = require("../models");

// Get HourlyRate by HrID
router.get("/:HrID", async (req, res) => {
  const { HrID } = req.params;
  try {
    const record = await Daypay.findOne({ where: { HrID } });
    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error("Error fetching hourly rate:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update or Insert HourlyRate
router.put("/update", async (req, res) => {
  const { HrID, HourlyRate } = req.body;
  try {
    const [record, created] = await Daypay.upsert({ HrID, HourlyRate });
    res.json({ message: created ? "Inserted" : "Updated" });
  } catch (error) {
    console.error("Error updating hourly rate:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
