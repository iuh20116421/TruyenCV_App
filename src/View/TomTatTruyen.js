import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from 'react-native-flash-message';

import { useState } from "react";

export default function App({ route, navigation }) {
  const { truyen } = route.params;
  const [danhGia,setDanhGia] = useState(0)
  const handleDanhGia = () => {
    showMessage({
      message: 'Đã gửi đánh giá!',
      type: 'info',
      duration: 3000, // Thời gian tồn tại của thông báo, tính bằng millisecond
    });
    setDanhGia(0)
  };
  return (
    <View style={styles.container}>
      <View style={styles.ViewTop}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.AnhvaTen}>
            <Image
              style={{
                width: "60%",
                height: "75%",
                resizeMode: "contain",
              }}
              source={truyen.image}
            />
            <Text
              style={{
                color: "white",
                fontSize: 21,
                textAlign: "center",
                paddingTop: 10,
              }}
            >
              {truyen.ten}
            </Text>
          </View>
          <View style={styles.TTTruyen}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Tác giả:</Text>
              <Text style={{ color: "#FF8247", fontSize: 18, paddingLeft: 10 }}>
                {truyen.tacGia}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Trạng thái:</Text>
              <Text style={{ color: "white", fontSize: 18, paddingLeft: 10 }}>
                {truyen.trangThai}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Thể loại:</Text>
              <Text style={{ color: "#FF8247", fontSize: 18, paddingLeft: 10 }}>
                {truyen.theLoai}
              </Text>
            </View>
            <Text style={{ color: "white", fontSize: 18 }}>
              Số chương: {truyen.soChuong}
              {"\n"}Ngày đăng: {truyen.ngayDang}
              {"\n"}Ngày cập nhật: {truyen.ngayCapNhat}
              {"\n"}Lượt đọc: {truyen.luotDoc}
              {"\n"}Nguồn: {truyen.nguon}
            </Text>
          </View>
          <Text style={{color:'white', fontSize:14}}>
            Nhấn vào ngôi sao để chọn số lượng sao đánh giá
          </Text>
          <View style={styles.ViewDanhGia}>
            
            <TouchableOpacity
            onPress={()=>{
              setDanhGia(1)
            }} style={styles.Sao}>
            <Ionicons name="ios-star-outline" size={24} color ={ danhGia>=1?"#00ffff": "white"}/>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              setDanhGia(2)
            }} style={styles.Sao}>
            <Ionicons name="ios-star-outline" size={24} color={ danhGia>=2?"#00ffff": "white"} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              setDanhGia(3)
            }} style={styles.Sao}>
            <Ionicons name="ios-star-outline" size={24} color={ danhGia>=3?"#00ffff": "white"} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              setDanhGia(4)
            }} style={styles.Sao}>
            <Ionicons name="ios-star-outline" size={24} color={ danhGia>=4?"#00ffff": "white"} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              setDanhGia(5)
            }} style={styles.Sao}>
            <Ionicons name="ios-star-outline" size={24} color={ danhGia>=5?"#00ffff": "white"} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handleDanhGia} style={styles.GuiDanhGia}>
              <Text style={{color:'white'}}>
                Gửi đánh giá
              </Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </View>
      <FlashMessage autoHide position="top" /> 
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
            navigation.goBack();
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
  ViewTop: {
    width: "100%",
    height: "90%",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    gap: 10,
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
  ViewDanhGia:{
    flexDirection:'row',
    backgroundColor: "#222222",
    width: "90%",
    height: 60,
    padding: 10,
    justifyContent:'space-around',
    alignItems:'center'
  },
  Sao:{
    padding:5,
  },
  GuiDanhGia:{
    justifyContent: "center",
    alignItems: "center",
    borderRadius:30,
    backgroundColor:'#FFC125',
    width:115,
    height:45
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
