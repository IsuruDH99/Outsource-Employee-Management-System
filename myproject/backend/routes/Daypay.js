const express = require("express");
const router = express.Router();
const { Daypay } = require("../models");

// Get DailyRate by HrID
router.get("/:HrID", async (req, res) => {
  const { HrID } = req.params;
  try {
    const record = await Daypay.findOne({ where: { HrID } });
    if (record) {
      res.json({
        HrID: record.HrID,
        DailyRate: record.DailyRate
      });
    } else {
      // Return a default rate if not found (you can adjust this as needed)
      res.json({
        HrID,
        DailyRate:0
      });
    }
  } catch (error) {
    console.error("Error fetching daily rate:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update or Insert DailyRate
router.put("/update", async (req, res) => {
  const { HrID, DailyRate } = req.body;
  try {
    const [record, created] = await Daypay.upsert({ HrID, DailyRate });
    res.json({ 
      message: created ? "Inserted" : "Updated",
      HrID,
      DailyRate
    });
  } catch (error) {
    console.error("Error updating daily rate:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
