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
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Components/Footer";
import { accessToken, userName } from "../Atoms/atoms";

const SignIn = () => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });

  const [token, setToken] = useRecoilState(accessToken);
  const setUserName = useSetRecoilState(userName);
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
                navigation.navigate("메인페이지", {
                  screen: "메인페이지",
                });
              }}
            >
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
                // pwCheckRef.current.focus(); 이게 왜 있는거지 ?
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
        <TouchableOpacity
          style={styles.alertTextContainer}
          onPress={() => {
            navigation.navigate("회원가입", {
              screen: "회원가입",
            });
          }}
        >
          <Text style={styles.routeText}>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginButton}>
        <TouchableOpacity
          onPress={() => {
            axios
              .post(`java/sign-in`, {
                username: userInfo.id,
                password: userInfo.pw,
              })
              .then((res) => {
                const accessToken = res.data.result.data.accessToken;
                setUserName(userInfo.id);
                setToken(accessToken);
                navigation.navigate("메인페이지", {
                  screen: "메인페이지",
                });
              })
              .catch((err) => {
                const errCode = err.toJSON().status;
                if (errCode === 404)
                  Alert.alert("없는 회원입니다. 회원가입창으로 넘어갑니다.");
              });
          }}
        >
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
  alertTextContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    height: 15,
    width: "44%",
  },
  inputBox: {
    flex: 0.7,
    marginTop: 67,
    marginLeft: 20,
    marginRight: 20, //리넥 마진 적용 극혐;
    marginBottom: 15,
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
  routeText: {
    fontSize: 10,
    lineHeight: 16,
    color: "#a4ccff",
    fontFamily: "Tmoney",
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#0974fa",
    padding: 10,
  },
});
