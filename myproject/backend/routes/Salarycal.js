const express = require('express');
const router = express.Router();
const db = require('../models'); // Assuming you have your models set up
const Salarycal = db.Salarycal;

// Add a new salary calculation record
router.post('/add', async (req, res) => {
  try {
    const { productNo, ProductName, quantity, payments } = req.body;
    
    const newSalarycal = await Salarycal.create({
      productNo,
      ProductName,
      quantity,
      payments
    });

    res.status(201).json(newSalarycal);
  } catch (error) {
    console.error('Error adding salary calculation:', error);
    res.status(500).json({ error: 'Failed to add salary calculation' });
  }
});

// Get all salary calculations
router.get('/', async (req, res) => {
  try {
    const salarycals = await Salarycal.findAll();
    res.json(salarycals);
  } catch (error) {
    console.error('Error fetching salary calculations:', error);
    res.status(500).json({ error: 'Failed to fetch salary calculations' });
  }
});

// Get salary calculation by product number
router.get('/:productNo', async (req, res) => {
  try {
    const salarycal = await Salarycal.findByPk(req.params.productNo);
    if (!salarycal) {
      return res.status(404).json({ error: 'Salary calculation not found' });
    }
    res.json(salarycal);
  } catch (error) {
    console.error('Error fetching salary calculation:', error);
    res.status(500).json({ error: 'Failed to fetch salary calculation' });
  }
});

// Update a salary calculation
router.put('/:productNo', async (req, res) => {
  try {
    const { ProductName, quantity, payments } = req.body;
    
    const [updated] = await Salarycal.update(
      { ProductName, quantity, payments },
      { where: { productNo: req.params.productNo } }
    );
    
    if (!updated) {
      return res.status(404).json({ error: 'Salary calculation not found' });
    }
    
    const updatedSalarycal = await Salarycal.findByPk(req.params.productNo);
    res.json(updatedSalarycal);
  } catch (error) {
    console.error('Error updating salary calculation:', error);
    res.status(500).json({ error: 'Failed to update salary calculation' });
  }
});

// Delete a salary calculation
router.delete('/:productNo', async (req, res) => {
  try {
    const deleted = await Salarycal.destroy({
      where: { productNo: req.params.productNo }
    });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Salary calculation not found' });
    }
    
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting salary calculation:', error);
    res.status(500).json({ error: 'Failed to delete salary calculation' });
  }
});

// Get all products for target workers
router.get('/target/get-products', async (req, res) => {
  try {
    const products = await Salarycal.findAll({
      attributes: ['productNo', 'ProductName', 'payments'],
      order: [['productNo', 'ASC']]
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;