// lib/api-client.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api";

class ApiError extends Error {
  constructor(public status: number, public message: string, public errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
  }
}

// Token expiration handler
const handleTokenExpiration = () => {
  // Clear all auth data
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Dispatch custom event for toast notification
    const event = new CustomEvent("auth:expired");
    window.dispatchEvent(event);

    // Redirect to auth page after short delay
    setTimeout(() => {
      window.location.href = "/?session=expired";
    }, 500);
  }
};

// Check if error is token expiration
const isTokenExpired = (status: number, message?: string): boolean => {
  // Check for common token expiration status codes
  if (status === 401) {
    return true;
  }

  // Check for specific error messages from backend
  if (message) {
    const msg = message.toLowerCase();
    return (
      msg.includes("token expired") ||
      msg.includes("token invalid") ||
      msg.includes("unauthorized") ||
      msg.includes("jwt expired") ||
      msg.includes("session expired") ||
      msg.includes("token has expired") ||
      msg.includes("authentication failed")
    );
  }

  return false;
};

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    // Check if token is expired
    if (isTokenExpired(response.status, data.message)) {
      handleTokenExpiration();
      throw new ApiError(response.status, "Session expired. Please login again.", data.errors);
    }

    throw new ApiError(response.status, data.message || "Something went wrong", data.errors);
  }

  return data;
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse<T>(response);
  },

  post: async <T>(endpoint: string, body?: unknown): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  put: async <T>(endpoint: string, body?: unknown): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse<T>(response);
  },
};

export { ApiError };
