import { StatusBar } from "expo-status-bar";
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
import { DSTRuyen } from "../data/truyen.js";
const dataTruyen = DSTRuyen;

function DanhMuc() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>DanhMuc!</Text>
    </View>
  );
}
function DaFull() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>DaFull!</Text>
    </View>
  );
}
function SangTac() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SangTac!</Text>
    </View>
  );
}
function CuaBan() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>CuaBan</Text>
    </View>
  );
}
function ePub() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ePub!</Text>
    </View>
  );
}
function CapNhat() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dataTruyen}
        renderItem={({ item }) => {
          return (
            <View style={styles.ViewFlatlis}>
              <TouchableOpacity style={styles.dstruyen}>
                <View style={styles.ImageTruyen}>
                  <Image source={item.image} style={styles.ImageTruyen} />
                </View>
                <View style={styles.ViewChu}>
                  <Text style={styles.TexTTen}>{item.ten}</Text>
                  
                  <Text style={styles.Textduoi}>{item.tacGia}{'\n'}{item.soChuong} chương - {item.trangThai=='Truyện FULL'?'Đã full':'Đang ra'}{'\n'}{item.ngayCapNhat}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
const Tab = createMaterialTopTabNavigator();

export default function App() {
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
      <Tab.Screen name="Cập nhật" component={CapNhat} />
      <Tab.Screen name="Danh mục" component={DanhMuc} />
      <Tab.Screen name="Đã full" component={DaFull} />
      <Tab.Screen name="Sáng tác" component={SangTac} />
      <Tab.Screen name="Của bạn" component={CuaBan} />
      <Tab.Screen name="ePub" component={ePub} />
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
