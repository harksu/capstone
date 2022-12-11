import { StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  const tempitem = { id: -1 };
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
            axios
              .get(`node/comment`)
              .then((res) => {
                const item = res.data.data;
                navigation.navigate("댓글페이지", {
                  screen: "댓글페이지",
                  params: { list: item, item: tempitem },
                });
              })
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
    height: 55,
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
