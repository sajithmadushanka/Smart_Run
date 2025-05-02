import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { style } from "../styles.tx/index.style";
export default function HomeScreen() {
  return (
    <View style={style.container}>
      <Text style={style.text}>Hello</Text>
      <TouchableOpacity
        onPress={() => {
          alert("Hello");
        }}
      >
        <Text style={style.text}>Click Me --</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => {
          alert("Hello");
        }}
      >
        <Text className="text-5xl color-light-primary">Hello oo</Text>
      </Pressable>

      {/* <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={{ width: 400, height: 400 }}
      /> */}
      {/* <Link href="/test"> test page</Link> */}
    </View>
  );
}
