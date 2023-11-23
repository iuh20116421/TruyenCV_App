import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
export default function App({ route, navigation }) {
  const [TruyenTT, setTruyenTT] = useState([]);
  const [accountInfo, setAccountInfo] = useState([]);
  const [TruyenInfo, setTruyenInfo] = useState([]);
  useEffect(() => {
    fetch(`https://r3kpvw-8080.csb.app/DsTruyen?id=${route.params?.idTruyenTT}`)
      .then((response) => response.json())
      .then((data) => {
        setTruyenTT(data);
        const TruyenPromises = data.map(() =>
          fetch(
            `https://r3kpvw-8080.csb.app/BinhLuan?id_Truyen=${route.params?.idTruyenTT}`
          ).then((response) => response.json())
        );

        Promise.all(TruyenPromises)
          .then((TruyenData) => {
            setTruyenInfo(TruyenData);
            TruyenData.forEach((binhLuan, index) => {
              const accountPromises = binhLuan.map((item) =>
                fetch(
                  `https://r3kpvw-8080.csb.app/accounts?id=${item.id_account}`
                ).then((response) => response.json())
              );

              Promise.all(accountPromises)
                .then((accountData) => {
                  // accountData chứa thông tin tài khoản tương ứng với bình luận tại index
                  setAccountInfo((prevAccountInfo) => [
                    ...prevAccountInfo,
                    accountData,
                  ]); // Kiểm tra dữ liệu tài khoản trả về từ API
                })
                .catch((error) => {
                  console.error(
                    "Có lỗi xảy ra khi lấy thông tin tài khoản: ",
                    error
                  );
                });
            });
          })
          .catch((error) => {
            console.error("Có lỗi xảy ra khi lấy thông tin tài khoản: ", error);
          });
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Có lỗi xảy ra: ", error);
      });
  }, []);
  const [danhGia, setDanhGia] = useState(0);
  const handleDanhGia = () => {
    setDanhGia(0);
  };
  const [tomTat, settomTat] = useState(false);
  const [moTaHeight, setMoTaHeight] = useState(100);
  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <FlatList
        data={TruyenTT}
        renderItem={({ item, index }) => {
          const currentAccounts = accountInfo[index] || [];
          return (
            <View style={styles.scrollView}>
              <View style={styles.AnhvaTen}>
                <Image
                  style={{
                    width: "60%",
                    height: "75%",
                    resizeMode: "contain",
                  }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 21,
                    textAlign: "center",
                    paddingTop: 10,
                  }}
                >
                  {item.ten}
                </Text>
              </View>
              <View style={styles.TTTruyen}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>Tác giả:</Text>
                  <Text
                    style={{
                      color: "#FF8247",
                      fontSize: 18,
                      paddingLeft: 10,
                    }}
                  >
                    {item.tacGia}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Trạng thái:
                  </Text>
                  <Text
                    style={{ color: "white", fontSize: 18, paddingLeft: 10 }}
                  >
                    {item.trangThai}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Thể loại:
                  </Text>
                  <Text
                    style={{
                      color: "#FF8247",
                      fontSize: 18,
                      paddingLeft: 10,
                    }}
                  >
                    {item.theLoai}
                  </Text>
                </View>
                <Text style={{ color: "white", fontSize: 18 }}>
                  Số chương: {item.soChuong}
                  {"\n"}Ngày đăng: {item.ngayDang}
                  {"\n"}Ngày cập nhật: {item.ngayCapNhat}
                  {"\n"}Lượt đọc: {item.luotDoc}
                  {"\n"}Nguồn: {item.nguon}
                </Text>
              </View>
              <Text style={{ color: "white", fontSize: 14 }}>
                Nhấn vào ngôi sao để chọn số lượng sao đánh giá
              </Text>
              <View style={styles.ViewDanhGia}>
                <TouchableOpacity
                  onPress={() => {
                    setDanhGia(1);
                  }}
                  style={styles.Sao}
                >
                  <Ionicons
                    name="ios-star-outline"
                    size={24}
                    color={danhGia >= 1 ? "#00ffff" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDanhGia(2);
                  }}
                  style={styles.Sao}
                >
                  <Ionicons
                    name="ios-star-outline"
                    size={24}
                    color={danhGia >= 2 ? "#00ffff" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDanhGia(3);
                  }}
                  style={styles.Sao}
                >
                  <Ionicons
                    name="ios-star-outline"
                    size={24}
                    color={danhGia >= 3 ? "#00ffff" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDanhGia(4);
                  }}
                  style={styles.Sao}
                >
                  <Ionicons
                    name="ios-star-outline"
                    size={24}
                    color={danhGia >= 4 ? "#00ffff" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDanhGia(5);
                  }}
                  style={styles.Sao}
                >
                  <Ionicons
                    name="ios-star-outline"
                    size={24}
                    color={danhGia >= 5 ? "#00ffff" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    showMessage({
                      message: "Đã gửi đánh giá!",
                      type: "info",
                      duration: 3000, // Thời gian tồn tại của thông báo, tính bằng millisecond
                    });
                    handleDanhGia();
                  }}
                  style={styles.GuiDanhGia}
                >
                  <Text style={{ color: "white" }}>Gửi đánh giá</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ViewBLDG}>
                <View style={styles.ViewBLDGCon}>
                  <FontAwesome name="commenting-o" size={22} color="white" />
                  <Text style={styles.ViewBLDGText}>Bình luận {`(${currentAccounts.length})`}</Text>  

                </View>
                <View style={styles.ViewBLDGCon}>
                  <MaterialIcons
                    name="favorite-border"
                    size={22}
                    color="white"
                  />
                  <Text style={styles.ViewBLDGText}>Đánh giá {"()"}</Text>
                </View>
                <TouchableOpacity style={styles.ViewBLDGCon}>
                  <Octicons name="report" size={22} color="white" />
                  <Text style={styles.ViewBLDGText}>Báo cáo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.MoTa}>
                <Text style={{ color: "white", fontSize: 18 }}>
                  {tomTat ? item.TomTat : `${item.TomTat.slice(0, 100)}...`}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    settomTat(!tomTat);
                    setMoTaHeight(tomTat ? 100 : null); // Đặt chiều cao là null để mở rộng tự động
                  }}
                >
                  <Text style={{ color: "#FFC125", fontSize: 14 }}>
                    {tomTat ? "Thu nhỏ" : "Xem thêm"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ViewTatCaBinhLuan}>
                <Text style={{ color: "white", fontSize: 18 }}>
                  Các bình luận mới nhất
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("DsBinhLuan", { idTruyenBL: item.id, account: route.params?.account });
                  }}
                >
                  <Text style={{ color: "#FFC125" }}>Xem toàn bộ</Text>
                </TouchableOpacity>
              </View>
              {/* Danh sách bình luận mới */}

              {currentAccounts.slice(0,4).map((currentAccount, idx) => (
                <View
                  style={{
                    width: "93%",
                    height: null,
                    flexDirection: "row",
                    justifyContent:'center'
                  }}
                  key={idx}
                >
                  <Image
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 50,
                      marginRight: 15,
                    }}
                    source={{
                      uri: currentAccount[index].image,
                    }}
                  />
                  <View
                    style={{
                      marginTop: 20,
                      width: "87%",
                      height: null,
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>
                      {currentAccount[index].name}
                    </Text>
                    <View
                        style={{
                          width: "95%",
                          height: null,
                          backgroundColor: "rgba(17, 33, 39, 0.92)",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            padding: 10,
                            paddingBottom: 0,
                          }}
                        >
                            {TruyenInfo[index][idx].noiDung}{" "}
                        </Text>
                        <View>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              padding: 10,
                              textAlign: "right",
                            }}
                          >
                             {TruyenInfo[index][idx].ngayBinhLuan}{" "}
                          </Text>
                        </View>
                      </View>
                   
                  </View>
                </View>
              ))}
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()} // Đảm bảo key unique cho mỗi item
      />

      <View style={styles.ViewBottom}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="md-close" size={45} color="#FFC125" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.NutDoc}
          onPress={() => {
            navigation.navigate("Noidung", { idTruyen: route.params?.idTruyenTT, account: route.params?.account });
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>Đọc Truyện</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="md-download-outline" size={38} color="#FFC125" />
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
    justifyContent: "flex-end",
    backgroundColor: "#111111",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  AnhvaTen: {
    backgroundColor: "#222222",
    width: "90%",
    height: 300,
    alignItems: "center",
  },
  TTTruyen: {
    backgroundColor: "#222222",
    width: "90%",
    height: 230,
    padding: 10,
  },
  ViewDanhGia: {
    flexDirection: "row",
    width: "90%",
    height: 60,
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  Sao: {
    padding: 5,
  },
  GuiDanhGia: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFC125",
    width: 115,
    height: 45,
  },
  ViewBLDG: {
    backgroundColor: "#222222",
    width: "90%",
    height: 60,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  ViewBLDGCon: {
    width: "33%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ViewBLDGText: {
    color: "white",
  },
  MoTa: {
    backgroundColor: "#222222",
    width: "90%",
    height: null,
    gap: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
  },
  ViewTatCaBinhLuan: {
    width: "90%",
    height: null,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  ViewBottom: {
    flexDirection: "row",
    width: "90%",
    height: "60px",
    justifyContent: "space-around",
    alignItems: "center",
  },
  NutDoc: {
    borderRadius: 8,
    width: 230,
    height: "100%",
    backgroundColor: "#FFC125",
    justifyContent: "center",
    alignItems: "center",
  },
});
