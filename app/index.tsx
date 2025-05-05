import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // Redirect to your splash screen
    router.replace("/SplashScreen");
  }, []);

  return null;
}
