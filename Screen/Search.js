import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

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
export const Content = ({ result, isSelect }) => {
  const { item_name, ee_doc_data, materlal_name, link } = result;
  const itemName = item_name.split("(")[0].substr(0, 10);
  const effect =
    ee_doc_data.replace("[", "").replace("]", "").split(",")[0] +
    "," +
    ee_doc_data.replace("[", "").replace("]", "").split(",")[1] +
    "...";
  const ingredient =
    materlal_name.split("|")[1].substring(6).length < 15
      ? materlal_name.split("|")[1].substring(6)
      : materlal_name.split("|")[1].substring(6).substr(0, 15) + "..."; // 필터링인데 이게 좀 애매하..
  const imgSrc = { uri: link };
  return (
    <View
      style={[
        isSelect ? styles.selectContentContainer : styles.contentContainer,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.contentImage}>
          {link ? (
            <Image style={styles.image} source={imgSrc} />
          ) : (
            <Image
              style={styles.image}
              source={require(`../assets/noimage.png`)}
            />
          )}
        </View>
        <View style={styles.contentExplain}>
          <Text style={styles.contentText}>
            이름 : {itemName}
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

const Search = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [item] = useState(route.params.params);
  const [commentList, setCommentList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const onLeft = () => {
    if (pageNum === 1) return;
    setPageNum(pageNum - 1);
  };
  const onRight = () => {
    if (parseInt(commentList.length) / 3 <= pageNum) return;
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (isFocused) {
      axios
        .get(`node/comment/${item.id}`)
        .then((res) => {
          const list = res.data.data.pill;
          setCommentList(list);
        })
        .catch((err) => Alert.alert("해당하는 댓글이 없습니다."));
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemContainer}>
        <Header />
        <View style={styles.selectContainer}>
          <Image style={styles.image} source={{ uri: item.link }} />
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>500</Text>
          <Image source={require("../assets/titleBlueCapsule.png")} />
        </View>
        <Content result={item} />
        <TouchableOpacity
          style={styles.commentContainer}
          onPress={() => {
            navigation.navigate("댓글페이지", {
              screen: "댓글페이지",
              params: { list: commentList, item: item },
            });
          }}
        >
          {commentList.length === 0 && (
            <Text style={styles.imageText}>
              클릭해서 새로운 의견을 작성해주세요!
            </Text>
          )}
          {commentList
            .filter((data, index) => parseInt((index + 3) / 3) === pageNum)
            .map((data, index) => {
              return (
                <Comment
                  key={data.id}
                  name={data.userName}
                  comment={data.comment}
                  last={index}
                  commentID={data.id}
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
  },
  selectContainer: {
    width: "75%",
    height: 200,
    marginTop: 60, //헤더포함해서 마진을 적용시키긴했는데 이게 맞는건가 ..?
    marginLeft: "auto",
    marginRight: "auto",
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
  selectContentContainer: {
    width: "90%",
    marginTop: 15,
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
    textAlign: "center",
  },
  content: {
    flex: 1,
    width: "93%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentImage: {
    width: "25%",
    height: "60%",
  },
  contentExplain: {
    flex: 1,
    width: "70%",
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
    resizeMode: "cover",
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
