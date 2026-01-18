import { View, Text, StyleSheet } from "react-native"
import Input from "../../src/components/Input"
import ActionButton from "../../src/components/Button"
import { spacing } from "../../src/constants/spacing"
import { postRequest } from "../../src/services/api"
import { router } from "expo-router"
import { useState } from "react"

export default function Verify() {
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    await postRequest("/auth/verify", { code })
    router.replace("/(auth)/login")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Enter 6-digit code</Text>
      <Input placeholder="123456" keyboardType="numeric" maxLength={6} value={code} onChangeText={setCode} />
      <ActionButton title="Verify" onPress={handleVerify} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: spacing.sm },
  subtitle: { marginBottom: spacing.lg, color: "#6B7280" },
})