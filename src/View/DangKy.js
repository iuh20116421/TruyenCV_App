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

// Hàm kiểm tra regex(ràng buộc) cho tên đăng nhập
const isValidUsername = (username) => {
  // Chỉ chấp nhận chữ cái và số, ít nhất 5 ký tự
  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
  return usernameRegex.test(username);
};

// Hàm kiểm tra regex(ràng buộc) cho email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Hàm kiểm tra regex(ràng buộc) cho mật khẩu
const isValidPassword = (password) => {
  // Ví dụ: Ràng buộc mà tôi yêu cầu là ít nhất 8 ký tự và chứa ít nhất một chữ cái và một số
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};
export default function Screen01({ navigation }) {
  const [tk, setTK] = React.useState("");
  const [mk, setmk] = React.useState("");
  const [name, setName] = React.useState("");
  const [isModalVisible, setModalVisible] = React.useState(false);
  const[message,setMessage]=React.useState("");
  const registerAccount = () => {
    if (!name || !tk || !mk) {
      setModalVisible(true);
      setMessage("Vui lòng nhập đầy đủ thông tin");
      setTimeout(() => {
        setModalVisible(false);
      }, 2500); // Đóng modal sau 3 giây
      return;
      showMessage({
        message: "Thông báo",
        description: "Vui lòng nhập đầy đủ thông tin",
        type: "danger",
      });
      return;
    }
    if (!isValidUsername(name)) {
      setModalVisible(true);
      setMessage("Tên đăng nhập cần ít nhất 4 ký tự, chỉ chấp nhận chữ cái và số.");
      setTimeout(() => {
        setModalVisible(false);
      }, 2500); // Đóng modal sau 3 giây
      return;
      showMessage({
        message: "Tên đăng nhập không hợp lệ! Tên đăng nhập cần ít nhất 4 ký tự, chỉ chấp nhận chữ cái và số.",
        type: "info",
        duration: 3000,
      });
      console.error("Invalid username. Tên đăng nhập cần ít nhất 4 ký tự, chỉ chấp nhận chữ cái và số.");
      return;
    }

    if (!isValidEmail(tk)) {
      setModalVisible(true);
      setMessage("Địa chỉ email không hợp lệ!");
      setTimeout(() => {
        setModalVisible(false);
      }, 2500); // Đóng modal sau 3 giây
      return;
      showMessage({
        message: "Địa chỉ email không hợp lệ!",
        type: "info",
        duration: 3000,
      });
      console.error("Invalid email");
      return;
    }

    if (!isValidPassword(mk)) {
      setModalVisible(true);
      setMessage("Mật khẩu cần ít nhất 8 ký tự và chứa ít nhất một chữ cái và một số.");
      setTimeout(() => {
        setModalVisible(false);
      }, 2500); // Đóng modal sau 3 giây
      return;
      showMessage({
        message: "Mật khẩu không hợp lệ! Mật khẩu cần ít nhất 8 ký tự và chứa ít nhất một chữ cái và một số.",
        type: "info",
        duration: 3000,
      });
      console.error("Invalid password. Mật khẩu cần ít nhất 8 ký tự và chứa ít nhất một chữ cái và một số.");
      return;
    }

    fetch("https://r3kpvw-8080.csb.app/accounts", {
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
      {isModalVisible && (
          <View style={[styles.modal, styles.modalTop]}>
           <Text style={{color:'white'}}>{message}</Text>
          </View>
        )}
      {/* <FlashMessage position="top" /> */}
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
         
            registerAccount();
         
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
        <Text style={{ color: "white", fontSize: "21px" }}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
         
           navigation.goBack();
         
        }}
        style={{
          backgroundColor: "red",
          borderRadius: "10px",
          width: "90%",
          height: "40px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "white", fontSize: "21px" }}>Bạn đã có tài khoản? Đăng nhập</Text>
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
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 70,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "rgba(58, 196, 239, 1)",
    zIndex: 1000, // Đảm bảo modal nằm trên cùng
  },
  modalTop: {
    top: 0,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  },
});
