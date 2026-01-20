import * as SecureStore from "expo-secure-store"

const TOKEN = "auth_token"

export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN, token)
}

export async function getToken() {
  return await SecureStore.getItemAsync(TOKEN)
}

export async function removeToken() {
  await SecureStore.deleteItemAsync(TOKEN)
}