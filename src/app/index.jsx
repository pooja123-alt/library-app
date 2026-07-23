import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,

} from 'react-native';
import { router } from "expo-router";
import Navbar from './Screen/Navbar'
export default function Index() {
  const [book, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {

    const getBooks = async () => {
      try {
        const response = await fetch(`http://10.53.26.214:5000/allbooks`);
        const data = await response.json();
        setBooks(data.data)
        console.log("data found successfully", data);
      } catch (err) {
        console.log(err);
      }
    };
    getBooks()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
       <View style={styles.form}>
  <Text style={styles.heading}>Registration Form 👋</Text>



  <TextInput
    placeholder="Enter Name"
    placeholderTextColor="#888"
    value={title}
    onChangeText={(text) => {
      console.log(text);
      setTitle(text);
    }}
    style={styles.input}
  />

  <TextInput
    placeholder="Enter Age"
    placeholderTextColor="#888"
    value={author}
    onChangeText={(text) => {
      console.log("Age:", text);
      setAuthor(text);
    }}
    keyboardType="numeric"
    style={styles.input}
  />

  <TextInput
    placeholder="Enter Email"
    placeholderTextColor="#888"
    value={description}
    onChangeText={(text) => {
      console.log("Email:", text);
      setDescription(text);
    }}
    keyboardType="email-address"
    style={styles.input}
  />

  <TextInput
    placeholder="Enter Phone Number"
    placeholderTextColor="#888"
    value={price}
    onChangeText={(text) => {
      console.log("Phone:", text);
      setPrice(text);
    }}
    keyboardType="phone-pad"
    style={styles.input}
  />

  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText}>Register</Text>
  </TouchableOpacity>

  {/* Demo Output */}
  <View style={styles.previewBox}>
    <Text style={styles.preview}>{title}</Text>
    <Text style={styles.preview}>{author}</Text>
    <Text style={styles.preview}>{description}</Text>
    <Text style={styles.preview}>{price}</Text>
  </View>
</View>

        {book.map((item) => (
          <View key={item._id} style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>
              {item.description}
            </Text>
            <Text style={styles.author}>
              Author: {item.author}
            </Text>
            <Text style={styles.price}>
              ₹{item.price}
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Book</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
      <TouchableOpacity
        onPress={() => router.push("/Screen/Login")}
      >
        <Text>Go to Login</Text>

      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  scrollContainer: {
    padding: 15,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    marginBottom: 8,
  },

  author: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16a34a",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2563EB",
  },
  form: {
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 25,
  marginBottom: 25,

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
});
