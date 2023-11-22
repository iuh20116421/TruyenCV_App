import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
export default function Screen01({ navigation, route }) {
  const [tk, setTK] = React.useState("");
  const [mk, setmk] = React.useState("");
  const [dataAccount, setdataAccount] = React.useState([]);
  // Hàm giúp kiểm tra regex(tính hợp lệ-ràng buộc) cho email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm giúp kiểm tra regex(tính hợp lệ-ràng buộc) cho mật khẩu
  const isValidPassword = (password) => {
    // Ví dụ: Ràng buộc mà tôi yêu cầu là ít nhất 8 ký tự và phải chứa ít nhất một chữ cái và một số
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  function login() {
    if (!isValidEmail(tk)) {
      showMessage({
        message: "Địa chỉ email không hợp lệ!",
        type: "info",
        duration: 3000,
      });
      return;
    }

    if (!isValidPassword(mk)) {
      showMessage({
        message: "Mật khẩu không hợp lệ! Mật khẩu cần ít nhất 8 ký tự và chứa ít nhất một chữ cái và một số.",
        type: "info",
        duration: 3000,
      });
      return;
    }
        fetch("https://f56tg4-8080.csb.app/accounts")
          .then((response) => response.json())
          .then((data) => {
            setdataAccount(data);
            if (data.find(
                (item) => item.email === tk && item.password === mk
              )) {
                navigation.navigate("AppChinh", { account: data.find(
                  (item) => item.email === tk && item.password === mk
                ) });
              } else {
                showMessage({
                  message: "Tài khoản hoặc mật khẩu không chính xác!!!",
                  type: "info",
                  duration: 3000, // Thời gian tồn tại của thông báo, tính bằng millisecond
                });
            
              }
          })
          .catch((error) => {
            // Xử lý lỗi nếu có
            console.error("Có lỗi xảy ra: ", error);
          });
  }
  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <Text
        style={{
          fontSize: 29,
          fontWeight: "bold",
          marginTop: 20,
          color: "black",
        }}
      >
        Well Come to !
      </Text>
      <Text style={{ fontSize: 17, marginTop: 10, color: "black" }}>
        Truyện CV application.
      </Text>
      <Image
        source={require("../../assets/imgTruyen/Logo.png")}
        style={{ marginTop: 20, width: "170px", height: "170px" }}
      />
      <TouchableOpacity
        style={{
          margin: 20,
          borderWidth: 1,
          borderRadius: "10px",
          width: "90%",
          height: "45px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderColor: "black",
        }}
      >
        <MaterialIcons name="email" size={22} color="black" />
        <TextInput
          onChangeText={setTK}
          style={{
            width: "90%",
            height: "45px",
            borderRadius: "10px",
            color: "black",
          }}
          placeholder="Enter your email address"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: "10px",
          width: "90%",
          height: "45px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderColor: "black",
        }}
      >
        <MaterialIcons name="lock" size={22} color="black" />
        <TextInput
          onChangeText={setmk}
          style={{
            width: "85%",
            height: "45px",
            borderRadius: "10px",
            color: "black",
          }}
          placeholder="Enter your password"
        />
        <TouchableOpacity>
          <MaterialIcons name="remove-red-eye" size={22} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={{ marginVertical: "20px", width: "90%", alignItems: "flex-end" }}
      >
        <TouchableOpacity>
          <Text style={{ color: "blue" }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          login();
        }}
        style={{
          backgroundColor: "blue",
          borderRadius: "10px",
          width: "90%",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "black", fontSize: "20px" }}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DangKy");
        }}
        style={{
          backgroundColor: "red",
          borderRadius: "10px",
          width: "30%",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 230,
        }}
      >
        <Text style={{ color: "black", fontSize: "20px" }}>Register</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "40%",
            height: 1,
            borderWidth: 1,
            borderBlockColor: "black",
          }}
        ></View>
        <Text style={{ marginHorizontal: 7, fontSize: 19, color: "black" }}>
          or
        </Text>
        <View
          style={{
            width: "40%",
            height: 1,
            borderWidth: 1,
            borderBlockColor: "black",
          }}
        ></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "50%",
          height: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../../assets/imgTruyen/google.png")}
            style={{
              margin: 5,
              width: "40px",
              height: "40px",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/imgTruyen/face.png")}
            style={{
              margin: 5,
              width: "40px",
              height: "40px",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/imgTruyen/apple.png")}
            style={{
              margin: 5,
              width: "40px",
              height: "40px",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
