import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from "react-native"
import Input from "../src/components/Input"
import ActionButton from "../src/components/Button"
import { spacing } from "../src/constants/spacing"
import * as ImagePicker from "expo-image-picker"
import { useEffect, useRef, useState } from "react"
import { uploadProduct } from "../src/services/products"

export default function AddProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    };
  }, []);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
    });
    if (!res.canceled) setImage(res.assets[0])
  };

  const isSaveDisabled = loading || !name.trim() || !price.trim() || !image

  const save = async () => {
    if (isSaveDisabled) return

    const controller = new AbortController()
    abortRef.current = controller

    try {
      setLoading(true);
      await uploadProduct({ name, price: Number(price), image, signal: controller.signal })
      Alert.alert("Saved");
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        const message = e instanceof Error ? e.message : "Upload failed"
        Alert.alert("Upload failed", message)
      }
    } finally {
      setLoading(false)
      abortRef.current = null
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input placeholder="Price" keyboardType="numeric" value={price} onChangeText={setPrice} />

      <ActionButton title="Upload Thumbnail" onPress={pickImage} disabled={loading} />
      {image && <Image source={{ uri: image.uri }} style={styles.preview} />}

      <View style={{ marginTop: spacing.md }}>
        <ActionButton
          title={loading ? "Saving..." : "Save Product"}
          onPress={save}
          disabled={isSaveDisabled}
        />
        {loading && <ActivityIndicator style={{ marginTop: spacing.sm }} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: spacing.lg, textAlign: "center" },
  preview: { width: "100%", height: 200, marginTop: spacing.md, borderRadius: 12 },
})