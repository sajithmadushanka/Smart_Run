import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
type IconName = React.ComponentProps<typeof Ionicons>["name"];

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets(); // <-- get bottom safe area inset

  return (
    <View
      style={{
        position: "absolute",
        left: 16,
        right: 16,
        bottom: insets.bottom > 0 ? insets.bottom : 16, // dynamically adjust
      }}
    >
      <BlurView
        intensity={50}
        tint="light"
        style={[styles.container, { paddingBottom: insets.bottom || 12 }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const iconNameMap: Record<string, IconName> = {
              HomeScreen: "home",
              HistoryScreen: "time",
              ProfileScreen: "person",
              SettingsScreen: "settings",
            };

            const onPress = () => {
              if (!isFocused) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={iconNameMap[route.name] || "alert"}
                  size={24}
                  color={isFocused ? "#1e90ff" : "#888"}
                />
                <Text style={[styles.label, isFocused && styles.activeLabel]}>
                  {options.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  tabButton: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  activeLabel: {
    color: "#1e90ff",
    fontWeight: "600",
  },
});

export default CustomTabBar;
