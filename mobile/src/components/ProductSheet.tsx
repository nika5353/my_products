import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
} from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import { spacing } from "../constants/spacing"
import { useEffect } from "react"

type Product = { _id: string; name: string; price: number; thumbnail?: string }

type Props = {
  products: Product[]
  loading: boolean
  visible: boolean
  onClose: () => void
}

const SHEET_HEIGHT = Math.min(Dimensions.get("window").height * 0.75, 520)
const API_ORIGIN = process.env.API_UPLOAD_URL || ""

export default function ProductSheet({ products, loading, visible, onClose }: Props) {
  const translateY = useSharedValue(SHEET_HEIGHT)

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

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.sheet, style]}>
        <View style={styles.handle} />
        <Text style={styles.title}>Products</Text>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const imageUri = item.thumbnail
                ? item.thumbnail.startsWith("http")
                  ? item.thumbnail
                  : `${API_ORIGIN}/${item.thumbnail}`
                : null

              return (
                <View style={styles.card}>
                  {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.thumb} resizeMode="cover" />
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
            }}
            ListEmptyComponent={<Text style={styles.empty}>No products</Text>}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
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
})