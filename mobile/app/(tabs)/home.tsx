import { View, FlatList, StyleSheet, TouchableOpacity, Text, BackHandler, Alert } from "react-native"
import UserCard from "../../src/components/UserCard"
import ProductSheet from "../../src/components/ProductSheet"
import { spacing } from "../../src/constants/spacing"
import { router, useFocusEffect } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { fetchUsers, fetchMe } from "../../src/services/users"
import { fetchUserProducts, deleteProduct } from "../../src/services/products"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  const [showSheet, setShowSheet] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers().then(setUsers).catch(() => {})
    fetchMe().then((user) => setCurrentUserId(user?._id ?? null)).catch(() => {})
  }, [])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (router.canGoBack()) {
          router.replace("/(tabs)/home")
          return true
        }
        return false
      }

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress)
      return () => subscription.remove()
    }, [])
  )

  const openUserProducts = async (userId: string) => {
    try {
      setSelectedUserId(userId)
      setLoadingProducts(true)
      setShowSheet(true)
      const data = await fetchUserProducts(userId)
      setProducts(data)
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    const previous = products
    setProducts((prev) => prev.filter((item) => item._id !== productId))

    try {
      await deleteProduct(productId)
    } catch (err: any) {
      setProducts(previous)
      const message = err instanceof Error ? err.message : "Delete failed"
      Alert.alert("Delete failed", message)
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
        canDelete={Boolean(selectedUserId && currentUserId && selectedUserId === currentUserId)}
        onDelete={handleDeleteProduct}
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