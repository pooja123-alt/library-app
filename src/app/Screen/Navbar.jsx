import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Navbar() {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#666" />
        <TextInput
          placeholder="Search Books..."
          placeholderTextColor="#888"
          style={styles.input}
        />
      </View>

      {/* Bottom Navbar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/Screen/Home")}
        >
          <Ionicons name="home" size={26} color="#2563EB" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/Screen/Admin")}
        >
          <MaterialIcons name="menu-book" size={26} color="#2563EB" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/Screen/Cart")}
        >
          <Ionicons name="cart" size={26} color="#2563EB" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push("/Screen/Profile")}
        >
          <Ionicons name="person-circle" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 15,
    elevation: 8,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
  },
});