import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState([]);

  const handleLogin = () => {
    let loginUser = {
      email,
      password,
    };

    async function UserLogin() {
      try {
        const API_DATA = "http://10.53.26.214:5000";

        const loginData = await fetch(`${API_DATA}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginUser),
        });

        let loginFormData = await loginData.json();

        await AsyncStorage.setItem(
          "data",
          JSON.stringify(loginFormData.data)
        );

        const value = await AsyncStorage.getItem("data");
        console.log("storage value", value);

        router.push("/Screen/profile");

        console.log(loginFormData);

        setLogin(loginData.data);
      } catch (err) {
        console.log(err);
      }
    }

    UserLogin();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome Back 👋</Text>

        <Text style={styles.subHeading}>
          Login to continue your account
        </Text>

        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#888"
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor="#888"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/Screen/Register")}
          >
            <Text style={styles.registerLink}>
              Register Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "95%",
    maxWidth: 420,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,

    borderWidth: 2,
    borderColor: "#2563EB",

    elevation: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563EB",
    textAlign: "center",
  },

  subHeading: {
    textAlign: "center",
    color: "#666",
    marginTop: 5,
    marginBottom: 25,
    fontSize: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 18,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  backButton: {
    marginTop: 18,
    alignItems: "center",
  },

  backText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 16,
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    flexWrap: "wrap",
  },

  registerText: {
    color: "#555",
    fontSize: 15,
  },

  registerLink: {
    color: "#2563EB",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 15,
  },
});