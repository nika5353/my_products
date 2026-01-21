import axios from "axios";
import { getToken } from "../cache/authStorage";

export const api = axios.create({
  baseURL: "https://c9678aecfc7b.ngrok-free.app/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers?.set("Authorization", `Bearer ${token}`);
  }
  return config;
});