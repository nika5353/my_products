import { Redirect } from "expo-router";
import { useAuth } from "../src/hooks/useAuth";

export default function Index() {
  const { loading, authenticated } = useAuth()
  if (loading) return
  return <Redirect href={authenticated ? "/(tabs)/home" : "/(auth)/welcome"} />
}
