import { getToken } from "./authStorage"

const API_URL = "https://15ae5d67a455.ngrok-free.app/api"

export async function uploadProduct({
  name,
  price,
  image,
  signal,
}: {
  name: string;
  price: number;
  image: any;
  signal?: AbortSignal
}) {
  const token = await getToken()
  const form = new FormData()

  form.append("name", name)
  form.append("price", String(price))

  if (image) {
    form.append("thumbnail", {
      uri: image.uri,
      name: "thumb.jpg",
      type: "image/jpeg",
    } as any)
  }

  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    body: form,
    signal,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json()
}

export async function fetchUserProducts(userId: string) {
  const token = await getToken()
  const res = await fetch(`${API_URL}/products/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Fetch failed")
  return res.json()
}