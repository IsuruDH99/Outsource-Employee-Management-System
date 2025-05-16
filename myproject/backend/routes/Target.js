const express = require("express");
const router = express.Router();
const { Target } = require("../models");

router.post("/add-products", async (req, res) => {
  try {
    const { productNo, ProductName, price, packSize, hourlyTarget } = req.body;

    if (!productNo || !ProductName || !price || !packSize || !hourlyTarget) {
      return res
        .status(400)
        .json({ error: "productNo,ProductName,price,pack size and hourly target are required" });
    }

    await Target.create({ productNo, ProductName, price, packSize, hourlyTarget });

    res.status(201).json({ message: "product details added successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const product = await Target.findAll(); // Fetch all records from the table
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/product-name', async (req, res) => {
  try {
    const productTargets = await Target.findAll({
      attributes: ['productNo', 'ProductName','packSize', 'HourlyTarget'],
    });
    res.status(200).json(productTargets);
  } catch (error) {
    console.error('Error fetching product targets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put("/update-product/:productNo", async (req, res) => {
  const { productNo } = req.params;
  const { ProductName, price, packSize, hourlyTarget } = req.body;

  try {
    // Find the product by productCode
    const product = await Target.findOne({ where: { productNo } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product details
    product.ProductName = ProductName;
    product.price = price;
    product.packSize = packSize;
    product.hourlyTarget = hourlyTarget;
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete-product/:productNo", async (req, res) => {
  const { productNo } = req.params;

  try {
    // Find the product by productNo
    const product = await Target.findOne({ where: { productNo } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await product.destroy();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// In your Target controller
router.get('/get-product-details', async (req, res) => {
  try {
    const { productNo } = req.query;
    const product = await Target.findOne({ where:{productNo} });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({
      productName: product.ProductName,
      price: product.price
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
