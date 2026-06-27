const Startup = require("../models/Startup");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const createStartup = asyncHandler(async (req, res) => {
  const { name, industry, teamSize, monthlyBudget, currency } = req.body;

  if (!name || !industry) {
    throw new ApiError(400, "Startup name and industry are required");
  }

  // Check if user already owns a startup
  const existingStartup = await Startup.findOne({ owner: req.user._id });

  if (existingStartup) {
    throw new ApiError(400, "You have already created a startup");
  }

  const startup = await Startup.create({
    name,
    industry,
    teamSize,
    monthlyBudget,
    currency,
    owner: req.user._id,
    members: [req.user._id],
  });

  // Link startup to user
  await User.findByIdAndUpdate(req.user._id, {
    startup: startup._id,
  });

  res.status(201).json(
    new ApiResponse(201, "Startup created successfully", startup)
  );
});

const getMyStartup = asyncHandler(async (req, res) => {
  const startup = await Startup.findOne({
    owner: req.user._id,
  }).populate("owner", "name email");

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  res.status(200).json(
    new ApiResponse(200, "Startup fetched successfully", startup)
  );
});

const updateStartup = asyncHandler(async (req, res) => {
  const startup = await Startup.findOne({
    owner: req.user._id,
  });

  if (!startup) {
    throw new ApiError(404, "Startup not found");
  }

  const {
    name,
    industry,
    teamSize,
    monthlyBudget,
    currency,
  } = req.body;

  if (name !== undefined) startup.name = name;
  if (industry !== undefined) startup.industry = industry;
  if (teamSize !== undefined) startup.teamSize = teamSize;
  if (monthlyBudget !== undefined) startup.monthlyBudget = monthlyBudget;
  if (currency !== undefined) startup.currency = currency;

  await startup.save();

  res.status(200).json(
    new ApiResponse(200, "Startup updated successfully", startup)
  );
});

module.exports = {
  createStartup,
  getMyStartup,
  updateStartup,
};