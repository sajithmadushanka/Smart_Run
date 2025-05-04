import CustomTabBar from "@/components/CustomTabBar";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
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
