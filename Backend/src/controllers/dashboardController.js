const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const Startup = require("../models/Startup");
const dashboardService = require("../services/dashboardService");

const getDashboard = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.user.startup);

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const stats = await dashboardService.getDashboardStats(
    startup._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Dashboard fetched successfully",
      stats
    )
  );
});

module.exports = {
  getDashboard,
};