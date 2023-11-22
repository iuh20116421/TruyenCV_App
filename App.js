import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrangChu from "./src/View/TrangChu.js";
import TimKiem from "./src/View/TimKiem.js";
import ThuVien from "./src/View/ThuVien.js";
import CongDong from "./src/View/CongDong.js";
import CaiDat from "./src/View/CaiDat.js";
import TomTat from "./src/View/TomTatTruyen.js";
import Login from "./src/View/Login.js";
import DangKy from "./src/View/DangKy.js";
import DsBinhLuan from "./src/View/DsBinhLuan.js";
import Noidung from "./src/View/Noidung.js";
import DanhMucLoaiTruyen from "./src/View/DanhMucLoaiTruyen.js";
import DanhMucTLTruyen from "./src/View/DanhMucTLTruyen.js";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown:false}} name="DangKy" component={DangKy} />
        <Stack.Screen options={{headerShown:false}} name="AppChinh" component={AppChinh} />
        <Stack.Screen options={{headerShown:false}} name="TomTat" component={TomTat} />
        <Stack.Screen options={{headerShown:false}} name="Noidung" component={Noidung} />
        <Stack.Screen options={{headerShown:false}} name="DanhMucLoaiTruyen" component={DanhMucLoaiTruyen} />
        <Stack.Screen options={{headerShown:false}} name="DanhMucTLTruyen" component={DanhMucTLTruyen} />
        <Stack.Screen
          name="DsBinhLuan"
          component={DsBinhLuan}
          options={({navigation})=>(
            {
            title: 'DS. Bình luận',
            headerTitleStyle: { color: '#FFC125', fontSize: 18 },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={29} color="#FFC125" />
              </TouchableOpacity>
            ),
            headerStyle: {
              height: 50, 
              borderBottomWidth: 2, 
              backgroundColor: '#111111',
            },
            headerTitleContainerStyle: {
              paddingBottom: 10, 
            },
          
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppChinh({route}) {
  return (
    <Tab.Navigator
      initialRouteName="TrangChu"
     
      screenOptions={{
        tabBarActiveTintColor: "#FFCC33",
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: "#111111",
        },
        tabBarStyle: {
          backgroundColor: "#111111",
        },
        headerTitleStyle: {
          color: "#FFCC33",
          fontWeight: "bold",
          fontSize: 24,
        },
      }}
    >
      <Tab.Screen
        name="Trang chủ "
        component={TrangChu}
        initialParams={{ account: route.params?.account }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tìm kiếm"
        component={TimKiem}
        initialParams={{ account: route.params?.account }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Thư viện"
        component={ThuVien}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cộng đồng"
        component={CongDong}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={CaiDat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
