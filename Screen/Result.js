import { StyleSheet, Text, View, Image, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { selectedItem } from "../Atoms/atoms";

const tylenol = require("../assets/tylenol.png");
const noImage = require("../assets/noimage.png");

const ImageItem = ({ index, src }) => {
  return (
    <View
      style={[index === 0 ? styles.firstImageContainer : styles.ImageContainer]}
    >
      {src === null ? (
        <Image style={styles.image} source={require(`../assets/noimage.png`)} />
      ) : (
        <Image style={styles.image} source={{ uri: src }} />
      )}
    </View>
  );
};

const tempImageList = [tylenol, noImage];

const Result = () => {
  const [isResult, setIsResult] = useState("");
  const [alert, setAlert] = useState("");
  const picked = useRecoilValue(selectedItem);
  const {
    first,
    second,
    first_link,
    second_link,
    first_ingredient,
    second_ingredient,
  } = picked;
  useEffect(() => {
    axios
      .get(`java/contraindicate?pill_a=${first}&pill_b=${second}`)
      .then((res) => {
        setIsResult("같이 복용하실 수 없습니다.");
        setAlert(res.data.result.data);
      })
      .catch((err) => {
        const errCode = err.toJSON().status;
        if (errCode === 404) setIsResult("같이 복용하실 수 있습니다.");
        else Alert.alert(err);
      });
  });
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.itemContainer}>
        <View style={styles.contentContainer}>
          {tempImageList.map((data, index) => {
            const link = index === 0 ? first_link : second_link;
            return <ImageItem index={index} key={index} src={link} />;
          })}
          <ScrollView style={styles.resultTextContainer}>
            <Text style={styles.nameText}>
              {first}
              {"\n"}성분 : {first_ingredient} {"\n"}
              {second}
              {"\n"}성분 : {second_ingredient}
            </Text>
            <Text style={styles.resultText}>
              {first} 과 {second}는 {isResult}
              {"\n"}주의사항 : {alert ? alert : "없습니다."}
            </Text>
          </ScrollView>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1.1,
    position: "relative",
  },
  contentContainer: {
    height: "90%",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#a4ccff",
  },
  firstImageContainer: {
    width: "81%",
    height: "27%",
    borderWidth: 1,
    borderColor: "#cfcfcf",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  ImageContainer: {
    width: "81%",
    height: "27%",
    borderWidth: 1,
    borderColor: "#cfcfcf",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 7,
  },
  resultTextContainer: {
    width: "88%",
    height: "20%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  nameText: {
    fontSize: 15,
    lineHeight: 23,
    fontFamily: "Tmoney",
    color: "#0974fa",
  },
  resultText: {
    fontSize: 12,
    lineHeight: 15,
    marginTop: 15,
    fontFamily: "Tmoney",
    color: "#0974fa",
  },
});
