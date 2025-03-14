const express = require("express");
const router = express.Router();
const { Target } = require("../models");

router.post("/add-products", async (req, res) => {
  try {
    const { productNo, ProductName, price } = req.body;

    if (!productNo || !ProductName || !price) {
      return res
        .status(400)
        .json({ error: "productNo,ProductName,price are required" });
    }

    await Target.create({ productNo, ProductName, price });

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

router.put("/update-product/:productNo", async (req, res) => {
  const { productNo } = req.params;
  const { ProductName, price } = req.body;

  try {
    // Find the product by productCode
    const product = await Target.findOne({ where: { productNo } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product details
    product.ProductName = ProductName;
    product.price = price;
    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
