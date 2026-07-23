import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://10.53.26.214:5000";

const Register = () => {
  const [FormsData, setFormsData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setgender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSumbit = () => {
    let UserData = {
      name,
      age,
      gender,
      email,
      phoneNumber,
      password,
      role,
    };

    async function getFormData() {
      try {
        let data = await fetch(`${API_URL}/user/adduser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UserData),
        });

        let formdata = await data.json();

        console.log(formdata);

        setFormsData(formdata);

        await AsyncStorage.setItem(
          "user",
          JSON.stringify(formdata.data)
        );

        await AsyncStorage.setItem(
          "role",
          formdata.data.role
        );

        Alert.alert("Success", "Registration Successful");
      } catch (err) {
        console.log(err);
      }
    }

    getFormData();

    setName("");
    setAge("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setgender("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>Create Account 👋</Text>

          <Text style={styles.subHeading}>
            Register to continue
          </Text>

          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Age"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Gender"
            placeholderTextColor="#888"
            value={gender}
            onChangeText={setgender}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Text style={styles.roleText}>Select Role</Text>

          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={styles.radioRow}
              onPress={() => setRole("user")}
            >
              <View
                style={[
                  styles.radio,
                  role === "user" && styles.radioSelected,
                ]}
              />
              <Text style={styles.roleLabel}>User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioRow}
              onPress={() => setRole("libraian")}
            >
              <View
                style={[
                  styles.radio,
                  role === "libraian" && styles.radioSelected,
                ]}
              />
              <Text style={styles.roleLabel}>Librarian</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSumbit}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "95%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,

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
    textAlign: "center",
    color: "#2563EB",
  },

  subHeading: {
    textAlign: "center",
    color: "#666",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 25,
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

  roleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 12,
  },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },

  radioRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2563EB",
    marginRight: 8,
  },

  radioSelected: {
    backgroundColor: "#2563EB",
  },

  roleLabel: {
    fontSize: 16,
    color: "#333",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});