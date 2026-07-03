const axios = require("axios");

const AI_BASE_URL = "http://127.0.0.1:8000";

const analyzeExpenses = async (expenses) => {
  const response = await axios.post(
    `${AI_BASE_URL}/analyze`,
    {
      expenses,
    }
  );

  return response.data;
};

module.exports = {
  analyzeExpenses,
};