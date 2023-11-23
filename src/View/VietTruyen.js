import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
export default function App({ route, navigation }) {
  const [tenTruyen, setTenTruyen] = useState("Chưa Đặt Tên");
  const [image, setImage] = useState(null);
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
  return (
    <View style={styles.container}>
      <View style={styles.ViewTop}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack({ a: "" });
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
          Viết truyện
        </Text>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={30} color="#FFCC33" />
        </TouchableOpacity>
      </View>
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
          <View style={{ justifyContent: "center", alignItems: "center",marginLeft:90 }}>
            <Image
              source={require("../../assets/imgTruyen/Logo.png")}
              style={{
                width: "170px",
                height: "170px",
                resizeMode: "contain",
                marginRight: 10,
              }}
            />
            <Text
              style={{
                marginTop: 10,
                fontSize: 22,
                color: "white",
                textAlign: "center",
              }}
            >
              {tenTruyen}
            </Text>
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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#111111",
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
});