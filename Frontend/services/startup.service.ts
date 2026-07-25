import api from "@/lib/api";

export const createStartup = async (startup: {
  name: string;
  industry: string;
  monthlyBudget: number;
  teamSize: number;
  currency: string;
}) => {
  const response = await api.post("/startup", startup);
  return response.data;
};

export const getMyStartup = async () => {
  const response = await api.get("/startup");
  return response.data;
};