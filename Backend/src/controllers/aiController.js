const asyncHandler = require("../middleware/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const Expense = require("../models/Expense");
const aiService = require("../services/aiService");

const analyzeExpenses = asyncHandler(async (req, res) => {

  const expenses = await Expense.find({
    startup: req.user.startup,
  });

  const result = await aiService.analyzeExpenses(
    expenses
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "AI analysis completed",
      result
    )
  );
});

module.exports = {
  analyzeExpenses,
};