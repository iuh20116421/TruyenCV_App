import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";
import {  useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
export default function App({ navigation, route }) {
  const [data1, setData] = useState([]);
  const isFocused = useIsFocused();
  const [fetchCompleted, setFetchCompleted] = useState(false);
  useEffect(() => {
    if (isFocused) {
      setFetchCompleted(false);
      setdataTruyen([]);
    fetch(`https://86373g-8080.csb.app/LichSu?id_account=${route.params?.account.id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        getThongTinTruyen(data);
        setFetchCompleted(true);
      });
    }
  }, [isFocused]);
  const [dataTruyen, setdataTruyen] = useState([]);
  const [idLSXoa, setidLSXoa] = useState();
  function getThongTinTruyen(data) {
    // Lấy ra danh sách id_truyen từ mảng data1
    const idTruyens = data.map((item) => item.id_Truyen);
    const idLSXoatemp = data.map((item) => item.id);
    setidLSXoa(idLSXoatemp);
    // Duyệt qua danh sách id_truyen và gọi hàm để lấy thông tin truyện
    idTruyens.forEach((id,index) => {
      fetch(`https://86373g-8080.csb.app/dsTruyen/${id}`)
        .then((response) => response.json())
        .then((truyen) => {
          // Thêm thông tin truyện vào state
          const truyenWithNgayDoc = {
            ...truyen,
            ngay_doc: data[index].ngayDoc, // Gán ngày đọc từ data1 vào truyện tương ứng
          };
          // Thêm thông tin truyện vào state
          setdataTruyen((prevData) => [...prevData, truyenWithNgayDoc]);
          setdataTruyen((prevData) => {
            return prevData.sort((a, b) => {
              const dateA = new Date(a.ngay_doc).getTime();
              const dateB = new Date(b.ngay_doc).getTime();
              return dateB - dateA;
            });
          });
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi lấy thông tin truyện: ", error);
        });
    });
   
  }
  function handleDeleteAll  (){
    // fetch(`https://86373g-8080.csb.app/LichSu?id_account=${route.params?.account.id}`, {
     

      // Duyệt qua danh sách id_truyen và gọi hàm để lấy thông tin truyện
      idLSXoa.forEach((id,index) => {
        fetch(`https://86373g-8080.csb.app/LichSu/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            setdataTruyen([]);
          })
          .catch((error) => {
            console.error("Có lỗi xảy ra khi xóa tất cả: ", error);
            showMessage({message: "Đã xảy ra lỗi khi xóa tất cả",
            type: "danger",
          });
        });
    })
    showMessage({
      message: "Xóa thành công",
      type: "success",
    });
};

const renderItem = ({ item }) => {
  return (
    <View style={styles.ViewFlatlis}>
      <TouchableOpacity onPress={()=>{
        navigation.navigate("Noidung", {
          idTruyen: item.id,
          account: route.params?.account,
        });
      }} style={styles.dstruyen} >
        <View style={styles.ImageTruyen}>
          <Image source={{ uri: item.image }} style={styles.ImageTruyen} />
        </View>
        <View style={styles.ViewChu}>
          <Text style={styles.TexTTen}>{item.ten}</Text>
          <Text style={styles.Textduoi}>Ngày đọc: {item.ngay_doc}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
return (
  <View style={styles.container}>
     <FlashMessage position="top" />
    <View style={styles.viewTop}>
      <Text style={{ color: "gray", fontSize: 18 }}>Lịch sử</Text>
      <TouchableOpacity>
        <Text onPress={handleDeleteAll} style={{ color: "#FFC125", fontSize: 21 }}>xóa tất cả</Text>
      </TouchableOpacity>
    </View>
   {fetchCompleted?<FlatList data={dataTruyen} renderItem={renderItem} />:<ActivityIndicator size="large" color="#ffffff" />} 
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#111111",
  alignItems: "center",
},
viewTop: {
  width: "100%",
  padding: 15,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
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
  fontSize: 17,
  color: "#AAAAAA",
},
ImageTruyen: {
  width: 70,
  height: "95%",
  resizeMode: "cover",
  margin: 5,
  borderRadius: 5,
},
});