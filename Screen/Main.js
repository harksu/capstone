import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Components/Footer";

const Main = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#0974fa", "#ffffff"]}
      locations={[0.5, 0.5]}
      style={styles.container}
    >
      <TouchableOpacity style={styles.button}>
        <Image source={require("../assets/bluecapsule.png")} />
        <Text style={styles.logoText}>Safe{"\n"}Pill</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("추천페이지", {
              screen: "추천페이지",
            });
          }}
        >
          <Image source={require("../assets/yellowcapsule.png")} />
          <Text style={styles.buttonText}>약 추천받기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("선택페이지", {
              screen: "선택페이지",
            });
          }}
        >
          <Image source={require("../assets/bluecapsule.png")} />
          <Text style={styles.buttonText}>약 검색하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.explainTitle}>약 추천받기란?</Text>
        <Text style={styles.explain}>
          약 추천받기란 현재 사용자의 증상을 선택하시면 증상에따른 약들을
          추천해주는 서비스입니다.
        </Text>
        <Text style={styles.explainTitle}>약 검색하기란?</Text>
        <Text style={styles.explain}>
          약 검색하기란 현재 가지고계신 상비약을 같이 먹었을때 부작용이 없는지
          확인해주는 서비스입니다.
        </Text>
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 40,
    flex: 1,
    width: "85%",
    hegiht: 300,
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    marginTop: 35,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    fontFamily: "Tmoney",
    fontSize: 30,
    lineHeight: 39,
    color: "#0974fa",
    textAlign: "center",
  },
  buttonText: {
    fontFamily: "Tmoney",
    fontSize: 20,
    lineHeight: 26,
    color: "#0974fa",
    textAlign: "center",
    marginTop: 28,
  },
  explainTitle: {
    fontFamily: "Tmoney",
    fontSize: 20,
    lineHeight: 26,
    color: "#0974fa",
    textAlign: "left",
    marginTop: 5,
  },
  explain: {
    fontFamily: "Tmoney",
    fontSize: 15,
    lineHeight: 24,
    color: "#000000",
    textAlign: "left",
    marginTop: 6,
    marginBottom: 20,
  },
});
