const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op, Sequelize } = require("sequelize");

// Get monthly salary grouped by EPF and Month
router.get("/monthly-salary", async (req, res) => {
  try {
    const { monthYear } = req.query;
    
    if (!monthYear) {
      return res.status(400).json({ error: "Month and year are required" });
    }

    // Parse the monthYear string (format: "YYYY - MMM")
    const [year, monthName] = monthYear.split(" - ");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = monthNames.indexOf(monthName) + 1; // Convert to 1-based index

    // Calculate start and end dates for the selected month
    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 0); // Last day of month

    // Query to get monthly salary grouped by EPF and Month
    const monthlySalaries = await db.Final_salary_view.findAll({
      attributes: [
        'epf',
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('finalSalary')), 'monthlySalary']
      ],
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      group: ['epf', Sequelize.fn('MONTH', Sequelize.col('date'))],
      raw: true,
      order: [
        ['epf', 'ASC'],
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'ASC']
      ]
    });

    res.json(monthlySalaries);
  } catch (error) {
    console.error("Error fetching monthly salary:", error);
    res.status(500).json({ error: "Failed to fetch monthly salary data" });
  }
});

module.exports = router;