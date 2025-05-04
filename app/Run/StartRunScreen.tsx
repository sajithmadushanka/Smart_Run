/* eslint-disable react-hooks/rules-of-hooks */
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

import { saveRunToDb } from "@/services/db";
import LottieView from "lottie-react-native";
import StatBox from "../../components/StatBox";
import {
  calculateDeltaDistance,
  startLocationUpdates,
} from "../../services/runTracker";
import { formatDuration } from "../../utils/geoUtils";

const animationRef = useRef(null);

const screen = Dimensions.get("window");
export default function StartRunScreen() {
  const [tick, setTick] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [routeCoords, setRouteCoords] = useState<
    Location.LocationObjectCoords[]
  >([]);
  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [speed, setSpeed] = useState(0);

  const watchId = useRef<Location.LocationSubscription | null>(null);
  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setTick((prev) => prev + 1); // trigger re-render
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const startRun = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
    setRouteCoords([loc.coords]);
    setStartTime(Date.now());
    setDistance(0);
    setSpeed(0);

    watchId.current = await startLocationUpdates((newCoords: any) => {
      setLocation(newCoords);
      setRouteCoords((prev) => {
        const last = prev[prev.length - 1];
        if (last) {
          const delta = calculateDeltaDistance(last, newCoords);
          setDistance((prev) => prev + delta);
          setSpeed(newCoords.speed || 0);
        }
        return [...prev, newCoords];
      });
    });

    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseRun = () => {
    watchId.current?.remove();
    setIsPaused(true);
  };

  const resumeRun = async () => {
    watchId.current = await startLocationUpdates((newCoords: any) => {
      setLocation(newCoords);
      setRouteCoords((prev) => {
        const last = prev[prev.length - 1];
        if (last) {
          const delta = calculateDeltaDistance(last, newCoords);
          setDistance((prev) => prev + delta);
          setSpeed(newCoords.speed || 0);
        }
        return [...prev, newCoords];
      });
    });
    setIsPaused(false);
  };

  const stopRun = () => {
    watchId.current?.remove();
    setIsRunning(false);
    setIsPaused(false);

    Alert.alert("Save Run", "Do you want to save your run?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          const duration = startTime ? Date.now() - startTime : 0;
          const avgSpeed = distance > 0 ? distance / (duration / 3600000) : 0;
          saveRunToDb(
            formatDuration(duration),
            distance,
            avgSpeed,
            routeCoords
          );
          Alert.alert("Run Saved", "Your run was saved successfully.");
        },
      },
    ]);
  };

  const duration = startTime ? Date.now() - startTime : 0 + tick * 1000;

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      {isRunning && location ? (
        <>
          <MapView
            style={{ height: screen.height * 0.6 }}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            showsUserLocation
            followsUserLocation
          >
            <Polyline
              coordinates={routeCoords}
              strokeColor="#10b981"
              strokeWidth={5}
            />
            <Marker coordinate={location}>
              <Ionicons name="walk" size={32} color="#10b981" />
            </Marker>
          </MapView>

          <View className="p-6 bg-white dark:bg-gray-900 rounded-t-3xl shadow-lg -mt-5">
            <Text className="text-xl font-bold text-center mb-2 text-light-text dark:text-dark-text">
              {isPaused ? "Paused" : "Tracking..."}
            </Text>
            <View className="flex-row justify-around mt-2">
              <StatBox label="Time" value={formatDuration(duration)} />
              <StatBox label="Distance" value={`${distance.toFixed(2)} km`} />
              <StatBox
                label="Speed"
                value={`${(speed * 3.6).toFixed(1)} km/h`}
              />
            </View>
            <View className="flex-row justify-around mt-6">
              <TouchableOpacity
                onPress={isPaused ? resumeRun : pauseRun}
                className="bg-yellow-400 px-6 py-4 rounded-full"
              >
                <Ionicons
                  name={isPaused ? "play" : "pause"}
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={stopRun}
                className="bg-red-500 px-6 py-4 rounded-full"
              >
                <Ionicons name="stop" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center px-6 bg-light-background dark:bg-dark-background">
          <LottieView
            ref={animationRef}
            autoPlay
            loop
            style={{ width: 250, height: 250 }}
            source={require("../../assets/animations/runner.json")} // Replace with your file path
          />

          <Text className="text-2xl font-bold text-center mt-6 text-light-text dark:text-dark-text">
            Ready to Run?
          </Text>
          <Text className="text-base text-gray-500 dark:text-gray-400 text-center mt-2">
            Track your route, speed, and distance live
          </Text>

          <TouchableOpacity
            onPress={startRun}
            className="mt-10 bg-green-500 px-10 py-4 rounded-full shadow-lg"
          >
            <Text className="text-white text-lg font-semibold">Start Run</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
