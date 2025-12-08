// services/api/auth.ts

import { apiClient } from "@/lib/api-client";
export interface Patient {
  pasienid: string;
  userid: string;
  nama: string;
  gender: "Male" | "Female";
  phoneNumber: string;
  discharge_date: string;
  status: boolean;
  response: string;
}

export interface AddPatientPayload {
  name: string;
  gender: string;
  phoneNumber: string;
  discharge_date: string;
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
  name: string;
  gender: "Male" | "Female";
  phoneNumber: string;
  dischargeDate: string;
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
    console.log(payload);
    return apiClient.put<AddPatientResponse>("/patient/update-patient", payload);
  },

  deletePatient: async (pasienid: string): Promise<DeletePatientResponse> => {
    return apiClient.delete<DeletePatientResponse>(`/patient/delete-patient?PasienID=${pasienid}`);
  },
};
