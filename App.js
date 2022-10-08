import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import SignIn from "./Screen/SignIn";
import SignUp from "./Screen/SignUp";

export default function App() {
  const [fontsLoaded] = useFonts({
    Tmoney: require("./assets/fonts/TmoneyRoundWindExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return <StatusBar />;
  }

  return (
    <View style={styles.container}>
      {/* <SignIn /> */}
      <SignUp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
