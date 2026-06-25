const mongoose = require("mongoose");
const EXPENSE_CATEGORIES = require("../constants/categories");

const budgetSchema = new mongoose.Schema(
  {
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      enum: EXPENSE_CATEGORIES,
      required: true,
    },

    limit: {
      type: Number,
      required: true,
      min: 0,
    },

    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

budgetSchema.index(
  {
    startup: 1,
    month: 1,
    year: 1,
    category: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Budget", budgetSchema);