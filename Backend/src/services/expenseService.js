const Expense = require("../models/Expense");

const createExpense = async (expenseData) => {
  return await Expense.create(expenseData);
};

const getExpenses = async (startupId, options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {
    startup: startupId,
  };

  // Search
  if (options.search) {
    filter.$or = [
      {
        title: {
          $regex: options.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: options.search,
          $options: "i",
        },
      },
    ];
  }

  // Category Filter
  if (options.category) {
    filter.category = options.category;
  }

  const [expenses, total] = await Promise.all([
    Expense.find(filter)
      .populate("createdBy", "name email")
      .sort(options.sort || "-date")
      .skip(skip)
      .limit(limit),

    Expense.countDocuments(filter),
  ]);

  return {
    expenses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateExpense = async (expenseId, startupId, updateData) => {
  const expense = await Expense.findOne({
    _id: expenseId,
    startup: startupId,
  });

  if (!expense) {
    return null;
  }

  Object.keys(updateData).forEach((key) => {
    if (updateData[key] !== undefined) {
      expense[key] = updateData[key];
    }
  });

  await expense.save();

  return expense;
};

const deleteExpense = async (expenseId, startupId) => {
  const expense = await Expense.findOne({
    _id: expenseId,
    startup: startupId,
  });

  if (!expense) {
    return null;
  }

  await expense.deleteOne();

  return expense;
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
