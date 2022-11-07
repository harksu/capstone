import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.back}>
        <Image source={require("../assets/back.png")} />
        <Image source={require("../assets/titleBlueCapsule.png")} />
        <Text style={styles.text}>Safe Pill</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 0.1,
    position: "relative",
    // backgroundColor: "red",
  },
  back: {
    flex: 0.2,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "pink",
    top: 15, //10으로 할까 20으로 할까
    left: 10,
    height: 28,
    width: 140,
  },
  text: {
    fontSize: 20,
    color: "#0974fa",
    lineHeight: 26,
    fontFamily: "Tmoney",
  },
});
