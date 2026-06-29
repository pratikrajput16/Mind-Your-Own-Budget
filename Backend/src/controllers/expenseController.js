const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const Startup = require("../models/Startup");
const expenseService = require("../services/expenseService");

const createExpense = asyncHandler(async (req, res) => {
  const {
    title,
    amount,
    category,
    paymentMethod,
    description,
    date,
  } = req.body;

  if (!title || !amount || !category) {
    throw new ApiError(
      400,
      "Title, amount and category are required"
    );
  }

  // Find the startup of the logged-in user
  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const expense = await expenseService.createExpense({
    title,
    amount,
    category,
    paymentMethod,
    description,
    date,
    startup: startup._id,
    createdBy: req.user._id,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      "Expense added successfully",
      expense
    )
  );
});

const getExpenses = asyncHandler(async (req, res) => {

  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const result = await expenseService.getExpenses(
    startup._id,
    req.query
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Expenses fetched successfully",
      result
    )
  );
});

const updateExpense = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const expense = await expenseService.updateExpense(
    req.params.id,
    startup._id,
    req.body
  );

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      "Expense updated successfully",
      expense
    )
  );
});

const deleteExpense = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const expense = await expenseService.deleteExpense(
    req.params.id,
    startup._id
  );

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      "Expense deleted successfully",
      null
    )
  );
});

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};