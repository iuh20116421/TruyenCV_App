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
import FlashMessage, { showMessage } from "react-native-flash-message";
import { MaterialIcons } from "@expo/vector-icons";

export default function Screen01({ navigation }) {
  const [tk, setTK] = React.useState("");
  const [mk, setmk] = React.useState("");
  const [name, setName] = React.useState("");
  const registerAccount = () => {
    fetch("https://f56tg4-8080.csb.app/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: tk, password: mk, name: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý phản hồi từ API
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        Đăng ký tài khoản Truyện CV !
      </Text>
      <Image
        source={require("../../assets/imgTruyen/Logo.png")}
        style={{
          marginTop: 20,
          width: "170px",
          height: "170px",
          marginBottom: 20,
        }}
      />
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
        <TextInput
          onChangeText={(text) => setName(text)}
          style={{
            width: "100%",
            height: "45px",
            borderRadius: "10px",
            borderColor: "black",
            color: "black",
          }}
          placeholder="Enter your name"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          margin: 10,
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

      <TouchableOpacity
        onPress={() => {
          if (tk && mk && name) {
            registerAccount();
          } else {
            showMessage({
              message: "Thông báo",
              description: "Vui lòng nhập đầy đủ thông tin",
              type: "danger",
            });
          }
        }}
        style={{
          backgroundColor: "blue",
          borderRadius: "10px",
          width: "90%",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
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
