import api from "./api";

export const getExpenses = async () => {
  const response = await api.get("/expenses");
  return response.data.data;
};

export const createExpense = async (expense: any) => {
  const response = await api.post("/expenses", expense);
  return response.data.data;
};

export const updateExpense = async (
  id: string,
  expense: any
) => {
  const response = await api.put(`/expenses/${id}`, expense);
  return response.data.data;
};

export const deleteExpense = async (id: string) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data.data;
};