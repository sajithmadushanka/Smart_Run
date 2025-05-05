import { UserProvider } from "@/context/UserContext";
import { initDb } from "@/services/db";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";
import { StatusBar, useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Urbanist: require("../assets/fonts/Urbanist/static/Urbanist-Regular.ttf"),
    "Urbanist-Bold": require("../assets/fonts/Urbanist/static/Urbanist-Bold.ttf"),
  });

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await initDb();
        console.log("Database initialized successfully");
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initializeDatabase();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#0d1117" : "#ffffff"}
      />
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UserProvider>
    </>
  );
}
