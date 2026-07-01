const Expense = require("../models/Expense");

const getDashboardStats = async (startupId) => {
  const expenses = await Expense.find({ startup: startupId });

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const totalTransactions = expenses.length;

  const averageExpense =
    totalTransactions === 0
      ? 0
      : Number((totalExpenses / totalTransactions).toFixed(2));

  let highestExpense = null;
  let lowestExpense = null;

  if (expenses.length > 0) {
    highestExpense = expenses.reduce((max, expense) =>
      expense.amount > max.amount ? expense : max,
    );

    lowestExpense = expenses.reduce((min, expense) =>
      expense.amount < min.amount ? expense : min,
    );
  }

  const categoryBreakdown = await Expense.aggregate([
    {
      $match: {
        startup: startupId,
      },
    },
    {
      $group: {
        _id: "$category",
        total: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
  ]);

  const topCategory =
    categoryBreakdown.length > 0
      ? {
          category: categoryBreakdown[0]._id,
          total: categoryBreakdown[0].total,
        }
      : null;

  let financialHealthScore = 100;

  // If one category is more than 60% of expenses,
  // reduce the score.

  if (topCategory) {
    const percentage = (topCategory.total / totalExpenses) * 100;

    if (percentage > 60) {
      financialHealthScore -= 20;
    }
  }

  // Too many transactions may indicate poor planning.
  if (totalTransactions > 20) {
    financialHealthScore -= 10;
  }

  // Very high average expense
  if (averageExpense > 50000) {
    financialHealthScore -= 10;
  }

  financialHealthScore = Math.max(0, financialHealthScore);

  let financialHealthStatus;

  if (financialHealthScore >= 80) {
    financialHealthStatus = "Excellent";
  } else if (financialHealthScore >= 60) {
    financialHealthStatus = "Good";
  } else if (financialHealthScore >= 40) {
    financialHealthStatus = "Average";
  } else {
    financialHealthStatus = "Poor";
  }

  const monthlyTrend = await Expense.aggregate([
    {
      $match: {
        startup: startupId,
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
        },
        total: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const formattedMonthlyTrend = monthlyTrend.map((item) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    total: item.total,
  }));

  const recentExpenses = await Expense.find({
    startup: startupId,
  })
    .sort({ date: -1 })
    .limit(5)
    .select("title amount category paymentMethod date");

  return {
    totalExpenses,
    totalTransactions,
    averageExpense,

    highestExpense: highestExpense
      ? {
          title: highestExpense.title,
          amount: highestExpense.amount,
        }
      : null,

    lowestExpense: lowestExpense
      ? {
          title: lowestExpense.title,
          amount: lowestExpense.amount,
        }
      : null,

    categoryBreakdown: categoryBreakdown.map((item) => ({
      category: item._id,
      total: item.total,
    })),

    monthlyTrend: formattedMonthlyTrend,
    recentExpenses,
    topCategory,

    financialHealth: {
      score: financialHealthScore,
      status: financialHealthStatus,
    },
  };
};

module.exports = {
  getDashboardStats,
};
