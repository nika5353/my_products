import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import ActionButton from "../../src/components/Button"
import { spacing } from "../../src/constants/spacing"
import { removeToken } from "../../src/cache/authStorage"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { fetchMe } from "../../src/services/users"

type User = { username: string; email: string }

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const logout = async () => {
    await removeToken();
    router.replace("/(auth)/login");
  }

  useEffect(() => {
    fetchMe()
      .then((data) => setUser({ username: data.username, email: data.email }))
      .finally(() => setLoading(false));
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>Username: {user?.username ?? "-"}</Text>
          <Text>Email: {user?.email ?? "-"}</Text>
        </>
      )}

      <View style={{ marginTop: spacing.lg }}>
        <ActionButton title="Logout" onPress={logout} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: spacing.md },
})