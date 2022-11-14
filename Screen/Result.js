import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useRecoilValue } from "recoil";
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
      <Image style={styles.image} source={src} />
    </View>
  );
};

const tempImageList = [tylenol, noImage];
const Result = () => {
  const { first, second } = useRecoilValue(selectedItem);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.itemContainer}>
        <View style={styles.contentContainer}>
          {tempImageList.map((data, index) => {
            return <ImageItem index={index} key={index} src={data} />;
          })}
          <View style={styles.resultTextContainer}>
            <Text style={styles.nameText}>
              {first} 성분 : ~~~ {"\n"}
              {second} 성분 : ~~~
            </Text>
            <Text style={styles.resultText}>
              {first} 과 {second}는 같이 복용하실 수 있습니다.{"\n"}주의사항 :
              ~~~
            </Text>
          </View>
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
    height: "90%", //원래 85인데 90ㅇ ㅣ더 이쁨
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
    //backgroundColor: "pink",
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
    fontSize: 18,
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
