// services/api/profile.ts

import { apiClient } from "@/lib/api-client";

export interface UserProfileData {
  user_id: string;
  name: string;
  phoneNumber: string;
  email: string;
  keahlian: string;
  isVerified: boolean;
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  data: UserProfileData;
}

export interface UpdateProfilePayload {
  Name: string;
  PhoneNumber: string;
  Email: string;
  Keahlian: string;
}

export interface UpdateProfileResponse {
  status: boolean;
  message: string;
  data?: any;
}

export const profileService = {
  getProfile: async (): Promise<ProfileResponse> => {
    return apiClient.get<ProfileResponse>("/auth/me");
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<UpdateProfileResponse> => {
    return apiClient.put<UpdateProfileResponse>("/auth/update-profile", payload);
  },
};
