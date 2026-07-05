const asyncHandler = require("../middleware/asyncHandler");
const Startup = require("../models/Startup");

const dashboardService = require("../services/dashboardService");
const pdfService = require("../reports/pdfService");
const csvService = require("../reports/csvService");
const aiService = require("../services/aiService");

const Expense = require("../models/Expense");

const getPdfReport = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  // Dashboard statistics
  const dashboard = await dashboardService.getDashboardStats(startup._id);

  // Get all expenses
  const expenses = await Expense.find({
    startup: startup._id,
  });

  // AI Analysis
  const aiAnalysis = await aiService.analyzeExpenses(expenses);

  // Combine everything
  const reportData = {
    startup,
    dashboard,
    aiAnalysis,
  };

  pdfService.generateReport(res, reportData);
});

const getCsvReport = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  const expenses = await Expense.find({
    startup: startup._id,
  }).lean();

  csvService.generateCSV(res, expenses);
});

module.exports = {
  getPdfReport,
  getCsvReport,
};
