// app/run/start.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const screen = Dimensions.get("window");

export default function StartRunScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [routeCoords, setRouteCoords] = useState<Location.LocationObjectCoords[]>([]);
  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [speed, setSpeed] = useState(0);

  const watchId = useRef<Location.LocationSubscription | null>(null);

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

    watchId.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLoc) => {
        const newCoords = newLoc.coords;
        setLocation(newCoords);
        setRouteCoords((prev) => [...prev, newCoords]);

        const lastCoord = routeCoords[routeCoords.length - 1];
        if (lastCoord) {
          const delta = getDistanceFromLatLonInKm(
            lastCoord.latitude,
            lastCoord.longitude,
            newCoords.latitude,
            newCoords.longitude
          );
          setDistance((prev) => prev + delta);
          setSpeed(newCoords.speed || 0);
        }
      }
    );
  };

  const stopRun = () => {
    if (watchId.current) {
      watchId.current.remove();
    }
    setIsRunning(false);
  };

  const handleStartStop = () => {
    if (isRunning) {
      stopRun();
    } else {
      startRun();
      setIsRunning(true);
    }
  };

  const getDuration = () => {
    if (!startTime) return "00:00";
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of earth in KM
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      {location && (
        <MapView
          style={{ height: screen.height * 0.6 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton={false}
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
      )}

      {/* Stats Panel */}
      <View className="p-6 bg-white dark:bg-gray-900 rounded-t-3xl shadow-lg -mt-5">
        <Text className="text-xl font-bold text-center mb-2 text-light-text dark:text-dark-text">
          {isRunning ? "Tracking Run..." : "Paused"}
        </Text>
        <View className="flex-row justify-around mt-2">
          <StatBox label="Time" value={getDuration()} />
          <StatBox label="Distance" value={`${distance.toFixed(2)} km`} />
          <StatBox label="Speed" value={`${(speed * 3.6).toFixed(1)} km/h`} />
        </View>

        <TouchableOpacity
          onPress={handleStartStop}
          className={`mt-6 mx-auto w-28 h-28 rounded-full justify-center items-center ${
            isRunning ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <Ionicons
            name={isRunning ? "stop" : "play"}
            size={48}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View className="items-center">
      <Text className="text-sm text-gray-500 dark:text-gray-300">{label}</Text>
      <Text className="text-xl font-bold text-light-text dark:text-dark-text">
        {value}
      </Text>
    </View>
  );
}
