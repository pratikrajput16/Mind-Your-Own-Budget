const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const API_MESSAGES = {
  STARTUP_NOT_FOUND: "Startup not found",
  EXPENSE_NOT_FOUND: "Expense not found",
  BUDGET_NOT_FOUND: "Budget not found",

  EXPENSE_CREATED: "Expense added successfully",
  EXPENSE_UPDATED: "Expense updated successfully",
  EXPENSE_DELETED: "Expense deleted successfully",

  DASHBOARD_FETCHED: "Dashboard fetched successfully",

  BUDGET_CREATED: "Budget created successfully",
  BUDGET_UPDATED: "Budget updated successfully",
};

module.exports = {
  HTTP_STATUS,
  API_MESSAGES,
};