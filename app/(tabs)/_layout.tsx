import CustomTabBar from "@/components/CustomTabBar";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const _layout = () => {
  return (
    <Tabs
      tabBar={(props) => (
        <SafeAreaProvider>
          <CustomTabBar {...props} />
        </SafeAreaProvider>
      )}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="HistoryScreen"
        options={{ title: "History", headerShown: false }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{ title: "Profile", headerShown: false }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        options={{ title: "Settings", headerShown: false }}
      />
    </Tabs>
  );
};

export default _layout;
