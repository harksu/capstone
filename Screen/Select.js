import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useNavigation } from "@react-navigation/native";
import { Content } from "./Search";
import { selectedItem } from "../Atoms/atoms";

const Item = ({ name, number }) => {
  const [itemName, setItemName] = useState("");
  const [resultList, setResultList] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [none, setNone] = useState(false);

  const [picked, setPicked] = useRecoilState(selectedItem);

  const onPress = (data) => {
    const ingredient = data.materlal_name.split("|")[1].substring(6); // 필터링
    if (number === 0) {
      setPicked({
        ...picked,
        first: data.item_name,
        first_link: data.link,
        first_ingredient: ingredient,
      });
    } else {
      setPicked({
        ...picked,
        second: data.item_name,
        second_link: data.link,
        second_ingredient: ingredient,
      });
    }
    setItemName(data.item_name);
  };

  useEffect(() => {
    setResultList([]);
    //이게 베스트 로직은 아닌 것 같은데
  }, [itemName]);

  const getItemList = () => {
    axios
      .get(`/node/pill/name?name=${itemName}`)
      .then((res) => {
        setNone(false);
        if (resultList.length === 0)
          setResultList(resultList.concat(res.data.data.pill));
      })
      .catch((err) => {
        console.log(err);
        setNone(true);
      });
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
          {!none ? (
            <View style={styles.selectResultContent}>
              <ScrollView nestedScrollEnabled>
                {resultList.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onPress(data);
                      }}
                    >
                      <Content result={data} key={data.item_seq} isSelect />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
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
            // value={itemName} 이거 없애야 한글 분리가 안됨
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
            getItemList();
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
  const [picked] = useRecoilState(selectedItem);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Header />
        <View style={styles.item}>
          <ScrollView>
            <Text style={styles.titleText}>알약 선택하기</Text>
            {itemList.map((data, index) => {
              var name = `약${index + 1}`;
              const keyValue = `${name}${index}`;
              if (picked) {
                name = index === 0 ? picked.first : picked.second;
              }
              return <Item name={name} key={keyValue} number={index} />;
            })}
            <View style={{ marginLeft: "auto", marginRight: "auto" }}>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  if (itemList.length > 1) {
                    setReady(true);
                    navigation.navigate("결과페이지", {
                      screen: "결과페이지",
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
    flex: 1,
    //backgroundColor: "pink",
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
