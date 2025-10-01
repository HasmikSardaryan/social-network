import axios from "axios";
import type { IUser, IResponse, AuthUser } from "../types";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:4002";

export const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

// Authentication API functions
export const authAPI = {
  login: async (credentials: AuthUser): Promise<IResponse> => {
    const response = await Axios.post('/login', credentials);
    return response.data;
  },
  
  logout: async (): Promise<IResponse> => {
    const response = await Axios.post('/logout');
    return response.data;
  },
  
  verify: async (): Promise<{ status: string; message?: string; payload?: IUser }> => {
    const response = await Axios.get('/verify');
    return response.data;
  }
}