export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}
