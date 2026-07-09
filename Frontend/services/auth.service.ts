import api from "@/lib/api";
import { LoginPayload, LoginResponse } from "@/types/auth";

export const login = async (
  credentials: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};