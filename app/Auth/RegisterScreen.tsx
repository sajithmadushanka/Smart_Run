import React from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function RegisterScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onRegister = (data: any) => {
    // TODO: Implement actual registration logic
    console.log("Register Data:", data);
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
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600"
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && (
          <Text className="text-red-500 font-medium">{errors.name.message}</Text>
        )}

        {/* Email Field */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600"
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 font-medium">{errors.email.message}</Text>
        )}

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
          <Text className="text-red-500 font-medium">{errors.password.message}</Text>
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
