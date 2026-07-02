const Budget = require("../models/Budget");

const createBudget = async (budgetData) => {
  return await Budget.create(budgetData);
};

const getBudgets = async (startupId) => {
  return await Budget.find({ startup: startupId }).sort({
    year: -1,
    month: -1,
    category: 1,
  });
};

const updateBudget = async (id, startupId, updateData) => {
  return await Budget.findOneAndUpdate(
    {
      _id: id,
      startup: startupId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );
};

const deleteBudget = async (id, startupId) => {
  return await Budget.findOneAndDelete({
    _id: id,
    startup: startupId,
  });
};

const Expense = require("../models/Expense");

const getBudgetAnalytics = async (startupId, month, year) => {
  const budgets = await Budget.find({
    startup: startupId,
    month,
    year,
  });

  const analytics = [];

  for (const budget of budgets) {
    const expenses = await Expense.find({
      startup: startupId,
      category: budget.category,
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, month] },
          { $eq: [{ $year: "$date" }, year] },
        ],
      },
    });

    const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const remaining = budget.limit - spent;

    const utilization =
      budget.limit === 0
        ? 0
        : Number(((spent / budget.limit) * 100).toFixed(2));

    let status = "Healthy";

    if (utilization >= 100) {
      status = "Over Budget";
    } else if (utilization >= 80) {
      status = "Warning";
    }

    analytics.push({
      category: budget.category,
      budget: budget.limit,
      spent,
      remaining,
      utilization,
      status,
    });
  }

  return analytics;
};

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
};
