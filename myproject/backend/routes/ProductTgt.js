const express = require('express');
const router = express.Router();
const { ProductTarget } = require('../models'); // Make sure path is correct based on your project structure

// POST route to create a new ProductTarget
router.post('/', async (req, res) => {
  const { productNo, productName, targetHourly } = req.body;

  if (!productNo || !productName || typeof targetHourly !== 'number') {
    return res.status(400).json({ message: 'All fields are required and targetHourly must be a number' });
  }

  try {
    const existing = await ProductTarget.findByPk(productNo);
    if (existing) {
      return res.status(400).json({ message: 'Product already exists with this productNo' });
    }

    const newTarget = await ProductTarget.create({
      productNo,
      ProductName: productName,
      HourlyTarget: targetHourly,
    });

    res.status(201).json(newTarget);
  } catch (error) {
    console.error('Error saving product target:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
