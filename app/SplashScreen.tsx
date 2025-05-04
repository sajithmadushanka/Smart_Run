import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function SplashScreen() {
  const router = useRouter();
  const isLoggedIn = false;
  const animationRef = useRef<LottieView>(null);

  return (
    <View className="flex-1 items-center justify-center bg-light-background dark:bg-dark-background">
      <LottieView
        ref={animationRef}
        source={require("../assets/animations/splash.json")}
        autoPlay
        loop
        style={{ width: 250, height: 250 }}
      />

      <Text className="text-2xl font-bold text-light-text dark:text-dark-text mt-6">
        Smart Run
      </Text>

      {/* Animated Run Button */}
      <Animated.View
        entering={FadeInDown.delay(1000).duration(600)}
        className="mt-10"
      >
        <TouchableOpacity
          className="bg-green-500 px-6 py-3 rounded-full shadow-lg"
          onPress={() => {
            animationRef.current?.pause(); // stop the animation
            if (isLoggedIn) {
              router.replace("/(tabs)/HomeScreen");
            } else {
              router.push("/Auth/LoginScreen");
            }
          }}
        >
          <Text className="text-white text-lg font-bold">Run</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
