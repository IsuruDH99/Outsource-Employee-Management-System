const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op, Sequelize } = require("sequelize");

router.get("/monthly-kpi", async (req, res) => {
  try {
    const { monthYear } = req.query;
    if (!monthYear) {
      return res.status(400).json({ error: "Month and year are required" });
    }

    // Parse the monthYear string
    const [year, monthName] = monthYear.split(" - ");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = monthNames.indexOf(monthName) + 1;

    // Calculate dates
    const startDate = new Date(year, monthIndex - 1, 1);
    const endDate = new Date(year, monthIndex, 0);

    // Query with proper type casting and null handling
    const monthlyKpis = await db.sequelize.query(`
      SELECT 
        epf, 
        name,
        CASE 
          WHEN SUM(ActualTime) = 0 THEN 0
          WHEN SUM(targetTimeHrs) IS NULL THEN NULL
          WHEN SUM(ActualTime) IS NULL THEN NULL
          ELSE ROUND(SUM(targetTimeHrs) / SUM(ActualTime), 2)
        END AS kpi
      FROM Monthlykpi_worker_view
      WHERE date BETWEEN :startDate AND :endDate
      GROUP BY epf, name, MONTH(date)
    `, {
      replacements: { startDate, endDate },
      type: db.sequelize.QueryTypes.SELECT
    });

    // Ensure kpi is always a number or null
    const processedData = monthlyKpis.map(item => ({
      ...item,
      kpi: item.kpi !== null ? Number(item.kpi) : null
    }));

    res.json(processedData);
  } catch (error) {
    console.error("Error fetching monthly KPI:", error);
    res.status(500).json({ error: "Failed to fetch monthly KPI data" });
  }
});

module.exports = router;