import { TextInput, StyleSheet } from "react-native"
import { colors } from "../constants/colors"
import { spacing } from "../constants/spacing"

export default function Input(props: any) {
  return <TextInput style={styles.input} {...props} />
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: spacing.md,
  },
})