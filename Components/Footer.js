import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);

  const tempitem = { id: 4500 };
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
            axios
              .get(`node/comment/4500`)
              //이걸 나중에 id로 바꾸고 파라미터에도 item으로 바꾸면 되는건데
              .then((res) => {
                const item = res.data.data.pill;
                setList(item);
              })
              .then(
                navigation.navigate("댓글페이지", {
                  screen: "댓글페이지",
                  params: { list: list, item: tempitem },
                })
              )
              .catch((err) => console.log(err));
          }}
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
