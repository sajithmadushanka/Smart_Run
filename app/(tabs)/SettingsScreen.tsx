import { useUser } from "@/context/UserContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { logout } = useUser();
  const handleLogout = () => {
    logout(); // clear user data from context api
    // navigate to login screen
    router.push("/Auth/LoginScreen");
  };

  const SettingItem = ({
    icon,
    title,
    rightComponent,
    onPress,
  }: {
    icon: React.ReactNode;
    title: string;
    rightComponent?: React.ReactNode;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex-row items-center justify-between shadow-sm mb-4"
    >
      <View className="flex-row items-center space-x-3">
        {icon}
        <Text className="text-base font-semibold text-light-text dark:text-dark-text font-['Urbanist-Bold']">
          {title}
        </Text>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      className="flex-1 bg-light-background dark:bg-dark-background px-5 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <Animated.Text
        entering={FadeIn.duration(400)}
        className="text-3xl font-bold text-light-text dark:text-dark-text font-['Urbanist-Bold'] mb-6"
      >
        Settings ⚙️
      </Animated.Text>

      <Animated.View
        entering={SlideInDown.duration(500)}
        className="space-y-4 mb-10"
      >
        {/* Theme Toggle */}
        <SettingItem
          icon={<Ionicons name="moon" size={24} color="#10b981" />}
          title="Dark Mode"
          rightComponent={
            <Switch
              value={colorScheme === "dark"}
              onValueChange={toggleColorScheme}
              trackColor={{ false: "#d1d5db", true: "#10b981" }}
              thumbColor={colorScheme === "dark" ? "#065f46" : "#fefefe"}
            />
          }
        />

        {/* Notifications */}
        <SettingItem
          icon={<Ionicons name="notifications" size={24} color="#10b981" />}
          title="Notifications"
          rightComponent={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#d1d5db", true: "#10b981" }}
              thumbColor={notificationsEnabled ? "#065f46" : "#fefefe"}
            />
          }
        />

        {/* Privacy & Security */}
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="shield-lock"
              size={24}
              color="#10b981"
            />
          }
          title="Privacy & Security"
          onPress={() => {}}
        />

        {/* Help & Support */}
        <SettingItem
          icon={<Ionicons name="help-circle" size={24} color="#10b981" />}
          title="Help & Support"
          onPress={() => {}}
        />

        {/* About */}
        <SettingItem
          icon={
            <Ionicons name="information-circle" size={24} color="#10b981" />
          }
          title="About RunMate"
          onPress={() => {}}
        />

        {/* Logout */}
        <TouchableOpacity
          className="bg-red-100 dark:bg-red-800 px-6 py-4 rounded-2xl flex-row items-center justify-center space-x-2 shadow-sm mt-4"
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out"
            size={20}
            color={colorScheme === "dark" ? "#fecaca" : "#b91c1c"}
          />
          <Text className="text-base font-semibold text-red-700 dark:text-red-100 font-['Urbanist-Bold']">
            Logout
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}
