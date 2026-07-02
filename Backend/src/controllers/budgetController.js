const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const Startup = require("../models/Startup");
const budgetService = require("../services/budgetService");

const createBudget = asyncHandler(async (req, res) => {
  const { month, year, category, limit } = req.body;

  if (!month || !year || !category || limit == null) {
    throw new ApiError(400, "Month, year, category and limit are required");
  }

  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const budget = await budgetService.createBudget({
    startup: startup._id,
    month,
    year,
    category,
    limit,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Budget created successfully", budget));
});

const getBudgets = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const budgets = await budgetService.getBudgets(startup._id);

  res
    .status(200)
    .json(new ApiResponse(200, "Budgets fetched successfully", budgets));
});

const updateBudget = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const budget = await budgetService.updateBudget(
    req.params.id,
    startup._id,
    req.body,
  );

  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Budget updated successfully", budget));
});

const deleteBudget = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const budget = await budgetService.deleteBudget(req.params.id, startup._id);

  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Budget deleted successfully", null));
});

const getBudgetAnalytics = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const month = Number(req.query.month);
  const year = Number(req.query.year);

  if (!month || !year) {
    throw new ApiError(400, "Month and year are required");
  }

  const analytics = await budgetService.getBudgetAnalytics(
    startup._id,
    month,
    year,
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, "Budget analytics fetched successfully", analytics),
    );
});

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
};
