import api from "./api";

export const getAIInsights = async () => {
  const response = await api.get("/ai/analyze");
  return response.data.data;
};

export const analyzeExpenses = async () => {
  const response = await api.get("/ai/analyze");
  return response.data.data;
};