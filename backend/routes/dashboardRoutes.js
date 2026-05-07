const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getDashboardStats,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  },
  getDashboardStats
);

module.exports = router;