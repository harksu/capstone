import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigation } from "@react-navigation/native";
import { Content } from "./Search";
import { selectedItem } from "../Atoms/atoms";

const tempResult = {
  name: "타이레놀",
  effect: "발열,두통,근육통,감기",
  ingredient: "아세트아미노펜 500mg",
  returnResult: true,
};
const tempResult2 = {
  name: "어린이용 타이레놀",
  effect: "발열,두통,근육통,감기",
  ingredient: "아세트아미노펜 80mg",
  returnResult: false,
};

const tempList = [tempResult, tempResult2];

const Item = ({ name, number }) => {
  const [itemName, setItemName] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [picked, setPicked] = useRecoilState(selectedItem);

  const onPress = (data) => {
    if (number === 0) {
      setPicked({ ...picked, first: data.name });
    } else {
      setPicked({ ...picked, second: data.name });
    }
    setItemName(data.name);
  };

  return (
    <View style={[isSearched ? styles.selectResult : styles.selectItem]}>
      {isSearched ? (
        <>
          <TouchableOpacity
            style={styles.selectResultTitle}
            onPress={() => {
              setIsSearched(false);
              if (number === 0) {
                setItemName(picked.first);
              } else {
                setItemName(picked.second);
              }
            }}
          >
            <Text style={styles.selectResultTitleText}>
              {itemName ? itemName : "검색"}
            </Text>
          </TouchableOpacity>
          {itemName ? (
            <View style={styles.selectResultContent}>
              {tempList.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onPress(data);
                    }}
                  >
                    <Content result={data} key={index} isSelect />
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <Text style={styles.selectResultText}>
              해당 약이 없습니다. 다시 검색해주세요
            </Text>
          )}
        </>
      ) : (
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
      )}
      {!isSearched && (
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {
            setIsSearched(true);
          }}
        >
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Select = () => {
  const [itemList, setItemList] = useState(["약"]);
  const [ready, setReady] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Header />
        <View style={styles.item}>
          <ScrollView>
            <Text style={styles.titleText}>알약 선택하기</Text>
            {itemList.map((data, index) => {
              return (
                <Item name={`약${index + 1}`} key={index} number={index} />
              );
            })}
            <View style={{ marginLeft: "auto", marginRight: "auto" }}>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  if (itemList.length > 1) {
                    setReady(true);
                    navigation.navigate("선택페이지", {
                      screen: "선택페이지",
                    });
                    return;
                  }
                  setItemList(itemList.concat(" "));
                }}
              >
                <Text style={styles.buttonText}>
                  {itemList.length === 2 ? `확인` : `+추가`}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.alertText}>
              같이 복용할 알약을 선택해주세요.
            </Text>
          </ScrollView>
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
  selectResult: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    width: "75%",
    height: 450,
    borderWidth: 2,
    borderColor: "#a4ccff",
    borderRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 40,
  },
  selectResultContent: {
    // width: "120%",
    // backgroundColor: "pink",
  },
  selectResultTitle: {
    width: "90%",
    height: 40,
    // backgroundColor: "pink",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#a4ccff",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 14,
    justifyContent: "center",
  },
  selectResultTitleText: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "Tmoney",
    color: "#e2e2e2",
    marginLeft: 15,
  },
  selectResultText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "Tmoney",
    color: "#e2e2e2",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 44,
  },
  selectItemResultText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "Tmoney",
    color: "#e2e2e2",
    marginLeft: 15,
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
