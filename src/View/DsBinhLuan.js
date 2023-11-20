import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function App({ route, navigation }) {
  const [accountInfo, setAccountInfo] = useState([]);
  const [dsBinhLuan, setdsBinhLuan] = useState([]);

  useEffect(() => {
    fetch(
      `https://f56tg4-8080.csb.app/BinhLuan?id_Truyen=${route.params?.idTruyenBL}`
    )
      .then((response) => response.json())
      .then((data) => {
        setdsBinhLuan(data);

        // Lấy danh sách các promise cho mỗi tài khoản
        const accountPromises = data.map((item) =>
          fetch(
            `https://f56tg4-8080.csb.app/accounts?id=${item.id_account}`
          ).then((response) => response.json())
        );

        // Chờ tất cả các promise hoàn thành
        Promise.all(accountPromises)
          .then((accountData) => {
            setAccountInfo(accountData); // Lưu thông tin tài khoản vào state
          })
          .catch((error) => {
            console.error("Có lỗi xảy ra khi lấy thông tin tài khoản: ", error);
          });
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }, [route.params?.idTruyenBL]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "95%", height: "100%" }}
        data={dsBinhLuan}
        renderItem={({ item, index }) => {
          const currentAccounts = accountInfo[index] || []; // Lấy danh sách các tài khoản từ state
          return (
            <View key={index} style={styles.scrollView}>
              {currentAccounts.map((currentAccount, idx) => (
                <View
                  style={{
                    width: "100%",
                    height: null,
                    flexDirection: "row",
                  }}
                  key={idx}
                >
                  <TouchableOpacity
                    style={{
                      width: 55,
                      height: 55,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 20,
                    }}
                  >
                    <Image
                      style={{ width: 55, height: 55, borderRadius: 50 }}
                      source={{
                        uri: currentAccount.image,
                      }}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "100%",
                      height: null,
                      flexDirection: "column",
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 22 }}>
                      {currentAccount.name}
                    </Text>
                    <View
                      style={{
                        marginTop: 25,
                        width: "87%",
                        height: null,
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <View
                        style={{
                          width: "78%",
                          height: null,
                          backgroundColor: "#222222",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{ color: "white", fontSize: 16, padding: 10 }}
                        >
                          {item.noiDung}
                        </Text>
                      </View>
                      <TouchableOpacity
                      style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={{ color: "white", fontSize: 44, }}>
                          ...
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
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
  scrollView: {
    width: "100%",
    height: "100%",
    gap: 10,
    marginTop: 10,
  },
});
