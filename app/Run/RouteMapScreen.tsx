import { getAllRuns } from "@/services/db";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import MapView, { Polyline } from "react-native-maps";

type RouteParams = {
  params?: {
    run?: {
      route: string;
    };
  };
};

export default function RouteMapScreen() {
  const { params } = useRoute<RouteProp<RouteParams, "params">>();
  const [routes, setRoutes] = useState<any[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoutes = async () => {
      setLoading(true);

      try {
        if (params?.run) {
          const parsed = JSON.parse(params.run.route);
          setRoutes([parsed]);
        } else {
          const allRuns = await getAllRuns();
          const allParsedRoutes = allRuns
            .map((r: any) => {
              try {
                return JSON.parse(r.route);
              } catch {
                return null;
              }
            })
            .filter(Boolean); // remove nulls
          setRoutes(allParsedRoutes);
        }
      } catch (err) {
        console.error("Error loading routes", err);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, []);

  if (loading || routes.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  const initial = routes[0][0]; // first point of first route

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: initial.latitude,
          longitude: initial.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {routes.map((route, idx) => (
          <Polyline
            key={idx}
            coordinates={route}
            strokeColor="#10b981"
            strokeWidth={5}
          />
        ))}
      </MapView>
    </View>
  );
}
