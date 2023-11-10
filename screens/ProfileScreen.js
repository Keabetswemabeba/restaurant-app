import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  TextInput
} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = collection(db, "usersData");
      const querySnapshot = await getDocs(userRef);
      const userDataArray = [];
      querySnapshot.forEach((doc) => {
        userDataArray.push(doc.data());
      });
      setUserData(userDataArray);
    };
  
    fetchUserData();
  }, []);
  

  function ProfileModal({ onClose }) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [cardDetails, setCardDetails] = useState("");

    function updateProfileDetails() {
      // Update user details in Firebase collection
      const userRef = collection(db, "usersData");
      const updatedUser = {
        name,
        lastName,
        contact,
        address,
        cardDetails,
      };
      addDoc(userRef, updatedUser)
        .then(() => {
          console.log("User details updated in Firebase collection");
          alert("User details added")
          onClose(); // Close the modal after saving the details
        })
        .catch((error) => {
          console.log(
            "Error updating user details in Firebase collection:",
            error
          );
        });
    }

    return (
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add Personal Details</Text>
        <TextInput
          placeholder="Enter Name"
          onChangeText={(name) => setName(name)}
          style={styles.input}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Enter Surname"
          onChangeText={(lastName) => setLastName(lastName)}
          style={styles.input}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Enter Contact"
          keyboardType="numeric"
          onChangeText={(contact) => setContact(contact)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="Enter Address"
          onChangeText={(address) => setAddress(address)}
          style={styles.input}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Enter Card Details"
          onChangeText={(cardDetails) => setCardDetails(cardDetails)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Pressable onPress={updateProfileDetails} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profile Screen</Text>
      </View>
      {modalVisible && <ProfileModal onClose={() => setModalVisible(false)} />}
      {userData && (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataTitle}>Profile Data:</Text>
          {userData.map((user, index) => (
            <View key={index} style={styles.userDataItem}>
              <Text style={styles.userDataLabel}>Name:</Text>
              <Text style={styles.userDataValue}>{user.name}</Text>
              <Text style={styles.userDataLabel}>Last Name:</Text>
              <Text style={styles.userDataValue}>{user.lastName}</Text>
              <Text style={styles.userDataLabel}>Contact:</Text>
              <Text style={styles.userDataValue}>{user.contact}</Text>
              <Text style={styles.userDataLabel}>Address:</Text>
              <Text style={styles.userDataValue}>{user.address}</Text>
              <Text style={styles.userDataLabel}>Card Details:</Text>
              <Text style={styles.userDataValue}>{user.cardDetails}</Text>
            </View>
          ))}
        </View>
      )}
      <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Add Personal Details</Text>
      </Pressable>
    </SafeAreaView>
  );  
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.light,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  userDataContainer: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: COLORS.light,
    borderRadius: 10,
  },
  userDataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userDataItem: {
    marginBottom: 20,
  },
  userDataLabel: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  userDataValue: {
    marginBottom: 10,
    fontSize: 15,
  },
});

export default ProfileScreen;
