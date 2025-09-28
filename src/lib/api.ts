import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:4002";

export const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
})