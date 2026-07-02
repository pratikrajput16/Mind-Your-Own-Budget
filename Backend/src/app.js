const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const startupRoutes = require("./routes/startupRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

// Security Middleware
app.use(helmet());

// Logging
app.use(morgan("dev"));

// CORS
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Mind Your Own Budget Backend Running",
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/startup", startupRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/budgets", budgetRoutes);

const errorMiddleware = require("./middleware/errorMiddleware");

app.use(errorMiddleware);

module.exports = app;