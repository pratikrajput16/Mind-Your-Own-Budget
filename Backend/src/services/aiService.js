const axios = require("axios");

const AI_BASE_URL = process.env.AI_SERVICE_URL;

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