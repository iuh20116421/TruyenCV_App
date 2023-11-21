import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

export default function App({route}) {
  const [timkiem, settimkiem] = useState("");
  const [dsTruyen, setdsTruyen] = useState([]);
  const [startedSearching, setStartedSearching] = useState(false);
  useEffect(() => {
    fetch(`https://f56tg4-8080.csb.app/DsTruyen`)
      .then((response) => response.json())
      .then((data) => {
        setdsTruyen(data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Có lỗi xảy ra: ", error);
      });
  }, []);
  const handleSearch = (text) => {
    settimkiem(text);
    if (!startedSearching) {
      setStartedSearching(true);
    }
  };
  const filterdata = startedSearching
    ? dsTruyen.filter(
        (item) =>
          item.ten.toLowerCase().includes(timkiem.toLowerCase()) ||
          item.tacGia.toLowerCase().includes(timkiem.toLowerCase())
      )
    : [];
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('TomTat', { idTruyenTT: item.id, account: route.params?.account });
    };

    return (
      <View style={styles.ViewFlatlis}>
        <TouchableOpacity style={styles.dstruyen} onPress={handlePress}>
          <View style={styles.ImageTruyen}>
            <Image source={{uri: item.image}} style={styles.ImageTruyen} />
          </View>
          <View style={styles.ViewChu}>
            <Text style={styles.TexTTen}>{item.ten}</Text>
            <Text style={styles.Textduoi}>
              {item.tacGia}
              {"\n"}
              {item.soChuong} chương -{" "}
              {item.trangThai}
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
      <View style={{flexDirection:'row',width:'100%',height:50,justifyContent:'center',alignItems:'center',marginBottom:15}}>
        <TouchableOpacity
          style={{
            background: "rgba(52, 49, 49, 1)",
            width: "80%",
            height: 50,
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            borderRadius: 10,
            borderWidth: 1,
            marginTop: 15,
          }}
        >
          <Ionicons
            style={{ padding: 10 }}
            name="ios-search"
            size={24}
            color="rgba(120, 125, 128, 1)"
          />
          <TextInput
            style={{
              color: "rgba(120, 125, 128, 1)",
              width: "85%",
              height: 50,
              fontSize: 18,
            }}
            value={timkiem}
            onChangeText={(text) => handleSearch(text)}
            placeholder="Nhập tên tác giả, tên truyện"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            settimkiem("");
            setStartedSearching(false);
          }}
          style={{
            width: "15%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Hủy</Text>
        </TouchableOpacity>
      </View>
      {startedSearching && ( // Chỉ hiển thị FlatList khi đã bắt đầu tìm kiếm
        <FlatList data={filterdata} renderItem={renderItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#222222",
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
    justifyContent:'center'
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
