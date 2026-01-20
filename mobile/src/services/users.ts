import { api } from "../interceptor/http";

export async function fetchUsers() {
  try {
    const { data } = await api.get("/users");
    return data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Fetch failed");
  }
}

export async function fetchMe() {
  try {
    const { data } = await api.get("/users/me");
    return data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Fetch failed");
  }
}