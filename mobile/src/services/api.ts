import { api } from "../interceptor/http";

export async function postRequest(path: string, body: any) {
  try {
    const { data } = await api.post(path, body);
    return data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Request failed";
    throw new Error(message);
  }
}