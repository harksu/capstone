import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.back}
        onPressIn={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
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
  },
  back: {
    flex: 0.2,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    top: 15,
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
