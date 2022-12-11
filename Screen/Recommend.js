import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { SYMTOMS } from "../Datas/Symptoms";
import { Content } from "./Search";

const Recommend = () => {
  const navigation = useNavigation();

  const [isShow, setIsShow] = useState(true);
  const [symptom, setSymptom] = useState("");
  const [resultList, setResultList] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [buttonShow, setButtonShow] = useState(true);

  const onPress = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    setIsSearched(false);
    setButtonShow(true);
    setResultList([]);
  }, [symptom]);

  const goResult = (result) => {
    navigation.navigate("검색페이지", {
      screen: "검색페이지",
      params: result,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Header />
        <View style={styles.selectContainer}>
          <Text style={styles.text}>증상</Text>
          <View style={styles.dropDown}>
            <Text style={styles.selectText}>
              {symptom ? symptom : "증상을 선택해주세요"}
            </Text>
            <TouchableOpacity onPressIn={onPress}>
              <Image
                source={require("../assets/drop.png")}
                style={[isShow && { transform: [{ rotate: "180deg" }] }]}
              />
            </TouchableOpacity>
          </View>
        </View>
        {isShow ? (
          <View style={styles.menuContainer}>
            <View style={styles.menuItemBox}>
              <ScrollView>
                {SYMTOMS?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.menuItem}
                      key={item}
                      onPressIn={() => {
                        setSymptom(item);
                      }}
                    >
                      <Text style={styles.menuText}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          buttonShow && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  axios
                    .get(`/node/pill/symptom?symptom=${symptom}`)
                    .then((res) => {
                      setButtonShow(false);
                      setIsSearched(true);
                      if (resultList.length === 0)
                        setResultList(resultList.concat(res.data.data.pill));
                    })
                    .catch((err) => console.log(err));
                }}
              >
                <Text style={styles.buttonText}>확인</Text>
              </TouchableOpacity>
            </View>
          )
        )}
        {isSearched && (
          <View style={styles.selectResultContainer}>
            <ScrollView style={styles.selectResultContent} nestedScrollEnabled>
              {resultList.map((data, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      goResult(data);
                    }}
                  >
                    <Content result={data} key={data.item_seq} isSelect />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default Recommend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1.1,
    position: "relative",
  },
  selectContainer: {
    width: "90%",
    height: 90,
    marginTop: 90,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "90%",
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  menuContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    width: "90%",
    height: 290,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#a4ccff",
    justifyContent: "center",
    alignItems: "center",
  },
  selectResultContent: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    marginTop: 15,
  },
  selectResultContainer: {
    flex: 1,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#dcebff",
    marginTop: 15,
  },
  dropDown: {
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0974fa",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuItemBox: {
    width: "88%",
    height: "90%",
  },
  menuItem: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#a4ccff",
    opacity: 0.5,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#a4ccff",
  },
  text: {
    fontSize: 20,
    color: "#0974fa",
    lineHeight: 26,
    fontFamily: "Tmoney",
  },
  selectText: {
    fontSize: 20,
    color: "#e2e2e2",
    lineHeight: 26,
    fontFamily: "Tmoney",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    lineHeight: 26,
    fontFamily: "Tmoney",
  },
  menuText: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "Tmoney",
    marginLeft: 10,
  },
  selectButton: {
    width: "25%",
    height: "100%",
    backgroundColor: "#0974fa",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0974fa",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
});
