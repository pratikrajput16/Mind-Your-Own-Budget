const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
} = require("../controllers/budgetController");

router.post("/", protect, createBudget);
router.get("/", protect, getBudgets);
router.get("/analytics", protect, getBudgetAnalytics);

router.put("/:id", protect, updateBudget);
router.delete("/:id", protect, deleteBudget);

module.exports = router;