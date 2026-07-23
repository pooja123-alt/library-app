import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
} from "react-native";

export default function AdminScreen() {
  const API_URL = "http://10.53.26.214:5000"; 
  const [book,setBooks] =useState([])
  const [title,setTitle] = useState("")
  const [price,setPrice] =useState("")
  const [author,setAuthor] =useState("")
  const [category,setCategory] =useState("")
  const [description,setDiscription] = useState("")
  const [image,setImage] =useState(null)
  const [type,setType] =useState("recent")
  const [loader,setLoader] =useState(false)
  const [showForm,setShowForm] =useState(false)
  const [editData,setEditData] =useState(null)
  const [originalData,setOriginalData] =useState(null)
  const [showFormData,setShowFormData] =useState(null)
  const [selectedBook,setSelectedBook] = useState(null)
  const [userEmail,setUserEmail] = useState("")
  const [userData,setUserData] = useState(null)
  const [dueDate,setDueDate] = useState("")
  const [isReturned,setIsReturned] =useState(false)
  const [status,setStatus] =useState("")
  async function getBooks() {
    try{
      const token =await AsyncStorage.getItem("token")
      const response=await fetch(`${API_URL}/book/allbooks`,{
        headers:{
          "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
        }
      })
      let data=await response.json()
      setBooks(data.data)
       await AsyncStorage.setItem(
          "books",
          JSON.stringify(data.data)
        );
    }
    catch(err){
      console.log(err)
    }
    
  }
 const handler = async () => { 
  try {
    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("status", "available");

    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: "book.jpg",
        type: "image/jpeg",
      });
    }

    const response = await fetch(`${API_URL}/book/addbook`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    console.log(data);

    getBooks();

  } catch (err) {
    console.log(err);
  }
};
  return (
<SafeAreaView style={styles.container} >

  {/* Header */}


  <ScrollView showsVerticalScrollIndicator={false}>
  <View style={styles.headerCard}>

    <View>
      <Text style={styles.smallTitle}>
        LIBRARY MANAGEMENT
      </Text>

      <Text style={styles.heading}>
        Admin Dashboard
      </Text>

      <Text style={styles.subHeading}>
        Manage Books, Issue Records & Library Inventory
      </Text>
    </View>

    <TouchableOpacity
      style={styles.addBtn}
      onPress={() => setShowForm(true)}
    >
      <Text style={styles.addBtnText}>
        + Add Book
      </Text>
    </TouchableOpacity>

  </View>

  {/* Dashboard */}

  <View style={styles.dashboardRow}>

    <View style={styles.dashboardCard}>
      <Text style={styles.dashboardNumber}>
        {book.length}
      </Text>

      <Text style={styles.dashboardText}>
        Total Books
      </Text>
    </View>

    <View style={styles.dashboardCard}>
      <Text style={styles.dashboardNumber}>
        {book.filter(item => item.status === "available").length}
      </Text>
      <Text style={styles.dashboardText}>
        Available
      </Text>
    </View>

    <View style={styles.dashboardCard}>
      <Text
        style={[
          styles.dashboardNumber,
          { color: "#DC2626" }
        ]}
      >
        {book.filter(item => item.status === "borrowed").length}
      </Text>

      <Text style={styles.dashboardText}>
        Borrowed
      </Text>
    </View>

  </View>

    {/* Add Book Form */}

    <View style={styles.formCard}>

      <Text style={styles.formHeading}>
        📚 Add New Book
      </Text>

      <TextInput
        placeholder="Book Name"
        placeholderTextColor="#777"
        style={styles.input}
        value={title}  onChangeText={setTitle}
      />

      <TextInput
        placeholder="Author Name"
        placeholderTextColor="#777"
        style={styles.input}
        value={author}  onChangeText={setAuthor}
      />

      <TextInput
        placeholder="Category"
        placeholderTextColor="#777"
        style={styles.input}
        value={category}  onChangeText={setCategory}
      />

      <TextInput
        placeholder="Description"
        placeholderTextColor="#777"
        multiline
        style={[styles.input, { height: 90 }]}
        value={description}  onChangeText={setDiscription}
      />

      <TextInput
        placeholder="Price"
        placeholderTextColor="#777"
        style={styles.input}
        value={price}  onChangeText={setPrice}
      />

    <TouchableOpacity
  style={styles.saveBtn}
  onPress={handler}
>
  <Text style={styles.saveText}>
    Save Book
  </Text>
</TouchableOpacity>

    </View>

    {/* Books */}

    <Text style={styles.sectionTitle}>
      📚 Library Books
    </Text>

    <View style={styles.bookCard}>

      <Image
        source={{
          uri: "https://picsum.photos/300/400"
        }}
        style={styles.image}
      />

      <View style={{ flex: 1 }}>

        <Text style={styles.bookName}>
          Atomic Habits
        </Text>

        <Text style={styles.bookInfo}>
          Author : James Clear
        </Text>

        <Text style={styles.bookInfo}>
          Category : Self Help
        </Text>

        <Text style={styles.bookInfo}>
          Price : ₹599
        </Text>

        <Text
          style={{
            color: "#16A34A",
            fontWeight: "bold",
            marginTop: 5
          }}
        >
          Status : Available
        </Text>

        <View style={styles.buttonRow}>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: "#FACC15" }
            ]}
          >
            <Text style={styles.btnText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: "#DC2626" }
            ]}
          >
            <Text style={styles.btnText}>
              Delete
            </Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.issueButton}
        >
          <Text style={styles.btnText}>
            Issue Book
          </Text>
        </TouchableOpacity>

      </View>

    </View>

  </ScrollView>

  {/* Issue Modal */}

  <Modal
    visible={false}
    transparent
    animationType="slide"
  >

    <View style={styles.modalBg}>

      <View style={styles.modal}>

        <Text style={styles.formHeading}>
          📖 Issue Book
        </Text>

        <TextInput
          placeholder="Book Name"
          style={styles.input}
        />

        <TextInput
          placeholder="User Email"
          style={styles.input}
        />

        <TextInput
          placeholder="User Name"
          style={styles.input}
        />

        <TextInput
          placeholder="Due Date"
          style={styles.input}
        />

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>
            Confirm Issue
          </Text>
        </TouchableOpacity>

      </View>

    </View>

  </Modal>

</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
    padding: 15,
  },

  /* Header */

  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 6,
  },

  smallTitle: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 6,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
  },

  subHeading: {
    color: "#6B7280",
    marginTop: 6,
    fontSize: 15,
  },

  addBtn: {
    backgroundColor: "#2563EB",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  addBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  /* Dashboard */

  dashboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  dashboardCard: {
    backgroundColor: "#fff",
    width: "31%",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 22,
    elevation: 5,
  },

  dashboardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563EB",
  },

  dashboardText: {
    marginTop: 6,
    color: "#6B7280",
    fontSize: 15,
  },

  /* Form */

  formCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    elevation: 5,
  },

  formHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 18,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  saveBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  /* Section */

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 15,
  },

  /* Book Card */

  bookCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 15,
  },

  bookName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },

  bookInfo: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 5,
  },

  /* Buttons */

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  actionButton: {
    width: "48%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  issueButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  /* Modal */

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 8,
  },
});