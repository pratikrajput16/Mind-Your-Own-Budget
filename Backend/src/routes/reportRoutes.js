const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getPdfReport,
} = require("../controllers/reportController");

router.get(
  "/pdf",
  protect,
  getPdfReport
);

module.exports = router;