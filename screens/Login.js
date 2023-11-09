import {
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../config/firebase";
import COLORS from "../consts/colors";

function Login({navigation}) {
  // const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Retrieve data from Firebase "users" collection
    const getUsers = async () => {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const usersData = snapshot.docs.map((doc) => doc.data());
      setUsers(usersData);
    };

    getUsers();
  }, []);

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("User successfully logged in");
        navigation.push("HomeScreen");
      })
      .catch((error) => {
        console.log("You don't have an account");
        alert("You Don't Have An Account");
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.heading}>Sign In</Text>
      <Text>
        Don't have an account?{" "}
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.span}>SignUp</Text>
        </Pressable>
      </Text>
      <TextInput
        placeholder="Enter Email Address"
        type="email"
        onChangeText={(email) => setEmail(email)}
        style={styles.loginInput}
        autoCorrect={false}
      />

      <TextInput
        placeholder="Enter Password"
        type="password"
        onChangeText={(pass) => setPassword(pass)}
        style={styles.loginInput}
        textContentType='password'
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Pressable onPress={login} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20,
        width: "100%"
    },
    loginInput: {
        width: 300,
        height: 50,
        borderRadius: 5,
        paddingLeft: 10
    },
    loginButton: {
        marginTop: 20,
        width: 180,
        height: 35,
        backgroundColor: COLORS.primary,
    },
    loginText: {
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: "auto",
    },
    span: {
        color: COLORS.grey
    },
    heading: {
        fontSize: 38,
        marginBottom: 16,
        color: COLORS.primary
    }
})

export default Login
