import * as Location from "expo-location";
import { getDistanceFromLatLonInKm } from "../utils/geoUtils";

export const startLocationUpdates = async (
  onUpdate: (loc: Location.LocationObjectCoords) => void
): Promise<Location.LocationSubscription | null> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Location permission denied");
    return null;
  }

  const watchId = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    },
    (newLoc) => onUpdate(newLoc.coords)
  );

  return watchId;
};

export const calculateDeltaDistance = (
  last: Location.LocationObjectCoords,
  current: Location.LocationObjectCoords
): number => {
  return getDistanceFromLatLonInKm(
    last.latitude,
    last.longitude,
    current.latitude,
    current.longitude
  );
};
