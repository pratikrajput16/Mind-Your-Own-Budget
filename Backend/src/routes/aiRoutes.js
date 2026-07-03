const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeExpenses,
} = require("../controllers/aiController");

router.get(
  "/analyze",
  protect,
  analyzeExpenses
);

module.exports = router;