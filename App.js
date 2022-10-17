import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { RecoilRoot } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./Screen/SignIn";
import SignUp from "./Screen/SignUp";
import Main from "./Screen/Main";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Tmoney: require("./assets/fonts/TmoneyRoundWindExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return <StatusBar />;
  }

  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="메인페이지"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="로그인페이지" component={SignIn} />
          <Stack.Screen name="회원가입" component={SignUp} />
          <Stack.Screen name="메인페이지" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
