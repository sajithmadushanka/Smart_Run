import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen
            name="HomeScreen"
            options={{
            title: "Home",
            headerShown: false,
            }}
        />
        <Tabs.Screen
            name="HistoryScreen"
            options={{
            title: "History",
            // tabBarIcon: "history",
            headerShown: false,
            }}
        />
        <Tabs.Screen
            name="ProfileScreen"
            options={{
            title: "Profile",
            // tabBarIcon: "user",
            headerShown: false,
            }}
        />
        <Tabs.Screen
            name="SettingsScreen"
            options={{
            title: "Settings",
            // tabBarIcon: "settings",
            headerShown: false,
            }}
        />
    </Tabs>
  );
};

export default _layout;
