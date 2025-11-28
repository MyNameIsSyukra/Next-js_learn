// hooks/use-auth.ts

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService, LoginPayload, RegisterPayload } from "@/services/api/auth";
import { ApiError } from "@/lib/api-client";

interface UseAuthReturn {
  loading: boolean;
  error: string;
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async (payload: LoginPayload): Promise<boolean> => {
    setLoading(true);
    setError("");

    try {
      const data = await authService.login(payload);

      if (data.data.access_token) {
        localStorage.setItem("token", data.data.access_token);
        localStorage.setItem("user", JSON.stringify(data.data));
      }

      router.push("/dashboard"); // Redirect setelah login
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    setLoading(true);
    setError("");

    // Validasi password match
    if (payload.password !== payload.password_confirmation) {
      setError("Passwords do not match");
      setLoading(false);
      return false;
    }

    try {
      await authService.register(payload);
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth");
  };

  const clearError = () => setError("");

  return {
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };
}
