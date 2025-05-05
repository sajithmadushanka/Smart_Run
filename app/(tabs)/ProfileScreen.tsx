import { useUser } from "@/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";

export default function ProfileScreen() {
  const { colorScheme } = useColorScheme();
  const { logout } = useUser();

  const { user } = useUser();
  const username = user?.username || "Guest";
  const stats = [
    { label: "Total Runs", value: "18" },
    { label: "Distance", value: "74.2 km" },
    { label: "Avg Pace", value: "5:24 /km" },
  ];

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background px-6 pt-14">
      {/* Title */}
      <Animated.Text
        entering={FadeInDown.duration(400)}
        className="text-3xl font-bold text-light-text dark:text-dark-text font-['Urbanist-Bold'] mb-6"
      >
        Profile
      </Animated.Text>

      {/* Avatar & Username */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        className="items-center mb-10"
      >
        <View className="w-28 h-28 rounded-full bg-green-100 dark:bg-green-800 justify-center items-center mb-4 shadow-md">
          <Text className="text-4xl text-green-600 dark:text-green-200 font-bold">
            {username.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="text-xl font-semibold text-light-text dark:text-dark-text font-['Urbanist-Bold']">
          @{username}
        </Text>
      </Animated.View>

      {/* Stats */}
      <Animated.View
        entering={SlideInDown.delay(300).duration(500)}
        className="flex-row justify-between bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mb-10"
      >
        {stats.map((item, index) => (
          <View key={index} className="items-center">
            <Text className="text-xl font-bold text-green-600 dark:text-green-300 font-['Urbanist-Bold']">
              {item.value}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-300 font-['Urbanist']">
              {item.label}
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View
        entering={SlideInDown.delay(400).duration(500)}
        className="space-y-4"
      >
        {/* Edit Profile Button */}
        <TouchableOpacity
          className="bg-green-100 dark:bg-green-800 px-6 py-4 rounded-2xl flex-row items-center justify-center space-x-2 shadow-sm mb-2"
          activeOpacity={0.8}
        >
          <Ionicons
            name="pencil"
            size={20}
            color={colorScheme === "dark" ? "#a7f3d0" : "#047857"}
          />
          <Text className="text-base font-semibold text-green-700 dark:text-green-100 font-['Urbanist-Bold']">
            Edit Profile
          </Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-100 dark:bg-red-800 px-6 py-4 rounded-2xl flex-row items-center justify-center space-x-2 shadow-sm"
          activeOpacity={0.8}
          onPress={() => {
            logout(); // call logout function from context

            // navigate to login screen
            router.push("/Auth/LoginScreen");
          }}
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
    </View>
  );
}
