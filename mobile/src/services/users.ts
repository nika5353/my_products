import { getToken } from "./authStorage"

const API_URL = "https://15ae5d67a455.ngrok-free.app/api"

export async function fetchUsers() {
  const token = await getToken()
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Fetch failed")
  return res.json()
}

export async function fetchMe() {
  const token = await getToken()
  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Fetch failed")
  return res.json()
}