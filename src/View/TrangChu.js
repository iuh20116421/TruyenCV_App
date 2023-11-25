import { StatusBar } from "expo-status-bar";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const danhmuc = [
  {
    name: "Truyện CV",
  },
  {
    name: "Truyện Sáng Tác",
  },
  {
    name: "Truyện Đọc Nhiều",
  },
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

function DanhMuc({ navigation, route }) {
  function handleTruyen(truyen) {
    if (
      truyen === "Truyện CV" ||
      truyen === "Truyện Sáng Tác" ||
      truyen === "Truyện Đọc Nhiều"
    ) {
      navigation.navigate("DanhMucLoaiTruyen", {
        loaiTruyen: truyen,
        account: route.params?.account,
      });
    } else {
      navigation.navigate("DanhMucTLTruyen", {
        loaiTruyen: truyen,
        account: route.params?.account,
      });
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111111",
      }}
    >
      <FlatList
        style={{ width: "100%" }}
        data={danhmuc}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: "50%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => handleTruyen(item.name)}
                style={{
                  width: "90%",
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                  borderRadius: 7,
                  backgroundColor: "rgba(17, 33, 39, 0.92)",
                }}
              >
                <Text
                  style={{ fontSize: 20, color: "white", textAlign: "center" }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

function CuaBan({ navigation, route }) {
  const [dsTruyenDangViet, setdsTruyenDangViet] = useState([]);
  const isFocused = useIsFocused();
  const [showModalBottom, setShowModalBottom] = useState(false);
  const[idTruyenSua, setidTruyenSua] = useState();
  const [deleten, setdeleten] = useState("");
  useEffect(() => {
    if (isFocused) {
      fetch(`https://86373g-8080.csb.app/SangTacNhap`)
        .then((response) => response.json())
        .then((data) => {
          setdsTruyenDangViet(data);
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Có lỗi xảy ra: ", error);
        });
    }
  }, [isFocused,deleten]);
  function handlePressXoaTruyen(id){
    fetch(`https://86373g-8080.csb.app/SangTacNhap/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Xử lý phản hồi từ API sau khi xóa thành công
        setShowModalBottom((prev) => !prev);
        setdeleten(id);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.ViewFlatlis}>
        <TouchableOpacity
          style={styles.dstruyen}
          onPress={() => {
            setidTruyenSua(item.id);
            setShowModalBottom((prev) => !prev);
          }}
        >
          <View style={styles.ImageTruyen}>
            <Image source={{ uri: item.image }} style={styles.ImageTruyen} />
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.TexTTen}>{item.ten}</Text>
            <Text style={styles.Textduoi}>
              {item.tacGia}
              {"\n"}
              {item.trangThai}
              {"\n"}
              {item.ngayCapNhat}
            </Text>
            <Text style={[styles.Textduoi,{color: item.xuatBan=='Đã xuất bản'?'#4876FF':'#FF4500' }]}>
              {item.xuatBan}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#111111",
      }}
    >
      <FlatList
        style={{ width: "100%" }}
        data={dsTruyenDangViet}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("VietTruyen", { account: route.params?.account })
        }
        style={{
          borderRadius: 10,
          width: "90%",
          height: 50,
          backgroundColor: "#FFCC33",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 21, color: "white" }}>Viết truyện mới </Text>
      </TouchableOpacity>
      {showModalBottom && (
        <View style={[styles.modal, styles.modalBottom]}>
          <TouchableOpacity
          onPress={() => {
            setShowModalBottom((prev) => !prev);
            navigation.navigate("SuaTruyen", { idTruyenSua: idTruyenSua, account: route.params?.account  })
          }}
          style={{width:'100%', paddingBottom: 5, alignItems:'center',justifyContent:'center',borderBottomWidth:1  }}>
            <Text style={{ fontSize: 22, color: "blue" }}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
            handlePressXoaTruyen(idTruyenSua)
          }}
          style={{width:'100%', paddingBottom: 5, alignItems:'center',justifyContent:'center',borderBottomWidth:1  }}>
            <Text style={{ fontSize: 22, color: "red" }}>Xóa truyện</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
            setShowModalBottom((prev) => !prev);
          }}
          style={{width:'100%', paddingBottom: 5, alignItems:'center',justifyContent:'center',borderBottomWidth:1  }}>
            <Text style={{ fontSize: 22, color: "#FFCC33" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function CapNhat({ route }) {
  const [dsTruyen, setdsTruyen] = useState([]);
  useEffect(() => {
    fetch(`https://86373g-8080.csb.app/DsTruyen`)
      .then((response) => response.json())
      .then((data) => {
        setdsTruyen(data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Có lỗi xảy ra: ", error);
      });
  }, []);

  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate("TomTat", {
        idTruyenTT: item.id,
        account: route.params?.account,
      });
    };

    return (
      <View style={styles.ViewFlatlis}>
        <TouchableOpacity style={styles.dstruyen} onPress={handlePress}>
          <View style={styles.ImageTruyen}>
            <Image source={{ uri: item.image }} style={styles.ImageTruyen} />
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.TexTTen}>{item.ten}</Text>
            <Text style={styles.Textduoi}>
              {item.tacGia}
              {"\n"}
              {item.soChuong} chương - {item.trangThai}
              {"\n"}
              {item.ngayCapNhat}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={dsTruyen} renderItem={renderItem} />
    </View>
  );
}
const Tab = createMaterialTopTabNavigator();

export default function App({ route }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        activeTintColor: "#FFCC33",
        indicatorStyle: { backgroundColor: "#FFCC33" },
      }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarItemStyle: { width: 110 },
        tabBarStyle: { backgroundColor: "#111111" },
      }}
    >
      <Tab.Screen
        name="Cập nhật"
        initialParams={{ account: route.params?.account }}
        component={CapNhat}
      />
      <Tab.Screen
        name="Danh mục"
        initialParams={{ account: route.params?.account }}
        component={DanhMuc}
      />
      <Tab.Screen
        name="Của bạn"
        component={CuaBan}
        initialParams={{ account: route.params?.account }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#111111",
  },
  ViewFlatlis: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dstruyen: {
    borderRadius: 8,
    width: "90%",
    height: 130,
    margin: 10,
    backgroundColor: "rgba(17, 33, 39, 0.92)",
    justifyContent: "flex-starts",
    alignItems: "center",
    flexDirection: "row",
  },
  ViewIMG: {
    width: "30%",
    height: "100%",
    flex: 1,
  },
  ViewChu: {
    width: "70%",
    height: "100%",
    margin: 7,
    justifyContent: "center",
  },
  TexTTen: {
    fontSize: 17,
    color: "white",
  },
  Textduoi: {
    fontSize: 13,
    color: "#AAAAAA",
  },
  ImageTruyen: {
    width: 70,
    height: "95%",
    resizeMode: "cover",
    margin: 5,
    borderRadius: 5,
  },
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "gray",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius:5,
    zIndex: 1000, // Đảm bảo modal nằm trên cùng
  },
  modalBottom: {
    bottom: 0,
    alignItems: "center",
  },
});
