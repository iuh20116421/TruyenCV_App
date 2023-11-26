import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import { EvilIcons } from '@expo/vector-icons';
export default function App({ navigation, route }) {
  const [isEnable, setIsEnable] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", gap: 15 }}>
        <View
          style={{
            width: "100%",
            height: 160,
            alignItems: "center",
            padding: 12,
            backgroundColor: "rgba(17, 33, 39, 0.92)",
            borderRadius:5,
          }}
        >
          <TouchableOpacity>
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={{ uri: route.params?.account.image }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, color: "white", marginTop: 10 }}>
            {route.params?.account.name}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 20,
            height:60,
            borderRadius:5,
            alignItems: "center",
            paddingHorizontal: 10,
            flexDirection: "row",
            backgroundColor: "rgba(17, 33, 39, 0.92)",
          }}
        >
          <View style={{marginHorizontal:8,alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:10, backgroundColor: "rgba(230, 11, 208, 0.92)",}}>
            <Text style={{ fontSize: 26, color: "white" }}>
              i
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: "white",marginRight:75 }}>Ẩn nguồn dữ liệu</Text>
          <Switch
          style={{width:20,}}
          trackColor={{ false: "white", true: "#3AE84BF0" }}
          thumbColor={isEnable ? "white" : "white"}
          // ios_backgroundColor={'white'}
          web_backgroundColor={'white'}
          onValueChange={()=>{
            setIsEnable(!isEnable);
          }}
          value={isEnable}
          />
        </View>
        <TouchableOpacity  style={{
            width: "100%",
            marginTop: 20,
            height:60,
            borderRadius:5,
            alignItems: "center",
            paddingHorizontal: 10,
            flexDirection: "row",
            backgroundColor: "rgba(17, 33, 39, 0.92)",
          }} >
            <View style={{marginHorizontal:8,alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:10, backgroundColor: "rgba(230, 11, 208, 0.92)",}}>
            <Text style={{ fontSize: 26, color: "white" }}>
              i
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: "white",marginRight:75 }}>Hướng dẫn sử dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{
            width: "100%",
            marginTop: 20,
            height:60,
            borderRadius:5,
            alignItems: "center",
            paddingHorizontal: 10,
            flexDirection: "row",
            backgroundColor: "rgba(17, 33, 39, 0.92)",
          }} >
            <View style={{marginHorizontal:8,alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:10, backgroundColor: "rgba(230, 11, 208, 0.92)",}}>
            <Text style={{ fontSize: 26, color: "white" }}>
              i
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: "white",marginRight:75 }}>Thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{
            width: "100%",
            marginTop: 20,
            height:60,
            borderRadius:5,
            alignItems: "center",
            paddingHorizontal: 10,
            flexDirection: "row",
            backgroundColor: "rgba(17, 33, 39, 0.92)",
          }} >
            <View style={{marginHorizontal:8,alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:10, backgroundColor: "#0D8AFE",}}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />
          </View>
          <Text style={{ fontSize: 20, color: "white",marginRight:75 }}>Gửi yêu cầu trợ giúp</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{
            width: "100%",
            marginTop: 20,
            height:60,
            borderRadius:5,
            alignItems: "center",
            paddingHorizontal: 10,
            flexDirection: "row",
            backgroundColor: "rgba(17, 33, 39, 0.92)",
          }} >
            <View style={{marginHorizontal:8,alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:10, backgroundColor: "#3AE84BF0",}}>
            <EvilIcons style={{color:'white'}} name="star" size={24} color="white" />
          </View>
          <Text style={{ fontSize: 20, color: "white",marginRight:75 }}>Đánh giá ứng dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{
            width: "100%",
            marginTop: 20,
            height:60,
            borderRadius:5,
            alignItems: "center",
            paddingHorizontal: 10,
            flexDirection: "row",
            backgroundColor: "rgba(17, 33, 39, 0.92)",
          }} >
            <View style={{marginHorizontal:8,alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:10, backgroundColor: "rgba(230, 11, 208, 0.92)",}}>
            <Text style={{ fontSize: 26, color: "white" }}>
              i
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: "white",marginRight:75 }}>Điều khoản sử dụng và vấn đề bản quyền</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>{
          navigation.navigate("Login");
        }}
         style={{
            width: "100%",
            marginTop: 20,
            height:60,
            borderRadius:5,
            alignItems: "center",
            paddingHorizontal: 10,
            flexDirection: "row",
            backgroundColor: "rgba(17, 33, 39, 0.92)",
          }} >
            <View style={{marginHorizontal:8,alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:10, backgroundColor: "#F8AE58",}}>
            <Text style={{ fontSize: 26, color: "white" }}>
              i
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: "white",marginRight:75 }}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    alignItems: "center",
    padding: 16,
  },
});
