// app/_layout.tsx
import { initDb } from "@/services/db";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Urbanist: require("../assets/fonts/Urbanist/static/Urbanist-Regular.ttf"),
    "Urbanist-Bold": require("../assets/fonts/Urbanist/static/Urbanist-Bold.ttf"),
  });
  useEffect(() => {
    initDb().catch((err) => console.error("DB Init Error", err));
  }, []);

  if (!fontsLoaded) return null; // or show a fallback screen

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="SplashScreen" /> */}
      {/* <Stack.Screen name="HomeScreen" />
      <Stack.Screen name="Auth/LoginScreen" />
      <Stack.Screen name="Auth/RegisterScreen" /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
