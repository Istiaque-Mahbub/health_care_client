import config from "@/config";
import { getCookie } from "@/services/auth/tokenHandelers";


const BACKEND_API_URL = config.baseApiUrl || "http://localhost:5000/api/v1";

const serverFetchHelper = async (
  endPoint: string,
  options: RequestInit,
): Promise<Response> => {
  const { headers, ...restOptions } = options;

  const accessToken = await getCookie("accessToken");

  const response = await fetch(`${BACKEND_API_URL}${endPoint}`, {
    ...restOptions,
    headers: {
      ...headers,
      // ...(accessToken ? { Authorization: accessToken } : {}),
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
  });

  return response;
};

export const serverFetch = {
  get: async (endPoint: string, options: Omit<RequestInit, "method"> = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "GET" }),

  post: async (endPoint: string, options: Omit<RequestInit, "method"> = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "POST" }),

  put: async (endPoint: string, options: Omit<RequestInit, "method"> = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "PUT" }),

  patch: async (endPoint: string, options: Omit<RequestInit, "method"> = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "PATCH" }),

  delete: async (endPoint: string, options: Omit<RequestInit, "method"> = {}) =>
    serverFetchHelper(endPoint, { ...options, method: "DELETE" }),
};
