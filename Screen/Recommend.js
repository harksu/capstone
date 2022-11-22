import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { SYMTOMS } from "../Datas/Symptoms";

const Recommend = () => {
  const navigation = useNavigation();

  const [isShow, setIsShow] = useState(true);
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState([]);

  const onPress = () => {
    setIsShow(!isShow);
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
              <Image source={require("../assets/drop.png")} />
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
                      key={index}
                      onPressIn={() => {
                        if (symptom.includes(item)) {
                          setSymptom(symptom.replace(item, ""));
                          return;
                        }
                        setSymptom(symptom.concat(item + " "));
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => {
                console.log(symptom);
                axios
                  .get(`/node/pill/symptom?symptom=${symptom}`)
                  .then((res) => setResult(result.concat(res.data.data.pill)))
                  .then(console.log(result))
                  // .then(
                  //   navigation.navigate("검색페이지", {
                  //     screen: "검색페이지",
                  //     params: result,
                  //   })
                  // )
                  .catch((err) => console.log(err));
              }}
            >
              {/* 이거 눌렀을 때 서버 통신 {symptom}  */}

              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
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
    position: "relative", //backgroundColor: "orange",
  },
  selectContainer: {
    width: "90%",
    height: 90,
    marginTop: 90,
    marginLeft: "auto",
    marginRight: "auto",
    // backgroundColor: "pink",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: "90%",
    height: 40,
    //backgroundColor: "pink",
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
    //backgroundColor: "pink",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#a4ccff",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDown: {
    alignSelf: "center", //이건 원래 end였는데 왜 이렇게 했떠라
    justifyContent: "space-between",
    width: "100%", //이건 원래 96프로였음, 그러니까 밑에 마진이 4프로였겠지 근데 왜 ..?
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0974fa",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuItemBox: {
    // backgroundColor: "pink",
    width: "88%",
    height: "90%",
  },
  menuItem: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#a4ccff",
    opacity: 0.5,
    height: 40,
    marginBottom: 20, //이게 얼만지 안나옴
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#a4ccff",
  },
  text: {
    //marginLeft: "2%", // 내가 이거 왜 넣었더라?(원래는 4프로긴한데)
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
  scroll: {},
});
