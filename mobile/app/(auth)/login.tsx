import { View, Text, StyleSheet, Alert } from "react-native"
import Input from "../../src/components/Input"
import ActionButton from "../../src/components/Button"
import { spacing } from "../../src/constants/spacing"
import { saveToken } from "../../src/cache/authStorage"
import { postRequest } from "../../src/services/api"
import { router } from "expo-router"
import { useState } from "react"

export default function Login() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const isDisabled = !login.trim() || !password.trim()

  const handleLogin = async () => {
    if (isDisabled) return

    try {
      const data = await postRequest("/auth/login", {
        login,
        password,
      })

      await saveToken(data.token)
      router.replace("/(tabs)/home")
    } catch (e) {
      const message = e instanceof Error ? e.message : "Login failed"
      Alert.alert("Login failed", message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Input placeholder="Username or Email" value={login} onChangeText={setLogin} />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <ActionButton title="Confirm" onPress={handleLogin} disabled={isDisabled} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: spacing.lg,
  },
})