import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
export default function App({ route, navigation }) {
  const [dsTruyen, setdsTruyen] = useState([]);
  useEffect(() => {
    const encodedLoaiTruyen = encodeURIComponent(route.params?.loaiTruyen);
    console.log(encodedLoaiTruyen);
    fetch(`https://r3kpvw-8080.csb.app/DsTruyen?theLoai=${encodedLoaiTruyen}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setdsTruyen(data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Có lỗi xảy ra: ", error);
      });
  }, []);
  console.log(route.params?.loaiTruyen);
  console.log(dsTruyen);
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
      <View style={styles.ViewTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={40} color="#FFCC33" />
        </TouchableOpacity>
        <Text style={{fontSize:26,color:'#FFCC33',marginLeft:15}}>
          {route.params?.loaiTruyen}
        </Text>
      </View>
      <FlatList style={{width:'100%'}} data={dsTruyen} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  ViewTop: {
    width: "90%",
    backgroundColor: "#111111",
    flexDirection: "row",
  },
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
});
