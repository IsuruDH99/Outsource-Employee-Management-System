const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { Op } = require("sequelize");

// POST: Add attendance
router.post("/add-attendance", async (req, res) => {
  try {
    const { epf, date, intime, outtime } = req.body;

    if (!epf || !date || !intime || !outtime) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const attendance = await Attendance.create({
      epf,
      date,
      intime,
      outtime,
    });

    res.status(201).json({ success: true, attendance });
  } catch (error) {
    console.error("Error adding attendance:", error);
    res.status(500).json({ success: false, error: "Failed to add attendance" });
  }
});

// GET: Fetch attendance between dates
// router.get("/get-attendance", async (req, res) => {
//   try {
//     const { fromDate, toDate } = req.query;

//     // Validation for missing fields
//     if (!fromDate || !toDate) {
//       return res.status(400).json({ error: "fromDate and toDate are required." });
//     }

//     // Optional: validate date format (basic ISO check)
//     const from = new Date(fromDate);
//     const to = new Date(toDate);

//     if (isNaN(from) || isNaN(to)) {
//       return res.status(400).json({ error: "Invalid date format." });
//     }

//     // Ensure fromDate is not after toDate
//     if (from < to) {
//       return res.status(400).json({ error: "'fromDate' cannot be after 'toDate'." });
//     }

//     const attendanceDetails = await Attendance.findAll({
//       where: {
//         date: {
//           [Op.between]: [fromDate, toDate],
//         },
//       },
//       order: [["date", "ASC"]], // Optional: sort by date and EPF
//     });

//     res.json(attendanceDetails);
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


module.exports = router;
