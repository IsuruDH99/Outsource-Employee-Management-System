const express = require("express");
const router = express.Router();
const { Login } = require("../models"); // Ensure this model exists

// Example route to handle user login (adjust as needed)
router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Example logic (adjust based on your authentication needs)
        const user = await Login.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router; // ✅ Correct export
