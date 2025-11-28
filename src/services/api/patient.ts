// services/api/auth.ts

import { apiClient } from "@/lib/api-client";
export interface Patient {
  pasienid: string;
  userid: string;
  nama: string;
  gender: "Male" | "Female";
  phoneNumber: string;
  status: boolean;
  response: string;
}

export interface AddPatientPayload {
  Name: string;
  Gender: string;
  PhoneNumber: string;
}

export interface AddPatientResponse {
  message: string;
  data: any;
}

export interface GetPatientResponse {
  message: string;
  status: boolean;
  data: Patient[];
}
export interface UpdatePatientPayload {
  pasienid: string;
  Name: string;
  Gender: "Male" | "Female";
  PhoneNumber: string;
}

export interface DeletePatientResponse {
  status: boolean;
  message: string;
  data: null;
}

export const patientService = {
  addPatient: async (payload: AddPatientPayload): Promise<AddPatientResponse> => {
    return apiClient.post<AddPatientResponse>("/patient/save", payload);
  },
  getPatients: async (): Promise<GetPatientResponse> => {
    return apiClient.get("/patient/get-all-patient-by-userid");
  },
  updatePatient: async (payload: UpdatePatientPayload): Promise<AddPatientResponse> => {
    return apiClient.put<AddPatientResponse>("/patient/update", payload);
  },

  deletePatient: async (pasienid: string): Promise<DeletePatientResponse> => {
    return apiClient.delete<DeletePatientResponse>(`/patient/delete/${pasienid}`);
  },
};
