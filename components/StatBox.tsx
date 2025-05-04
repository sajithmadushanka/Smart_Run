import React from "react";
import { Text, View } from "react-native";

export default function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View className="items-center">
      <Text className="text-sm text-gray-500 dark:text-gray-300">{label}</Text>
      <Text className="text-xl font-bold text-light-text dark:text-dark-text">{value}</Text>
    </View>
  );
}
