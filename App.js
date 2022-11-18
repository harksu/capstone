import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { RecoilRoot } from "recoil";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./Screen/SignIn";
import SignUp from "./Screen/SignUp";
import Main from "./Screen/Main";
import Recommend from "./Screen/Recommend";
import Search from "./Screen/Search";
import CommentList from "./Screen/CommentList";
import Select from "./Screen/Select";
import Result from "./Screen/Result";

axios.defaults.baseURL = "http://3.35.231.183"; //이거 나중에 도메인으로 변경

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
          <Stack.Screen name="선택페이지" component={Select} />
          <Stack.Screen name="결과페이지" component={Result} />
          <Stack.Screen name="추천페이지" component={Recommend} />
          <Stack.Screen name="댓글페이지" component={CommentList} />
          <Stack.Screen name="검색페이지" component={Search} />
          <Stack.Screen name="로그인페이지" component={SignIn} />
          <Stack.Screen name="회원가입" component={SignUp} />
          <Stack.Screen name="메인페이지" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({});
