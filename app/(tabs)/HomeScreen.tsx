import { RoutePaths } from "@/constants/routes";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

export default function HomeScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  interface Feature {
    icon: React.ReactNode;
    title: string;
    desc: string;
    navigate: RoutePaths;
  }
  const features : Feature[]= [
    {
      icon: <MaterialCommunityIcons name="run" size={28} color="#10b981" />,
      title: "Start Run",
      desc: "Track your route and stats in real time.",
      navigate: "/Run/StartRunScreen",
    },
    {
      icon: <Ionicons name="map" size={28} color="#10b981" />,
      title: "Route Map",
      desc: "View and explore your running routes.",
      navigate: "/Run/RouteMapScreen",
    },
    {
      icon: <MaterialCommunityIcons name="history" size={28} color="#10b981" />,
      title: "Run History",
      desc: "Check your past runs and progress.",
      navigate: "RunHistoryScreen",
    },
    {
      icon: <Ionicons name="settings" size={28} color="#10b981" />,
      title: "Settings",
      desc: "Customize your running preferences.",
      navigate: "SettingsScreen",
    },
  ];

  return (
    <ScrollView
      className="flex-1 bg-light-background dark:bg-dark-background px-5 pt-14"
      showsVerticalScrollIndicator={false}
    >
      <Animated.Text
        entering={FadeIn.duration(400)}
        className="text-3xl font-bold text-light-text dark:text-dark-text font-['Urbanist-Bold'] mb-4"
      >
        Welcome to RunMate 🏃‍♂️
      </Animated.Text>

      <Animated.Text
        entering={SlideInDown.delay(200).duration(500)}
        className="text-base text-gray-600 dark:text-gray-300 mb-6 font-['Urbanist']"
      >
        Track your routes, stay fit, and crush your running goals.
      </Animated.Text>

      <Animated.Image
        entering={FadeIn.delay(200).duration(500)}
        source={require("../../assets/illustrations/home-illustration.jpg")}
        className="w-full h-60 rounded-3xl mb-6"
        resizeMode="cover"
      />

      <View className="space-y-5 mb-10">
        {features.map((item, idx) => (
          <Animated.View
            entering={SlideInDown.delay(idx * 100).duration(500)}
            key={idx}
            className="mb-2"
          >
            <TouchableOpacity
              className="flex-row items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md"
              onPress={() => router.push(item.navigate as any)}
            >
              <View className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full justify-center items-center mr-4">
                {item.icon}
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-light-text dark:text-dark-text font-['Urbanist-Bold']">
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-300 font-['Urbanist']">
                  {item.desc}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}
