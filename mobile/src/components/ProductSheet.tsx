import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import { spacing } from "../constants/spacing"
import { useEffect, useMemo } from "react"
import { Ionicons } from "@expo/vector-icons"

type Product = { _id: string; name: string; price: number; thumbnail?: string }
type ProductWithImage = Product & { imageUri: string | null }

type Props = {
  products: Product[]
  loading: boolean
  visible: boolean
  onClose: () => void
  canDelete?: boolean
  onDelete?: (productId: string) => void
}

const SHEET_HEIGHT = Math.min(Dimensions.get("window").height * 0.75, 520) // max 75% of screen or 520px
const API_ORIGIN = "https://9261141a49dc.ngrok-free.app/uploads"

export default function ProductSheet({
  products,
  loading,
  visible,
  onClose,
  canDelete,
  onDelete,
}: Props) {
  const translateY = useSharedValue(SHEET_HEIGHT)

  const productsWithImages = useMemo<ProductWithImage[]>(() => {
    return products.map((item) => {
      const imageUri = item.thumbnail
        ? item.thumbnail.startsWith("http")
          ? item.thumbnail
          : `${API_ORIGIN}/${item.thumbnail}`
        : null

      return { ...item, imageUri }
    })
  }, [products])

  useEffect(() => {
    productsWithImages.forEach((item) => {
      if (item.imageUri?.startsWith("http")) {
        Image.prefetch(item.imageUri).catch(() => {})
      }
    })
  }, [productsWithImages])

  useEffect(() => {
    translateY.value = withSpring(visible ? 0 : SHEET_HEIGHT)
  }, [visible, translateY])

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY
      }
    })
    .onEnd((event) => {
      if (event.translationY > 120) {
        translateY.value = withSpring(SHEET_HEIGHT)
        onClose()
      } else {
        translateY.value = withSpring(0)
      }
    })
    .runOnJS(true)

  if (!visible) return null

  const canSwipeDelete = Boolean(canDelete && onDelete)

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.sheet, style]}>
        <View style={styles.handle} />
        <Text style={styles.title}>Products</Text>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={productsWithImages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const card = (
                <View style={styles.card}>
                  {item.imageUri ? (
                    <Image
                      source={{ uri: item.imageUri, cache: "force-cache" }}
                      style={styles.thumb}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.thumbPlaceholder} />
                  )}

                  <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.price}>{item.price} ₾</Text>
                  </View>
                </View>
              )

              if (!canSwipeDelete) return card

              return (
                <ReanimatedSwipeable
                  overshootRight={false}
                  renderRightActions={() => (
                    <TouchableOpacity
                      style={styles.deleteAction}
                      onPress={() => onDelete?.(item._id)}
                    >
                      <Ionicons name="trash" size={18} color="#fff" />
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  )}
                >
                  {card}
                </ReanimatedSwipeable>
              )
            }}
            ListEmptyComponent={<Text style={styles.empty}>No products</Text>}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
            initialNumToRender={6}
            maxToRenderPerBatch={8}
            windowSize={5}
            removeClippedSubviews
            updateCellsBatchingPeriod={50}
          />
        )}
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    height: SHEET_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: spacing.lg,
  },
  handle: {
    alignSelf: "center",
    width: 48,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 14,
    backgroundColor: "#F9FAFB",
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: spacing.md,
    backgroundColor: "#E5E7EB",
  },
  thumbPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: spacing.md,
    backgroundColor: "#E5E7EB",
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 4,
  },
  price: {
    color: "#111827",
    fontWeight: "700",
  },
  empty: {
    color: "#6B7280",
  },
  deleteAction: {
    backgroundColor: "#EF4444",
    borderRadius: 14,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
  },
})