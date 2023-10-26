import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import {
  Pressable,
  TextInput,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import COLORS from "../consts/colors";

function Signup() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [cardDetails, setCardDetails] = useState("")
  const [uid, setUid] = useState("")
  const [user, setUser] = useState("")
  const [passSecured, setPassSecured] = useState(true)

  function signup() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        
        const displayName = uid
        setUser(() => ({...userCredentials}))

        updateProfile(auth.currentUser, {displayName:displayName}).then().catch()
        alert(displayName+ "successfull")
        console.log("User Successfully Registered");
        navigation.push("HomeScreen", {user:{user}});
      })
      .catch((error) => {
        alert(error)
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.heading}>Sign Up</Text>
      <Text>
        Do you have an account?{" "}
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.span}>Sign In</Text>
        </Pressable>
      </Text>
      <TextInput
        placeholder="Enter Name"
        type="name"
        onChangeText={(uid) => setUid(uid)}
        style={styles.loginInput}
        autoCorrect={false}
      />
      <TextInput
        placeholder="Enter Surname"
        type="lastname"
        onChangeText={(event) => setLastName(event)}
        style={styles.loginInput}
        autoCorrect={false}
      />
      <TextInput
        placeholder="Enter Contact"
        type="number"
        style={styles.loginInput}
        onChangeText={(event) => setContact(event)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Enter Address"
        type="address"
        style={styles.loginInput}
        onChangeText={(event) => setAddress(event)}
        autoCorrect={false}
      />
      <TextInput
        placeholder="Enter Email"
        type="email"
        style={styles.loginInput}
        onChangeText={(event) => setEmail(event)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Enter Password"
        type="password"
        style={styles.loginInput}
        onChangeText={(pass) => setPassword(pass)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passSecured}
      />
      <TextInput
        placeholder="Enter Card Details"
        type="banking details"
        style={styles.loginInput}
        onChangeText={(event) => setCardDetails(event)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Pressable onPress={signup} style={styles.loginButton}>
        <Text style={styles.loginText}>Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
    width: "100%",
  },

  loginInput: {
    width: 300,
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
  },

  loginButton: {
    marginTop: 20,
    width: 180,
    height: 35,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

  loginText: {
    color: COLORS.white,
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  span: {
    color: COLORS.dark,
    marginTop: 10,
    alignItems: "center",
    textAlign: "center",
  },

  heading: {
    fontSize: 38,
    marginBottom: 20,
    color: COLORS.primary
  },
});

export default Signup;
