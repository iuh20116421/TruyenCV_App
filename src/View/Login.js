import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { SocialIcon } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import moment from "moment";

export default function Screen01({ navigation, route }) {
  const [image, setImage] = React.useState(
    "https://github-production-user-asset-6210df.s3.amazonaws.com/96639642/285331479-5c79c492-618b-4157-81b4-d3b7a9c42478.png"
  );
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setModalVisibleRegister(true);
      setImage("https://github-production-user-asset-6210df.s3.amazonaws.com/96639642/285331479-5c79c492-618b-4157-81b4-d3b7a9c42478.png"
      )
    }
  }, [isFocused]);

  const [tk, setTK] = React.useState("");
  const [mk, setmk] = React.useState("");
  const [dataAccount, setdataAccount] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);
  const [modalVisibleLogin, setModalVisibleLogin] = React.useState(false);
  const [modalVisibleRegister, setModalVisibleRegister] = React.useState(true);
  // Hàm xử lý khi checkbox được chọn hoặc bỏ chọn
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Đảo ngược trạng thái của checkbox
  };

  const [isModalVisible, setModalVisible] = React.useState(false);
  function login() {
    fetch("https://86373g-8080.csb.app/accounts")
      .then((response) => response.json())
      .then((data) => {
        setdataAccount(data);
        if (data.find((item) => item.email === tk && item.password === mk)) {
          setModalVisibleLogin(false);
          navigation.navigate("AppChinh", {
            account: data.find(
              (item) => item.email === tk && item.password === mk
            ),
          });
        } else {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 2500); // Đóng modal sau 3 giây
          return;
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Có lỗi xảy ra: ", error);
      });
  }
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
  const [name, setname] = React.useState("");
  const [tkDangKy, setTKDangKy] = React.useState("");
  const [mkDangKy, setmkDangKy] = React.useState("");
  const [isModalVisibleDangKy, setModalDangKy] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const registerAccount = () => {
    if (!name || !tkDangKy || !mkDangKy) {
      setModalDangKy(true);
      setMessage("Vui lòng nhập đầy đủ thông tin");
      setTimeout(() => {
        setModalDangKy(false);
      }, 2500); // Đóng modal sau 3 giây
      return;
    }
    if (!isValidUsername(name)) {
      setModalDangKy(true);
      setMessage(
        "Tên đăng nhập cần ít nhất 4 ký tự, chỉ chấp nhận chữ cái và số."
      );
      setTimeout(() => {
        setModalDangKy(false);
      }, 2500); // Đóng modal sau 3 giây
      return;
    }
    if (!isValidEmail(tkDangKy)) {
      setModalDangKy(true);
      setMessage("Địa chỉ email không hợp lệ!");
      setTimeout(() => {
        setModalDangKy(false);
      }, 2500); // Đóng modal sau 3 giây
      return;
    }
    if (!isValidPassword(mkDangKy)) {
      setModalDangKy(true);
      setMessage(
        "Mật khẩu cần ít nhất 8 ký tự và chứa ít nhất một chữ cái và một số."
      );
      setTimeout(() => {
        setModalDangKy(false);
      }, 2500); // Đóng modal sau 3 giây
      return;
    }

    fetch("https://86373g-8080.csb.app/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: tkDangKy,
        password: mkDangKy,
        name: name,
        vaiTro: "user",
        binhLuan: 0,
        daDoc: 0,
        ngayThamGia: moment().format("YYYY-MM-DD HH:mm:ss"),
        image: image,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý phản hồi từ API
        setModalDangKy(true);
        setMessage("Đăng kí thành công");
        setTimeout(() => {
          setModalDangKy(false);
        }, 2500);
        setTKDangKy("");
        setmkDangKy("");
        setname("");
        setModalVisibleRegister(false);
        setModalVisibleLogin(true);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  };

  return (
    <View style={styles.container}>
      {isModalVisible && (
        <View style={[styles.modal, styles.modalTop]}>
          <Text style={{ color: "white" }}>
            Thông tin đănh nhập hoặc mật khẩu không chính xác
          </Text>
        </View>
      )}
      {isModalVisibleDangKy && (
        <View style={[styles.modal, styles.modalTop]}>
          <Text style={{ color: "white" }}>{message}</Text>
        </View>
      )}
      {/* <FlashMessage position="top" /> */}
      <ImageBackground
        source={require("../../assets/imgTruyen/logo1.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={{ color: "white", fontSize: 22 }}>Welcome</Text>
        {/* Modal đăng ký */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleRegister}
          onRequestClose={() => {
            setModalVisibleRegister(!modalVisibleRegister);
          }}
        >
          <View style={styles.modalContainerRegister}>
            <View style={styles.modalContentRegister}>
              <View style={styles.ViewLogin}>
                <Text
                  style={{ color: "back", fontSize: 20, fontWeight: "bold" }}
                >
                  Register with
                </Text>
                <View
                  style={{
                    width: "85%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "blue",
                      borderRadius: 10,
                    }}
                  >
                    <SocialIcon
                      style={{ width: 30, height: 30 }}
                      iconSize={20}
                      type="facebook"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "blue",
                      borderRadius: 10,
                    }}
                  >
                    <SocialIcon
                      iconColor="black"
                      style={{ width: 30, height: 30 }}
                      iconSize={25}
                      type="apple"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "blue",
                      borderRadius: 10,
                    }}
                  >
                    <SocialIcon
                      style={{ width: 30, height: 30 }}
                      iconSize={20}
                      type="google"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      height: 1,
                      borderWidth: 1,
                      borderBlockColor: "gray",
                    }}
                  ></View>
                  <Text
                    style={{
                      marginHorizontal: 7,
                      marginBottom: "8",
                      fontSize: 19,
                      color: "gr",
                    }}
                  >
                    or
                  </Text>
                  <View
                    style={{
                      width: "40%",
                      height: 1,
                      borderWidth: 1,
                      borderBlockColor: "gray",
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    alignItems: "flex-start",
                    width: "99%",
                    gap: 17,
                    marginTop: 5,
                  }}
                >
                  {/* <Text style={styles.Text}>
              Name
            </Text> */}
            <TouchableOpacity
            onPress={pickImage}
            >
            <Image
              source={{ uri: image }}
              style={{
                marginLeft:110,
                width: "50px",
                height: "50px",
                resizeMode: "contain",
              }}
            />
            </TouchableOpacity>
             
                  <TextInput
                    onChangeText={setname}
                    style={{
                      width: "100%",
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: "gray",
                      paddingHorizontal: 10,
                      color: "gray",
                    }}
                    placeholder="Enter your name"
                  />
                  <TextInput
                    onChangeText={setTKDangKy}
                    style={{
                      width: "100%",
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: "gray",
                      paddingHorizontal: 10,
                      color: "gray",
                    }}
                    placeholder="Enter your email address"
                  />
                  <TextInput
                    onChangeText={setmkDangKy}
                    style={{
                      width: "100%",
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: "gray",
                      paddingHorizontal: 10,
                      color: "gray",
                    }}
                    placeholder="Enter your password"
                  />
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 4,
                          borderWidth: 2,
                          borderColor: "gray",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 8,
                        }}
                        onPress={handleCheckboxChange} // Khi được nhấn, gọi hàm xử lý để thay đổi trạng thái của checkbox
                      >
                        {/* Hiển thị biểu tượng check nếu isChecked là true */}
                        {isChecked ? (
                          <MaterialIcons name="check" size={18} color="black" />
                        ) : null}
                      </TouchableOpacity>
                      <Text style={{ fontSize: 16 }}>
                        I agree with the conditions
                      </Text>
                    </View>

                    {/* Nút đăng nhập/đăng ký */}
                  </View>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: 40,
                      backgroundColor: isChecked
                        ? "rgba(230, 11, 208, 0.92)"
                        : "gray",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                    onPress={isChecked ? registerAccount : null}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {isChecked ? "Register" : "Please agree to conditions"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: 40,
                      borderColor: "rgba(211, 72, 213, 0.43)",
                      borderWidth: 1,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                    onPress={() => {
                      setModalVisibleRegister(false);
                      setModalVisibleLogin(true);
                    }}
                  >
                    <Text
                      style={{
                        color: "rgba(211, 72, 213, 0.43)",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      SIGN IN
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* Modal Login */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleLogin}
          onRequestClose={() => {
            setModalVisibleLogin(!modalVisibleLogin);
          }}
        >
          <View style={styles.modalContainerLogin}>
            <View style={styles.modalContentLogin}>
              <View style={styles.ViewLogin}>
                <Text
                  style={{ color: "back", fontSize: 20, fontWeight: "bold" }}
                >
                  Login with
                </Text>

                <View
                  style={{
                    alignItems: "flex-start",
                    width: "99%",
                    gap: 17,
                    marginTop: 15,
                  }}
                >
                  <TextInput
                    style={{
                      width: "100%",
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: "gray",
                      paddingHorizontal: 10,
                      color: "gray",
                    }}
                    onChangeText={setTK}
                    placeholder="Enter your email address"
                  />
                  <TextInput
                    style={{
                      width: "100%",
                      height: 40,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: "gray",
                      paddingHorizontal: 10,
                      color: "gray",
                    }}
                    onChangeText={setmk}
                    placeholder="Enter your password"
                  />

                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: 40,
                      backgroundColor: "rgba(230, 11, 208, 0.92)",
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                    onPress={login}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      LOGIN
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      height: 40,
                      borderColor: "rgba(211, 72, 213, 0.43)",
                      borderWidth: 1,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                    onPress={() => {
                      setModalVisibleRegister(true);
                      setModalVisibleLogin(false);
                    }}
                  >
                    <Text
                      style={{
                        color: "rgba(211, 72, 213, 0.43)",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      SIGN UP
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 5,
  },
  Text: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 220,
  },
  ViewLogin: {
    width: "100%",
    height: 530,
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
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
  modalContainerRegister: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentRegister: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "80%",
    borderWidth: 1,
    maxHeight: "96%",
    padding: 10,
    alignItems: "center",
  },
  modalContainerLogin: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentLogin: {
    marginTop: 100,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "80%",
    borderWidth: 1,
    maxHeight: "45%",
    padding: 10,
    alignItems: "center",
  },
});
