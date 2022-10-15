import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState, useRef } from "react";
import Footer from "../Components/Footer";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });
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
            <TouchableOpacity>
              {/* 이거 누를 때 로그인 페이지로 강제라우팅(첫번째 페이지로) */}
              <Image source={require("../assets/back.png")} />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText}>로그인</Text>
          <Text style={styles.requestText}>
            회원 서비스 이용을 위해 로그인 해주세요.
          </Text>

          <View style={styles.titleContainer}>
            <Text style={styles.inputText}>아이디</Text>
            <TextInput
              style={styles.input}
              onChangeText={(input) => setUserInfo({ ...userInfo, id: input })}
              value={userInfo.id}
              //autoFocus={true} 이거 나중에 키자 정신 없다.
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
        </View>
      </View>
      <View style={styles.loginButton}>
        <TouchableOpacity>
          <Text style={styles.loginText}>로그인하기</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  //이거 짜고 밑으로
  loginButton: {
    flex: 0.1,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0974fa",
    borderRadius: 30,
  },
  loginText: {
    fontFamily: "Tmoney",
    fontSize: 15,
    lineHeight: 24,
    color: "white",
  },
  container: {
    flex: 1,
  },
  back: {
    flex: 0.2,
    flexDirection: "row",
    marginLeft: -10,
    // backgroundColor: "pink",
  },
  itemContainer: {
    flex: 1.1,
  },
  inputBox: {
    flex: 0.7,
    marginTop: 67,
    marginLeft: 20,
    marginRight: 20, //리넥 마진 적용 극혐;
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
  requestText: {
    fontSize: 10,
    color: "#0974fa",
    opacity: 0.5,
    // flex: 0.4,
    marginTop: 20,
    marginBottom: 30, //일단 눈대중이긴 한데 나중에 제대로
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
