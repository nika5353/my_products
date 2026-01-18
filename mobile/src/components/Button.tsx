import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { colors } from "../constants/colors"
import { spacing } from "../constants/spacing"

type Props = {
  title: string
  onPress: () => void
  disabled?: boolean
}

export default function ActionButton({ title, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btn, disabled && styles.btnDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 16,
  }
})