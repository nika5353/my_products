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

  const handleLogin = async () => {
    try {
      const data = await postRequest("/auth/login", {
        login,
        password,
      })

      await saveToken(data.token)
      router.replace("/(tabs)/home")
    } catch (e) {
      Alert.alert("Login failed")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Input placeholder="Username or Email" value={login} onChangeText={setLogin} />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <ActionButton title="Confirm" onPress={handleLogin} />
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