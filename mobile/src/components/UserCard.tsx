import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { spacing } from "../constants/spacing"

type Props = {
  username: string
  phone: string
  onPress: () => void
};

export default function UserCard({ username, phone, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.name}>{username}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: spacing.sm,
  },
  name: {
    fontWeight: "600",
  },
  phone: {
    color: "#6B7280",
  },
})