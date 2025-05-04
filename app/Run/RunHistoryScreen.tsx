import { useNavigation, NavigationProp } from "@react-navigation/native";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Polyline } from "react-native-maps";
import { getAllRuns } from "../../services/db";

const screenWidth = Dimensions.get("window").width;

// Define navigation param types
type RootStackParamList = {
  "Run/RouteMapScreen": { run: any };
  // Add other routes as needed
};

export default function RunHistoryScreen() {
  const [runs, setRuns] = useState<any[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    getAllRuns().then(setRuns).catch(console.error);
  }, []);

  if (!runs.length) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
        <Text className="text-gray-500 dark:text-gray-400 text-lg">
          No runs yet.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900 px-4 pt-4">
      {runs.map((run, index) => {
        const route = JSON.parse(run.route || "[]");

        const region = route.length
          ? {
              latitude: route[0].latitude,
              longitude: route[0].longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }
          : null;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Run/RouteMapScreen", { run })}
            className="mb-6 rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800"
          >
            {region && (
              <MapView
                style={{ height: 160, width: screenWidth - 32 }}
                region={region}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
                liteMode
              >
                <Polyline
                  coordinates={route}
                  strokeColor="#10b981"
                  strokeWidth={4}
                />
              </MapView>
            )}
            <View className="p-4">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {format(new Date(run.date), "PPpp")}
              </Text>
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-xs text-gray-400">Duration</Text>
                  <Text className="text-sm font-medium text-gray-800 dark:text-white">
                    {run.duration}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-400">Distance</Text>
                  <Text className="text-sm font-medium text-gray-800 dark:text-white">
                    {run.distance.toFixed(2)} km
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-400">Avg Speed</Text>
                  <Text className="text-sm font-medium text-gray-800 dark:text-white">
                    {run.avgSpeed.toFixed(1)} km/h
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
