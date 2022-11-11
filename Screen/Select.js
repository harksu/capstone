import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Item = ({ name }) => {
  const [itemName, setItemName] = useState("");
  return (
    <View style={styles.selectItem}>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder={name}
          style={styles.Text}
          placeholderTextColor={"#bfbfbf"}
          value={itemName}
          onChangeText={setItemName}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setItemName("")}
      >
        <Text style={styles.buttonText}>검색</Text>
      </TouchableOpacity>
    </View>
  );
};

const Select = () => {
  const [itemList, setItemList] = useState(["약", "약"]);
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Header />
        <View style={styles.item}>
          <Text style={styles.titleText}>알약 선택하기</Text>
          {itemList.map((data, index) => {
            return <Item name={`약${index + 1}`} />;
          })}
          <View style={{ marginLeft: "auto", marginRight: "auto" }}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => {
                if (itemList.length > 3) return;
                setItemList(itemList.concat(" "));
              }}
            >
              <Text style={styles.buttonText}>+추가</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.alertText}>같이 복용할 알약을 섵개해주세요.</Text>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1.1,
    position: "relative",
  },
  item: { flex: 1 }, //마진 왔다갔다 거리는 거 방지
  titleText: {
    fontSize: 30,
    color: "#a4ccff",
    lineHeight: 39,
    fontFamily: "Tmoney",
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 50,
  },
  selectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#e4e4e4",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
  },
  selectButton: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#0974fa",
    width: 100,
    height: 40,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "Tmoney",
    color: "#0974fa",
    textAlign: "center",
  },
  Text: {
    fontSize: 23,
    lineHeight: 30,
    fontFamily: "Tmoney",
    color: "#bfbfbf",
    padding: 5,
  },
  alertText: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 26,
    fontFamily: "Tmoney",
    color: "#0974fa",
    fontSize: 11,
    lineHeight: 18,
    fontWeight: "400",
  },
});
