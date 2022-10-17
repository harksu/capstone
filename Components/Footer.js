import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerBox}>
        <TouchableOpacity>
          <Image source={require("../assets/leftLogo.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.footerBox}>
        <TouchableOpacity>
          <Image source={require("../assets/Profile.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.footerBox}>
        <TouchableOpacity>
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
