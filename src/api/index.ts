import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

// Create Axios instance
export const API: AxiosInstance = axios.create({
  baseURL: "http://localhost:6600/api/v1",
  timeout: 5000, // Adjust timeout as needed
});

export const parentLogin = (data: any) => API.post("/parents/auth/login", data);

export const parentRegister = (data: any) =>
  API.post("/parents/auth/register", data);

export const providerLogin = (data: any) =>
  API.post("/activity-providers/auth/login", data);

export const providerRegister = (data: any) =>
  API.post("/activity-providers/auth/register", data);

export const adminLogin = (data: any) => API.post("/admins/auth/login", data);

export const me = () => API.get("/parents/me");

export const myChildren = () => API.get("/parents/children");

export const updateProfile = (data: any) => API.patch("/parents/me", data);

export const updateChildren = (data: any) =>
  API.post("/parents/children", data);

export const getAllRequest = () => API.get("/activity-providers/requests");

export const getAllProviders = () => API.get("/activity-providers");

export const getAllActivities = () => API.get("/activities");

export const getAllParents = () => API.get("/parents");

export const getAllOrders = () => API.get("/orders");

export const createOrders = (data: any) => API.post("/orders", data);

export const createActivity = (data: any) => API.post("/activities", data);

export const getAllActivity = (id: number) =>
  API.get(`/activities?activityProviderId=${id}`);

export const updateProvider = (id: number, data: any) =>
  API.post(`/activity-providers/status/${id}`, data);

// Add a request interceptor
API.interceptors.request.use(
  (config: any) => {
    // Check if token is available
    const token = localStorage.getItem("token");
    if (token) {
      // If token is available, add it to the request headers
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
