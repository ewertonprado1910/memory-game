import { Stack } from "expo-router"
import "react-native-reanimated"

export default function Layout() {

  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="(public)" />
      <Stack.Screen name="(private)" />
      <Stack.Screen name="index" />
    </Stack>
  )
}
