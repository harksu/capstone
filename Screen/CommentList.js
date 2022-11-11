import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

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
  const list = route.params.params;
  console.log(list);
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Header />
        <View style={styles.commentContainer}>
          {list.map((data, index) => {
            //  console.log(data);
            return (
              <Comment
                key={index}
                name={data.name}
                comment={data.comment}
                last={index}
              />
            );
          })}
        </View>
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
    overflow: "scroll",
  },
  itemContainer: {
    flex: 1.1,
    position: "relative",
    //backgroundColor: "orange",
  },
  comment: {
    width: "100%",
    height: "13%",
    borderBottomColor: "#a4ccff",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  lastComment: {
    width: "100%",
    height: "13%",
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
  commentContainer: {
    marginTop: 36,
    width: "75%",
    height: 500,
    backgroundColor: "pink",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    borderColor: "#a4ccff",
    borderWidth: 2,
  },
  commentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
