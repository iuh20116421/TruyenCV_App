import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import{FontAwesome} from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
function CapNhat() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Capnhat!</Text>
      </View>
    );
  }
  function DanhMuc() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>DanhMuc!</Text>
      </View>
    );
  }
  function DaFull() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>DaFull!</Text>
      </View>
    );
  }
  function SangTac() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>SangTac!</Text>
      </View>
    );
  }
  function CuaBan() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>CuaBan</Text>
      </View>
    );
  }function ePub() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ePub!</Text>
      </View>
    );
  }
  const Tab = createMaterialTopTabNavigator();
  
  export default function App() {
    return (
      
        <Tab.Navigator
       
        tabBarOptions={{
            scrollEnabled: true, 
            activeTintColor: '#FFCC33',
            indicatorStyle: { backgroundColor: '#FFCC33' }, 
          }}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12,fontWeight:'bold' },
            tabBarItemStyle: { width: 110, },
            tabBarStyle: { backgroundColor: '#111111', },
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
