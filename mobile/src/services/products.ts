import { api } from "../interceptor/http";

export async function uploadProduct({
  name,
  price,
  image,
  signal,
}: {
  name: string;
  price: number;
  image: any;
  signal?: AbortSignal;
}) {
  try {
    const form = new FormData();

    form.append("name", name);
    form.append("price", String(price));

    if (image) {
      form.append("thumbnail", {
        uri: image.uri,
        name: "thumb.jpg",
        type: "image/jpeg",
      } as any);
    }

    const { data } = await api.post("/products", form, {
      headers: { "Content-Type": "multipart/form-data" },
      signal,
    });

    return data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Upload failed");
  }
}

export async function fetchUserProducts(userId: string) {
  try {
    const { data } = await api.get(`/products/${userId}`);
    return data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Fetch failed");
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { data } = await api.delete(`/products/${productId}`);
    return data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Delete failed");
  }
}