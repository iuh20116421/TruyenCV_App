import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";
export default function App({ route, navigation }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const danhmuc = [
    {
      name: "Tiên Hiệp",
    },
    {
      name: "Huyền Nhuyễn",
    },
    {
      name: "Khoa Huyễn",
    },
    {
      name: "Võng Du",
    },
    {
      name: "Đô Thị",
    },
    {
      name: "Đồng Nhân",
    },
    {
      name: "Dã Sử",
    },
    {
      name: "Cạnh Kỹ",
    },
    {
      name: "Huyền Nghi",
    },
    {
      name: "Kiếm Hiệp",
    },
    {
      name: "Kỳ Ảo",
    },
  ];
  const [dataTruyen, setDataTruyen] = useState([]);
  const [tenTruyen, setTenTruyen] = useState("");
  useEffect(() => {
    fetch(
      `https://86373g-8080.csb.app/SangTacNhap?id=${route.params?.idTruyenSua}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataTruyen(data);
        setTenTruyen(data.map((item) => item.ten));
        setTenTacGia(data.map((item) => item.tacGia));
        setTenTruyen(data.map((item) => item.ten));
        setMoTa(data.map((item) => item.TomTat));
        setNoiDung(data.map((item) => item.noiDung));
        setTheLoai(data.map((item) => item.theLoai));
        setNgayDang(data.map((item) => item.ngayDang));
        setNguon(data.map((item) => item.nguon));
        setXuatBan(data.map((item) => item.xuatBan));
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }, []);

  const [image, setImage] = useState(null);
  const [tenTacGia, setTenTacGia] = useState("");
  const [ngayDang, setNgayDang] = useState("");
  const [moTa, setMoTa] = useState("");
  const [NoiDung, setNoiDung] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [theLoai, setTheLoai] = useState("");
  const [nguon, setNguon] = useState("");
  const [xuatBan, setXuatBan] = useState("");

  const [modalVisibleTheLoai, setModalVisibleTheLoai] = useState(false);
  const [modalVisibleMota, setModalVisibleMota] = useState(false);

  const [shortDescription, setShortDescription] = useState(true);
  const [moTaHeight, setMoTaHeight] = useState(70);

  const [modalVisibleNoiDung, setModalVisibleNoiDung] = useState(false);
  const [shortDescriptionNoiDung, setShortDescriptionNoiDung] = useState(true);
  const [NoiDungHeight, setNoiDungHeight] = useState(70);
  function handelPressXuatBan() {
    fetch("https://86373g-8080.csb.app/DsTruyen")
      .then((response) => response.json())
      .then((data) => {
        // Tìm kiếm truyện trong danh sách
        const existingTruyen = data.find(
          (item) => item.idTruyenNhap === route.params?.idTruyenSua
        );
        // if(typeof tenTruyen === 'string'){

        // }
        if (!existingTruyen) {
          // Truyện chưa có trong danh sách, thực hiện POST

          fetch("https://86373g-8080.csb.app/DsTruyen", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image:
                "https://github-production-user-asset-6210df.s3.amazonaws.com/96639642/285331479-5c79c492-618b-4157-81b4-d3b7a9c42478.png",
              ten:
                typeof tenTruyen === "string"
                  ? tenTruyen
                  : tenTruyen.join(", "),
              tacGia:
                typeof tenTacGia === "string"
                  ? tenTacGia
                  : tenTacGia.join(", "),
              soChuong: 0,
              ngayDang:
                typeof ngayDang === "string" ? ngayDang : ngayDang.join(", "),
              ngayCapNhat: moment().format("YYYY-MM-DD HH:mm:ss"),
              luotDoc: 0,
              nguon: typeof nguon === "string" ? nguon : nguon.join(", "),
              theLoai:
                typeof theLoai === "string" ? theLoai : theLoai.join(", "),
              loaiTruyen: "Sáng tác",
              trangThai: "Đang ra",
              noiDung:
                typeof NoiDung === "string" ? NoiDung : NoiDung.join(", "),
              TomTat: typeof moTa === "string" ? moTa : moTa.join(", "),
              idTruyenNhap: route.params?.idTruyenSua,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              handlePressUpdateTruyen(route.params?.idTruyenSua);
            })
            .catch((error) => {
              console.error("Có lỗi xảy ra khi thêm mới truyện: ", error);
            });
        } else {
          // Truyện đã tồn tại trong danh sách, thực hiện PUT hoặc PATCH
          // Thực hiện cập nhật truyện có sẵn
          fetch(`https://86373g-8080.csb.app/dsTruyen/${existingTruyen.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image:
                "https://github-production-user-asset-6210df.s3.amazonaws.com/96639642/285331479-5c79c492-618b-4157-81b4-d3b7a9c42478.png",
              ten:
                typeof tenTruyen === "string"
                  ? tenTruyen
                  : tenTruyen.join(", "),
              tacGia:
                typeof tenTacGia === "string"
                  ? tenTacGia
                  : tenTacGia.join(", "),
              soChuong: 0,
              ngayDang:
                typeof ngayDang === "string" ? ngayDang : ngayDang.join(", "),
              ngayCapNhat: moment().format("YYYY-MM-DD HH:mm:ss"),
              luotDoc: 0,
              nguon: typeof nguon === "string" ? nguon : nguon.join(", "),
              theLoai:
                typeof theLoai === "string" ? theLoai : theLoai.join(", "),
              loaiTruyen: "Sáng tác",
              trangThai: "Đang ra",
              noiDung:
                typeof NoiDung === "string" ? NoiDung : NoiDung.join(", "),
              TomTat: typeof moTa === "string" ? moTa : moTa.join(", "),
              idTruyenNhap: route.params?.idTruyenSua,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              handlePressUpdateTruyen(route.params?.idTruyenSua);
            })
            .catch((error) => {
              console.error("Có lỗi xảy ra khi cập nhật truyện: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi kiểm tra truyện: ", error);
      });
  }
  function handlePressXoaTruyen() {
    fetch(`https://86373g-8080.csb.app/dsTruyen/${route.params?.idTruyenSua}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý phản hồi từ API
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }
  function handlePressUpdateTruyen(id) {
    fetch(`https://86373g-8080.csb.app/SangTacNhap/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        xuatBan: "Đã xuất bản",
        image:
          "https://github-production-user-asset-6210df.s3.amazonaws.com/96639642/285331479-5c79c492-618b-4157-81b4-d3b7a9c42478.png",
        ten: typeof tenTruyen === "string" ? tenTruyen : tenTruyen.join(", "),
        tacGia:
          typeof tenTacGia === "string" ? tenTacGia : tenTacGia.join(", "),
        soChuong: 0,
        ngayDang: typeof ngayDang === "string" ? ngayDang : ngayDang.join(", "),
        ngayCapNhat: moment().format("YYYY-MM-DD HH:mm:ss"),
        luotDoc: 0,
        nguon: typeof nguon === "string" ? nguon : nguon.join(", "),
        theLoai: typeof theLoai === "string" ? theLoai : theLoai.join(", "),
        loaiTruyen: "Sáng tác",
        trangThai: "Đang ra",
        noiDung: typeof NoiDung === "string" ? NoiDung : NoiDung.join(", "),
        TomTat: typeof moTa === "string" ? moTa : moTa.join(", "),
        idTruyenNhap: route.params?.idTruyenSua,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý phản hồi từ API
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }
  function handlePressUpdateTruyenChuaXuatBan(id) {
    fetch(`https://86373g-8080.csb.app/SangTacNhap/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image:
          "https://github-production-user-asset-6210df.s3.amazonaws.com/96639642/285331479-5c79c492-618b-4157-81b4-d3b7a9c42478.png",
        ten: typeof tenTruyen === "string" ? tenTruyen : tenTruyen.join(", "),
        tacGia:
          typeof tenTacGia === "string" ? tenTacGia : tenTacGia.join(", "),
        soChuong: 0,
        ngayDang: typeof ngayDang === "string" ? ngayDang : ngayDang.join(", "),
        ngayCapNhat: moment().format("YYYY-MM-DD HH:mm:ss"),
        luotDoc: 0,
        nguon: typeof nguon === "string" ? nguon : nguon.join(", "),
        theLoai: typeof theLoai === "string" ? theLoai : theLoai.join(", "),
        loaiTruyen: "Sáng tác",
        trangThai: "Đang ra",
        noiDung: typeof NoiDung === "string" ? NoiDung : NoiDung.join(", "),
        TomTat: typeof moTa === "string" ? moTa : moTa.join(", "),
        idTruyenNhap: route.params?.idTruyenSua,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý phản hồi từ API
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.ViewTop}>
        <TouchableOpacity
          onPress={() => {
            handlePressUpdateTruyenChuaXuatBan(route.params?.idTruyenSua);
          }}
        >
          <Ionicons name="chevron-back-outline" size={40} color="#FFCC33" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 26,
            color: "#FFCC33",
            marginLeft: 15,
            marginRight: 140,
          }}
        >
          Xong
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleTheLoai}
        onRequestClose={() => {
          setModalVisibleTheLoai(!modalVisibleTheLoai);
        }}
      >
        <View style={styles.modalContainerTheLoai}>
          <View style={styles.modalContentTheLoai}>
            <Text
              style={{ fontSize: 20, marginBottom: 20, textAlign: "center" }}
            >
              Chọn Thể Loại
            </Text>
            <FlatList
              data={danhmuc}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setTheLoai(item.name);
                    setModalVisibleTheLoai(false);
                  }}
                >
                  <Text style={{ fontSize: 18, marginBottom: 10 }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisibleTheLoai(false)}
              style={{ marginTop: 20 }}
            >
              <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        style={{
          width: "100%",
          height: "900%",
          padding: 15,
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "97%",
            height: 270,
            alignItems: "center",
            backgroundColor: "#222222",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 60,
            }}
          >
            <Image
              source={require("../../assets/imgTruyen/Logo.png")}
              style={{
                width: "170px",
                height: "170px",
                resizeMode: "contain",
              }}
            />
            <TextInput
              onChangeText={setTenTruyen}
              value={tenTruyen}
              style={{
                color: "#FFCC33",
                fontSize: 18,
                marginTop: 15,
                fontWeight: "bold",
              }}
            />
          </View>

          <TouchableOpacity
            onPress={pickImage}
            style={{
              marginTop: 10,
              borderRadius: 10,
              width: 50,
              height: 30,
              backgroundColor: "#FFCC33",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 21, color: "white" }}>Sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ViewTen}>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Tác giả:</Text>
            <TextInput
              onChangeText={(text) => setTenTacGia(text)}
              value={tenTacGia}
              style={{ color: "#FFCC33", fontSize: 18, fontWeight: "bold" }}
            />
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Trạng thái:</Text>
            <Text style={styles.Text2}>Đang ra</Text>
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Thể loại:</Text>
            <TouchableOpacity onPress={() => setModalVisibleTheLoai(true)}>
              <Text
                style={[styles.Text, { color: "#FFCC33", fontWeight: "bold" }]}
              >
                {theLoai}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Ngày đăng:</Text>
            <Text style={styles.Text2}>{ngayDang}</Text>
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Lượt đọc:</Text>
            <Text style={styles.Text2}>0</Text>
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.Text}>Trạng thái truyện:</Text>
            <Text
              style={[
                styles.Text,
                { color: xuatBan == "Đã xuất bản" ? "#4876FF" : "red" },
              ]}
            >
              {xuatBan}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
            onPress={() => {
              handelPressXuatBan();
            }}
          >
            <Text
              style={[
                styles.Text,
                { color: "#FFCC33", fontWeight: "bold", textAlign: "center" },
              ]}
            >
              Xuất Bản
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.ViewMoTa, height: moTaHeight }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.Text}>
              {shortDescription ? `${moTa.slice(0, 20)}...` : moTa}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShortDescription(!shortDescription);
                setMoTaHeight(shortDescription ? null : 70);
              }}
            >
              <Text
                style={[styles.Text, { color: "#FFCC33", fontWeight: "bold" }]}
              >
                {shortDescription ? "Xem thêm" : "Thu gọn"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisibleMota(true);
            }}
            style={{
              marginTop: 10,
              borderRadius: 10,
              width: 50,
              height: 30,
              backgroundColor: "#FFCC33",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 21, color: "white" }}>Sửa</Text>
          </TouchableOpacity>
        </View>
        {/* Nội dung */}
        <View style={{ ...styles.ViewMoTa, height: NoiDungHeight }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.Text}>
              {shortDescriptionNoiDung ? `${NoiDung.slice(0, 20)}...` : NoiDung}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShortDescriptionNoiDung(!shortDescriptionNoiDung);
                setNoiDungHeight(shortDescriptionNoiDung ? null : 70);
              }}
            >
              <Text
                style={[styles.Text, { color: "#FFCC33", fontWeight: "bold" }]}
              >
                {shortDescriptionNoiDung ? "Xem thêm" : "Thu gọn"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              setModalVisibleNoiDung(true);
            }}
            style={{
              marginTop: 10,
              borderRadius: 10,
              width: 50,
              height: 30,
              backgroundColor: "#FFCC33",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 21, color: "white" }}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMota}
        onRequestClose={() => {
          setModalVisibleMota(!modalVisibleMota);
        }}
      >
        <View style={styles.modalContainerTheLoai}>
          <View style={styles.modalContentTheLoai}>
            <Text
              style={{ fontSize: 20, marginBottom: 20, textAlign: "center" }}
            >
              Nhập Mô Tả
            </Text>
            <TextInput
              value={moTa}
              multiline={true}
              numberOfLines={5}
              onChangeText={(text) => setMoTa(text)}
              style={{
                height: 90,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
              }}
              placeholder="Nhập thông tin mới"
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity onPress={() => setModalVisibleMota(false)}>
                <Text style={{ fontSize: 18, color: "red" }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleMota(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#FFCC33" }}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal nội dung */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleNoiDung}
        onRequestClose={() => {
          setModalVisibleNoiDung(!modalVisibleNoiDung);
        }}
      >
        <View style={styles.modalContainerTheLoai}>
          <View style={styles.modalContentTheLoai}>
            <Text
              style={{ fontSize: 20, marginBottom: 20, textAlign: "center" }}
            >
              Nhập nội dung
            </Text>
            <TextInput
              value={NoiDung}
              multiline={true}
              numberOfLines={50}
              onChangeText={(text) => setNoiDung(text)}
              style={{
                height: 500,
                borderColor: "gray",
                borderWidth: 1,
                marginBottom: 20,
                paddingHorizontal: 10,
              }}
              placeholder="Nhập thông tin mới"
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity onPress={() => setModalVisibleNoiDung(false)}>
                <Text style={{ fontSize: 18, color: "red" }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleNoiDung(false);
                }}
              >
                <Text style={{ fontSize: 18, color: "#FFCC33" }}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#111111",
  },
  ViewMoTa: {
    marginTop: 20,
    width: "97%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    padding: 17,
    backgroundColor: "#222222",
  },

  Text: {
    fontSize: 18,
    color: "gray",
  },
  Text2: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
  },
  ViewChu: {
    flexDirection: "row",
    gap: 15,
  },
  ViewTen: {
    marginTop: 20,
    width: "97%",
    height: 200,
    alignItems: "flex-start",
    padding: 17,
    backgroundColor: "#222222",
  },
  ViewTop: {
    width: "100%",
    backgroundColor: "#111111",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderColor: "gray",
  },
  modalContainerTheLoai: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentTheLoai: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
});
