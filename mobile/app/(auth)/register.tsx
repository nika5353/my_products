import { View, Text, StyleSheet, Alert } from "react-native"
import Input from "../../src/components/Input"
import ActionButton from "../../src/components/Button"
import { spacing } from "../../src/constants/spacing"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../../src/validators/auth"
import { postRequest } from "../../src/services/api"
import { router } from "expo-router"

type FormData = {
  username: string
  email: string
  phone: string
  password: string
}

export default function Register() {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: { username: "", email: "", phone: "", password: "" },
  })

  const onSubmit = async (data: FormData) => {
    try {
      clearErrors("email")
      await postRequest("/auth/register", data)
      Alert.alert("Success", "Registration successful. Now Log in.")
      router.push("/(auth)/login")
    } catch (e: any) {
      setError("email", { type: "server", message: e?.message || "Registration failed" })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <>
            <Input placeholder="Username" value={field.value} onChangeText={field.onChange} />
            {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <>
            <Input placeholder="Email" value={field.value} onChangeText={field.onChange} />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <>
            <Input placeholder="Phone" value={field.value} onChangeText={field.onChange} />
            {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <>
            <Input placeholder="Password" secureTextEntry value={field.value} onChangeText={field.onChange} />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          </>
        )}
      />

      <ActionButton title="Confirm" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: spacing.lg },
  error: {
    color: "#EF4444",
    marginTop: -spacing.sm,
    marginBottom: spacing.md,
    fontSize: 12,
  },
})