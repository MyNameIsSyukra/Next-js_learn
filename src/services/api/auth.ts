// services/api/auth.ts

import { apiClient } from "@/lib/api-client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
  message?: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", payload);
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/register", payload);
  },

  logout: async (): Promise<void> => {
    return apiClient.post("/auth/logout");
  },

  getProfile: async (): Promise<AuthResponse["user"]> => {
    return apiClient.get("/auth/me");
  },
};
