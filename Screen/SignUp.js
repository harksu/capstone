import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Footer from "../Components/Footer";

const SignUp = () => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });
  const [passwordCheck, setPasswordCheck] = useState("");

  const pwRef = useRef();
  const pwCheckRef = useRef();

  const pwRegEx = new RegExp(
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{10,}$/
  );

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.inputBox}>
          <View style={styles.back}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("로그인페이지", {
                  screen: "로그인페이지",
                });
              }}
            >
              <Image source={require("../assets/back.png")} />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>회원가입</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.inputText}>아이디</Text>
            <TextInput
              style={styles.input}
              onChangeText={(input) => setUserInfo({ ...userInfo, id: input })}
              value={userInfo.id}
              autoFocus={true}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                pwRef.current.focus();
              }}
            />
          </View>
          <View style={styles.passwordContainer}>
            <Text style={styles.inputText}>패스워드</Text>
            <TextInput
              style={styles.input}
              onChangeText={(input) => setUserInfo({ ...userInfo, pw: input })}
              value={userInfo.pw}
              ref={pwRef}
              secureTextEntry={true}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                pwCheckRef.current.focus();
              }}
            />
            {pwRegEx.test(userInfo.pw) ? (
              <View style={styles.emptyBlock} />
            ) : (
              <Text style={styles.alertText}>
                패스워드는 특수문자,영문 숫자 포함 10글자 이상이어야합니다.
              </Text>
            )}
          </View>
          <View style={styles.passwordContainer}>
            <Text style={styles.inputText}>패스워드 확인</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPasswordCheck}
              value={passwordCheck}
              ref={pwCheckRef}
              secureTextEntry={true}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                Keyboard.dismiss();
                axios
                  .post(`java/sign-up`, {
                    username: userInfo.id,
                    password: userInfo.pw,
                  })
                  .then((res) => {
                    Alert.alert("회원 가입 되었습니다.");
                    navigation.navigate("로그인페이지", {
                      screen: "로그인페이지",
                    });
                  })
                  .catch((err) => {
                    const errCode = err.toJSON().status;
                    if (errCode === 409) Alert.alert("이미 가입된 회원입니다.");
                    else Alert.alert("형식에 맞게 다시 입력해주세요");
                  });
              }}
            />
            {passwordCheck === userInfo.pw ? (
              <View style={styles.emptyBlock} />
            ) : (
              <Text style={styles.alertText}>
                패스워드가 올바르지 않습니다.
              </Text>
            )}
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  back: {
    flex: 0.2,
    flexDirection: "row",
    marginLeft: -10,
  },
  itemContainer: {
    flex: 1.1,
  },
  inputBox: {
    flex: 0.7,
    marginTop: 67,
    marginLeft: 20,
    marginRight: 20,
  },
  titleContainer: { flex: 0.5 },
  passwordContainer: {
    flex: 0.4,
    marginBottom: 14,
  },
  titleText: {
    fontFamily: "Tmoney",
    fontSize: 20,
    lineHeight: 26,
    marginBottom: "19%",
    color: "#0974fa",
  },
  inputText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#0974fa",
    fontFamily: "Tmoney",
  },
  alertText: {
    fontSize: 10,
    color: "#0974fa",
    opacity: 0.3,
    fontFamily: "Tmoney",
  },
  emptyBlock: {
    height: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#0974fa",
    padding: 10,
  },
});
