import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { accessToken, userName } from "../Atoms/atoms";

const Comment = ({ last, name, comment }) => {
  return (
    <View style={[(last + 1) % 7 === 0 ? styles.lastComment : styles.comment]}>
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
const CommentList = ({ route }) => {
  useEffect(() => {}, [list]);
  const navigation = useNavigation();

  const token = useRecoilValue(accessToken);
  const name = useRecoilValue(userName);

  const [id] = useState(route.params.params.item.id);
  const [list, setList] = useState(route.params.params.list);
  const [pageNum, setPageNum] = useState(1);
  const [comment, setComment] = useState("");

  const onLeft = () => {
    if (pageNum === 1) return;
    setPageNum(pageNum - 1);
  };

  const onRight = () => {
    if (parseInt(list.length) / 7 <= pageNum) return;
    setPageNum(pageNum + 1);
  };

  const onSubmit = () => {
    if (!token) {
      Alert.alert("로그인 먼저 부탁드립니다.");
      navigation.navigate("로그인페이지", {
        screen: "로그인페이지",
      });
      return;
    }
    axios
      .post(
        `/node/comment/${id}`,
        {
          comment: comment,
        },
        {
          headers: { accessToken: token },
        }
      )
      .then((res) => {
        axios
          .get(`node/comment/${id}`)
          .then((res) => {
            const item = res.data.data.pill;
            setList(item);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err.toJSON()));
    setComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Header />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.commentContainer}>
            {list
              .filter((data, index) => parseInt((index + 7) / 7) === pageNum)
              .map((data, index) => {
                return (
                  <Comment
                    key={index}
                    name={data.userName}
                    comment={data.comment}
                    last={index}
                  />
                );
              })}
            <View style={styles.commentInput}>
              <Text style={styles.nameText}>{name}</Text>
              <TextInput
                onChangeText={setComment}
                value={comment}
                placeholder="의견을 작성해주세요"
                style={{ padding: 5, fontSize: 12, lineHeight: 15 }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              ></TextInput>
              <TouchableOpacity
                style={styles.submitContainer}
                onPress={onSubmit}
              >
                <Text style={styles.submitText}>작성하기</Text>
              </TouchableOpacity>
            </View>
          </View>
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
      </View>

      <Footer />
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1.1,
    position: "relative",
  },
  commentContainer: {
    marginTop: 76,
    width: "75%",
    height: 660,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    borderColor: "#a4ccff",
    borderWidth: 2,
    marginBottom: 30,
  },
  submitContainer: { alignSelf: "flex-end" },
  comment: {
    width: "100%",
    height: "12%",
    borderBottomColor: "#a4ccff",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  commentInput: {
    width: "95%",
    hegiht: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 2,
    borderColor: "#e6e6e6",
    marginBottom: 11,
    justifyContent: "space-around",
    padding: 5,
  },
  lastComment: {
    width: "100%",
    height: "12%",
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
    height: "55%",
    justifyContent: "space-between",
  },

  commentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    padding: 5,
    fontSize: 12,
    lineHeight: 15,
  },
  submitText: {
    fontSize: 10,
    lineHeight: 12,
  },
  pageContainer: {
    width: 100,
    height: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
