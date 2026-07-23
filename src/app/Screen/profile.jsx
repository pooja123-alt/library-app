import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Profile() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [address, setAddress] = useState("Hisar, Haryana")
    const [id, setId] = useState("")
    const [isEditing, setIsediting] = useState(false)
    const [showpasswordform, setShowpasswordfrom] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewpassword] = useState("")
    const [confirmPassword, setConfirmpassword] = useState("")
    const API_DATA = 'http://10.53.26.214:5000'
  useEffect(() => {
    async function getData() {
        const value = await AsyncStorage.getItem("data");
        console.log("Stored value:", value);

        if (!value) {
            router.replace("/Screen/Login");
            return;
        }

        const user = JSON.parse(value);

        setId(user.data?.result?._id || user.result?._id || user._id);
        setName(user.data?.result?.name || user.result?.name || user.name);
        setEmail(user.data?.result?.email || user.result?.email || user.email);
        setPhone(user.data?.result?.phoneNumber || user.result?.phoneNumber || user.phoneNumber);

    }

    getData();
}, []);
    const handleChangepassword = async () => {
        try {
            const ChangePassword = await fetch(`${API_DATA}/changePassword/${id}`, {
                method: "POST",
               headers: {
    "Content-Type": "application/json",
},
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            })
            const changeData = await ChangePassword.json()
            console.log(changeData)
            ToastAndroid.show("password change successfully")
            setCurrentPassword("")
            setNewpassword("")
            setConfirmpassword("")
            console.log("cleared")
        }
        catch (err) {
            console.log(err)
        }
    }
  const handleEditUser = async () => {
    try {
        console.log("ID:", id);

        const response = await fetch(`${API_DATA}/users/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phoneNumber: phone,
            }),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            await AsyncStorage.setItem("data", JSON.stringify(data));
            ToastAndroid.show(data.massage, ToastAndroid.SHORT);
        } else {
            ToastAndroid.show(data.massage, ToastAndroid.SHORT);
        }
    } catch (error) {
        console.log(error);
    }
};

    const handleLogout = async () => {
        await AsyncStorage.removeItem("data")
        router.push("/Screen/Login")
    }
    return (
        <SafeAreaView style={styles.container}>
           <ScrollView showsVerticalScrollIndicator={false}>
    {/* Header */}
    <View style={styles.header}>
 <Image
  source={{
    uri: "https://api.dicebear.com/9.x/personas/png?seed=David",
  }}
  style={styles.profileImage}
/>

        {isEditing ? (
            <TextInput
                style={styles.inputHeader}
                value={name}
                onChangeText={setName}
            />
        ) : (
            <Text style={styles.name}>{name}</Text>
        )}

        {isEditing ? (
            <TextInput
                style={styles.inputHeader}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
        ) : (
            <Text style={styles.email}>{email}</Text>
        )}
    </View>

    {/* Details Card */}
    <View style={styles.card}>
        <Text style={styles.heading}>Personal Information</Text>

        <View style={styles.row}>
            <Text style={styles.label}>👤 Name</Text>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            ) : (
                <Text style={styles.value}>{name}</Text>
            )}
        </View>

        <View style={styles.row}>
            <Text style={styles.label}>📧 Email</Text>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            ) : (
                <Text style={styles.value}>{email}</Text>
            )}
        </View>

        <View style={styles.row}>
            <Text style={styles.label}>📱 Phone</Text>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={String(phone)}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            ) : (
                <Text style={styles.value}>{phone}</Text>
            )}
        </View>

        <View style={styles.row}>
            <Text style={styles.label}>📍 Address</Text>
            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                />
            ) : (
                <Text style={styles.value}>{address}</Text>
            )}
        </View>
    </View>

    {/* Buttons */}
    <TouchableOpacity
        style={styles.button}
        onPress={() => {
            if (!isEditing) {
                setIsediting(true);
            } else {
                handleEditUser();
                setIsediting(false);
            }
        }}
    >
        <Text style={styles.buttonText}>
            {isEditing ? "Update Profile" : "Edit Profile"}
        </Text>
    </TouchableOpacity>

    <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
            handleLogout();
        }}
    >
        <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
</ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },

    header: {
        backgroundColor: "#2563EB",
        alignItems: "center",
        paddingVertical: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#fff",
        marginBottom: 15,
    },

    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },

    email: {
        fontSize: 16,
        color: "#E5E7EB",
        marginTop: 5,
    },

    card: {
        backgroundColor: "#fff",
        margin: 20,
        padding: 20,
        borderRadius: 15,
        elevation: 5,
    },

    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#111827",
    },

    row: {
        marginBottom: 18,
    },

    label: {
        fontSize: 15,
        color: "#6B7280",
    },

    value: {
        fontSize: 17,
        fontWeight: "600",
        color: "#111827",
        marginTop: 4,
    },

    button: {
        backgroundColor: "#2563EB",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },

    logoutButton: {
        backgroundColor: "#DC2626",
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 30,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    logoutText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },
});
