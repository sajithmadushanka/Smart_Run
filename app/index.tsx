import { initDb } from "@/services/db";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100); // Minimal delay

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return null;

  return <Redirect href="/HomeScreen" />;
}
