const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createStartup,
  getMyStartup,
  updateStartup,
} = require("../controllers/startupController");

router.post("/", protect, createStartup);
router.get("/", protect, getMyStartup);
router.put("/", protect, updateStartup);

module.exports = router;