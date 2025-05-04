// RouteMapScreen.tsx
import { useRoute, RouteProp } from "@react-navigation/native";
import { View } from "react-native";
import MapView, { Polyline } from "react-native-maps";

export default function RouteMapScreen() {
  const { params } = useRoute<RouteProp<{ params: { run: { route: string } } }, 'params'>>();
  const { run } = params;
  const route = JSON.parse(run.route);

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: route[0].latitude,
          longitude: route[0].longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline coordinates={route} strokeColor="#10b981" strokeWidth={6} />
      </MapView>
    </View>
  );
}
