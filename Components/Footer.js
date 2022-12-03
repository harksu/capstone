import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const tempData = [
  {
    name: "임학수",
    comment: " 헉...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학순",
    comment: " 험...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학술",
    comment: " 헐...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학수악",
    comment: " 헉...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학순악",
    comment: " 험...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학술악",
    comment: " 헐...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학술악",
    comment: " 헐...! 타이레놀이 역시 근본이죠!!!!",
  },
];

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <View style={styles.footerBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("메인페이지", {
              screen: "메인페이지",
            });
          }}
        >
          <Image source={require("../assets/leftLogo.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.footerBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("로그인페이지", {
              screen: "로그인페이지",
            });
          }}
        >
          <Image source={require("../assets/Profile.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.footerBox}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("현재 어떻게 할지 의논중입니다.");
          }}
          // onPress={() => {
          //   navigation.navigate("댓글페이지", {
          //     screen: "댓글페이지",
          //     params: tempData,
          //   });
          // }} -> 이거 나중에 어떻게 할 지 물어보기
        >
          <Image source={require("../assets/rightLogo.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    height: 55, // 고정으로 해야 관리가 편함
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  footerBox: {
    flex: 0.34,
    height: "100%",
    borderWidth: 1,
    borderColor: "#e2e2e2",
    justifyContent: "center",
    alignItems: "center",
  },
});
