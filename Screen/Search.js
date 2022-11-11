import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const tempData = [
  {
    name: "임학수",
    comment: " 헉...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학순",
    comment: " 험...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학술",
    comment: " 헐...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학수악",
    comment: " 헉...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학순악",
    comment: " 험...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학술악",
    comment: " 헐...! 타이레놀이 역시 근본이죠!!!!",
  },
  {
    name: "임학술악",
    comment: " 헐...! 타이레놀이 역시 근본이죠!!!!",
  },
];

const tempResult = {
  name: "타이레놀",
  effect: "발열,두통,근육통,감기",
  ingredient: "아세트아미노펜",
};

const Comment = ({ last, name, comment }) => {
  return (
    <View style={[(last + 1) % 3 === 0 ? styles.lastComment : styles.comment]}>
      <View style={styles.commentInner}>
        <Text style={styles.commentText}>{name}</Text>
        <View style={styles.commentContent}>
          <Image source={require("../assets/moon.png")} />
          <Text style={styles.commentText}>{comment}</Text>
        </View>
      </View>
    </View>
  );
};
const Content = ({ result }) => {
  const { name, effect, ingredient } = result;
  return (
    <View style={styles.contentContainer}>
      <View style={styles.content}>
        <View style={styles.contentImage}>
          <Image
            style={styles.image}
            source={require(`../assets/miniTylenol.png`)}
          />
        </View>
        <View style={styles.contentExplain}>
          <Text style={styles.contentText}>
            이름 : {name}
            {"\n"}
            효능 : {effect}
            {"\n"}
            성분 : {ingredient}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Search = () => {
  const navigation = useNavigation();

  const [pageNum, setPageNum] = useState(1);
  const onLeft = () => {
    if (pageNum === 1) return;
    setPageNum(pageNum - 1);
  };
  const onRight = () => {
    if (parseInt(tempData.length) / 3 <= pageNum) return;
    setPageNum(pageNum + 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemContainer}>
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
        <Content result={tempResult} />
        <TouchableOpacity
          style={styles.commentContainer}
          onPress={() => {
            navigation.navigate("댓글페이지", {
              screen: "댓글페이지",
              params: tempData,
            });
          }}
        >
          {/* 여기 누르면 댓글리스트 페이지로 넘어가야됨 */}
          {tempData
            .filter((data, index) => parseInt((index + 3) / 3) === pageNum)
            .map((data, index) => {
              return (
                <Comment
                  key={index}
                  name={data.name}
                  comment={data.comment}
                  last={index}
                />
              );
            })}
        </TouchableOpacity>
        <View style={styles.pageContainer}>
          <TouchableOpacity onPressIn={onLeft}>
            <Image source={require("../assets/left.png")} />
          </TouchableOpacity>
          <Text style={styles.pageText}>{pageNum}</Text>
          <TouchableOpacity onPressIn={onRight}>
            <Image source={require("../assets/right.png")} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "scroll",
  },
  itemContainer: {
    flex: 1.1,
    position: "relative",
    //backgroundColor: "orange",
  },
  selectContainer: {
    width: "75%",
    height: 200,
    marginTop: 60, //헤더포함해서 마진을 적용시키긴했는데 이게 맞는건가 ..?
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
    marginTop: 26,
    marginLeft: "auto",
    marginRight: "auto",
    //backgroundColor: "blue",
    alignItems: "center",
  },
  commentContainer: {
    width: "75%",
    height: 200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    borderRadius: 10,
    borderColor: "#a4ccff",
    borderWidth: 2,
  },
  pageContainer: {
    width: 100,
    height: 30,
    // backgroundColor: "pink",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 26,
    marginBottom: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  comment: {
    width: "100%",
    height: "33.3%",
    borderBottomColor: "#a4ccff",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  lastComment: {
    width: "100%",
    height: "33.3%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  commentText: {
    fontSize: 10,
    color: "#000000",
    lineHeight: 16,
    fontFamily: "Tmoney",
  },
  commentInner: {
    width: "90%",
    height: "65%",
    justifyContent: "space-between",
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
  commentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  pageText: {
    color: "#a4ccff",
    lineHeight: 26,
    fontSize: 20,
  },
});
