const express = require("express");
const router = express.Router();
const { Salary_headers } = require("../models");

// Add to Salaryheaders table
router.post("/add", async (req, res) => {
  try {
    const { date, epf, totalPayment } = req.body;

    if (!date || !epf || totalPayment === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (date, epf, totalPayment)"
      });
    }

    const newHeader = await Salary_headers.create({
      date,
      epf,
      totalPayment
    });

    res.status(201).json({
      success: true,
      message: "Salary header created successfully",
      data: {
        id: newHeader.id,
        ...newHeader.toJSON()
      }
    });

  } catch (error) {
    console.error("Error creating salary header:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create salary header"
    });
  }
});

module.exports = router;