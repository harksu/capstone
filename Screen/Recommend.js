import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
const Recommend = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Header />
        <View style={styles.selectContainer}>
          <Text style={styles.text}>증상</Text>
          <View style={styles.dropDown}>
            <Text style={styles.selectText}>증상을 선택해주세요</Text>
            <TouchableOpacity style={styles.drop}>
              <Image source={require("../assets/drop.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.selectButton}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default Recommend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1.1,
    position: "relative", //backgroundColor: "orange",
  },
  selectContainer: {
    width: "90%",
    height: 90,
    marginTop: 90,
    marginLeft: "auto",
    marginRight: "auto",
    //backgroundColor: "pink",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "90%",
    height: 40,
    //backgroundColor: "pink",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  dropDown: {
    alignSelf: "flex-end",
    justifyContent: "space-between",
    width: "96%",
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0974fa",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    marginLeft: "4%",
    fontSize: 20,
    color: "#0974fa",
    lineHeight: 26,
    fontFamily: "Tmoney",
  },
  selectText: {
    fontSize: 20,
    color: "#e2e2e2",
    lineHeight: 26,
    fontFamily: "Tmoney",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    lineHeight: 26,
    fontFamily: "Tmoney",
  },
  selectButton: {
    width: "25%",
    height: "100%",
    backgroundColor: "#0974fa",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0974fa",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
});
