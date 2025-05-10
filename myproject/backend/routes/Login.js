const express = require("express");
const router = express.Router();
const { Login } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
const bcrypt = require("bcrypt");

// User registration endpoint
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Login.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Login.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "importantsecret",
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token: accessToken,
      user: { id: user.id, email: user.email }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Protected route example
router.get("/profile", validateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;