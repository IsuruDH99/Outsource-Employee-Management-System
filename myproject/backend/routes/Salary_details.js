const express = require("express");
const router = express.Router();
const { Salary_details } = require("../models");

// Add to Salarydetails table
router.post("/add", async (req, res) => {
  try {
    const { epf, productNo, productName, quantity, price, payment } = req.body;

    // Validate required fields
    if (!epf || !productNo || !productName || 
        quantity === undefined || price === undefined || payment === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (epf, productNo, productName, quantity, price, payment)"
      });
    }

    // Validate quantity is a positive number
    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive number"
      });
    }

    const newDetail = await Salary_details.create({
      epf,
      productNo,
      productName,
      quantity,
      price,
      payment
    });

    res.status(201).json({
      success: true,
      message: "Salary detail created successfully",
      data: newDetail
    });

  } catch (error) {
    console.error("Error creating salary detail:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create salary detail"
    });
  }
});

module.exports = router;