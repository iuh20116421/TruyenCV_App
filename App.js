import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import{Ionicons} from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrangChu from './src/View/TrangChu.js'
import TimKiem from './src/View/TimKiem.js'
import ThuVien from './src/View/ThuVien.js'
import CongDong from './src/View/CongDong.js'
import CaiDat from './src/View/CaiDat.js'
import TomTat from './src/View/TomTatTruyen.js'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="AppChinh" component={AppChinh} />
        <Stack.Screen name="TomTat" component={TomTat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 function AppChinh() {
  
  return (
     <Tab.Navigator
      initialRouteName="TrangChu"
      screenOptions={{
        tabBarActiveTintColor: '#FFCC33',
        headerStyle: {
          borderBottomWidth: 0, 
          backgroundColor:'#111111',
          
        },
        tabBarStyle: {
          backgroundColor: '#111111', 
        },
        headerTitleStyle:{
          color:'#FFCC33',
          fontWeight:'bold',
          fontSize:24
        },
        
      }}
      
    >
      <Tab.Screen
        name="Trang chủ "
        component={TrangChu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tìm kiếm"
        component={TimKiem}
        options={{
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
            <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
