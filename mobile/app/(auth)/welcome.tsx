import { View, Text, StyleSheet } from "react-native"
import ActionButton from "../../src/components/Button"
import { colors } from "../../src/constants/colors"
import { spacing } from "../../src/constants/spacing"
import { router } from "expo-router"

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProductsApp</Text>
      <Text style={styles.subtitle}>
        გაყიდე და ნახე რეალური პროდუქტები მარტივად.
      </Text>

      <View style={styles.actions}>
        <ActionButton title="Register" onPress={() => router.push("/(auth)/register")} />
        <ActionButton title="Login" onPress={() => router.push("/(auth)/login")} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: colors.muted,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  actions: {
    gap: spacing.md,
  },
})