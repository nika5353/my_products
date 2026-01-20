import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native"
import UserCard from "../../src/components/UserCard"
import ProductSheet from "../../src/components/ProductSheet"
import { spacing } from "../../src/constants/spacing"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { fetchUsers } from "../../src/services/users"
import { fetchUserProducts } from "../../src/services/products"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  const [showSheet, setShowSheet] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)

  useEffect(() => {
    fetchUsers().then(setUsers).catch(() => {})
  }, [])

  const openUserProducts = async (userId: string) => {
    try {
      setLoadingProducts(true)
      setShowSheet(true)
      const data = await fetchUserProducts(userId)
      setProducts(data)
    } finally {
      setLoadingProducts(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <TouchableOpacity onPress={() => router.push("/addProduct")}>
          <Ionicons name="add" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <UserCard
            username={item.username}
            phone={item.phone}
            onPress={() => openUserProducts(item._id)}
          />
        )}
      />

      <ProductSheet
        visible={showSheet}
        onClose={() => setShowSheet(false)}
        products={products}
        loading={loadingProducts}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: spacing.lg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  title: { fontSize: 20, fontWeight: "700" },
  plus: { fontSize: 28, fontWeight: "700" },
})