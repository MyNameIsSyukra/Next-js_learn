// services/api/auth.ts

import { apiClient } from "@/lib/api-client";

export interface LoginPayload {
  email: string;
  password: string;
}
export interface UserProfile {
  userid: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
}

export interface UserProfileResponse {
  status: boolean;
  message: string;
  data: UserProfile;
}

export interface RegisterPayload {
  Name: string;
  PhoneNumber: string;
  Email: string;
  Password: string;
  Keahlian: string;
}

export interface AuthResponse {
  data: {
    access_token: string;
    nama: string;
  };
  message?: string;
}
export interface GetQrResponse {
  data: string;
  status: boolean;
  message: string;
}

export interface PairingCodeResponse {
  status: boolean;
  message: string;
  data: string; // Pairing code
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
  getqr: async (): Promise<GetQrResponse> => {
    return apiClient.post("/auth/getQR");
  },
  getUserProfile: async (): Promise<UserProfileResponse> => {
    return apiClient.get<UserProfileResponse>("/auth/me");
  },

  getPairingCode: async (): Promise<PairingCodeResponse> => {
    return apiClient.get<PairingCodeResponse>("/auth/getPair");
  },
  // getProfile: async (): Promise<AuthResponse["user"]> => {
  //   return apiClient.get("/auth/me");
  // },
};
