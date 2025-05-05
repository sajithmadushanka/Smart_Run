import { useUser } from "@/context/UserContext";
import { registerUser } from "@/services/userService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("UserName is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onRegister = async (data: any) => {
    const { username, password } = data;
    const res = await registerUser(username, password);
    console.log("Register Response:", res);
    if (!res.success) {
      Alert.alert("Error", res.error);
      return;
    }
    login(username);
    console.log("User registered successfully");
    router.replace("/(tabs)/HomeScreen");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center items-center px-6 bg-light-background dark:bg-dark-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Animated.Text
        entering={FadeInDown.duration(500)}
        className="text-3xl font-bold text-light-text dark:text-dark-text font-['Urbanist-Bold'] mb-8"
      >
        Create Account
      </Animated.Text>

      <View className="w-full space-y-4">
        {/* Name Field */}
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600"
              placeholder="username"
              placeholderTextColor="#aaa"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.username && (
          <Text className="text-red-500 font-medium">
            {errors.username.message}
          </Text>
        )}
        {/* below space ------------ */}
        <View className="h-4" />

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600"
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500 font-medium">
            {errors.password.message}
          </Text>
        )}

        {/* Register Button */}
        <TouchableOpacity
          className="bg-green-500 py-3 rounded-full shadow-lg mt-4"
          onPress={handleSubmit(onRegister)}
        >
          <Text className="text-white text-center text-lg font-bold font-['Urbanist']">
            Register
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-center text-sm mt-4 text-light-text dark:text-dark-text">
            Already have an account?{" "}
            <Text className="text-green-600 font-bold">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
