import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
export default function App({ route, navigation }) {
  const [truyen, setTruyen] = useState([]);
  useEffect(() => {
    fetch(`https://86373g-8080.csb.app/DsTruyen?id=${route.params?.idTruyen}`)
      .then((response) => response.json())
      .then((data) => {
        setTruyen(data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra: ", error);
      });
  }, []);

  const [showModalTop, setShowModalTop] = useState(false);
  const [showModalBottom, setShowModalBottom] = useState(false);

  const handlePress = () => {
    setShowModalTop((prev) => !prev); // Đảo ngược trạng thái hiển thị modal top
    setShowModalBottom((prev) => !prev); // Đảo ngược trạng thái hiển thị modal bottom
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <FlatList
          style={{ marginTop: 15, width: "100%", height: null, padding: 10 }}
          data={truyen}
          renderItem={({ item }) => {
            return (
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    color: "rgba(37, 206, 54, 1)",
                    fontFamily: 'Pattaya-Regular',
                    fontSize: 24,
                    paddingHorizontal: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.ten}
                </Text>
                <Text
                  style={{
                    color: "#C8C5C5",
                    fontSize: 16,
                    paddingVertical: 15,
                    textAlign: "center",
                  }}
                >
                  {item.noiDung}
                </Text>
              </View>
            );
          }}
        />

        {showModalTop && (
          <View style={[styles.modal, styles.modalTop]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="chevron-back-outline" size={34} color="#d3d3d3" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                name="list"
                style={{ paddingHorizontal: 15, marginRight: 150 }}
                size={34}
                color="#d3d3d3"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="settings-outline"
                style={{ paddingHorizontal: 15 }}
                size={34}
                color="#d3d3d3"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="bookmark" size={34} color="#d3d3d3" />
            </TouchableOpacity>
          </View>
        )}

        {showModalBottom && (
          <View style={[styles.modal, styles.modalBottom]}>
            <TouchableOpacity>
              <Feather
                name="list"
                style={{}}
                size={34}
                color="#d3d3d3"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="settings-outline"
                style={{}}
                size={34}
                color="#d3d3d3"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="message1" size={34} color="#d3d3d3" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontSize: 22, color: "#d3d3d3" }}>Xem truyện</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "#111111",
  },
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 70,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "#111111",
    borderColor: "black",
    borderWidth: 1,
    zIndex: 1000, // Đảm bảo modal nằm trên cùng
  },
  modalTop: {
    top: 0,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  modalBottom: {
    bottom: 0,
    flexDirection: "row",
    paddingHorizontal: 15,
    gap: 20,
    alignItems: "center",
  },
});
