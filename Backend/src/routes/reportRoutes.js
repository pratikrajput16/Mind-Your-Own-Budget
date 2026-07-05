const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getPdfReport,
  getCsvReport,
} = require("../controllers/reportController");

router.get(
  "/pdf",
  protect,
  getPdfReport
);

router.get(
  "/csv",
  protect,
  getCsvReport
);

module.exports = router;