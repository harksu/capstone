import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Search = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Header />
        <View style={styles.selectContainer}>
          <Image
            style={styles.image}
            source={require("../assets/tylenol.png")}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>500</Text>
          <Image source={require("../assets/titleBlueCapsule.png")} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.contentImage}>
              <Image
                style={styles.image}
                source={require("../assets/miniTylenol.png")}
              />
            </View>
            <View style={styles.contentExplain}>
              <Text style={styles.contentText}>
                이름 : 타이레놀{"\n"}
                효능 : 발열, 두통, 근육통, 감기{"\n"}
                성분 : 아세트아미노펜 500mg
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.commentContainer}></View>
      </View>
      <Footer />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1.1,
    position: "relative",
    //backgroundColor: "orange",
  },
  selectContainer: {
    width: "75%",
    height: 200,
    marginTop: 52, //헤더포함해서 마진을 적용시키긴했는데 이게 맞는건가 ..?
    marginLeft: "auto",
    marginRight: "auto",
    //backgroundColor: "pink",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  contentContainer: {
    width: "75%",
    height: 100,
    marginTop: 3.5,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f3f9ff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "75%",
    height: 30,
    marginTop: 36,
    marginLeft: "auto",
    marginRight: "auto",
    //backgroundColor: "blue",
    alignItems: "center",
  },
  commentContainer: {
    width: "75%",
    height: 100,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    borderRadius: 10,
    borderColor: "#a4ccff",
    borderWidth: 2,
  },
  imageText: {
    fontSize: 20,
    color: "#0974fa",
    lineHeight: 26,
    fontFamily: "Tmoney",
    marginRight: 5,
  },
  content: {
    //backgroundColor: "pink",
    width: "93%",
    height: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentImage: {
    width: "25%",
    height: "50%",
    // backgroundColor: "yellow",
  },
  contentExplain: {
    width: "70%",
    height: "70%",
    //backgroundColor: "red",
  },
  contentText: {
    fontSize: 10,
    color: "#000000",
    lineHeight: 13,
    fontFamily: "Tmoney",
    marginLeft: 12,
  },
  image: {
    flex: 1,
    width: "100%",
    hegiht: "100%",
    backgroundColor: "red",
  },
});
