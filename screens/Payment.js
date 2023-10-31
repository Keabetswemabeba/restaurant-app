import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { Secret_key, STRIPE_PUBLISHABLE_KEY } from "../keys";
import COLORS from '../consts/colors'

//creating a component
const CURRENCY = "ZAR";
var CARD_TOKEN = null;

function getCreditCardToken(creditCardData) {
  //alert()
  const card = {
    "card[number]": creditCardData.values.number.replace(/ /g, ""),
    "card[exp_month]": creditCardData.values.expiry.split("/")[0],
    "card[exp_year]": creditCardData.values.expiry.split("/")[1],
    "card[cvc]": creditCardData.values.cvc,
  };
  return fetch("https://api.stripe.com/v1/tokens", {
    headers: {
      // Using the correct MIME type for your server
      Accept: "application/json",
      // Use the correct Content Type to send data to Stripe
      "Content-Type": "application/x-www-form-urlencoded",
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    // Using a proper HTTP method
    method: "post",
    // Formatting the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map((key) => key + "=" + card[key])
      .join("&"),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */

function subscribeUser(creditCardToken) {
  return new Promise((resolve) => {
    console.log("Credit card token\n", creditCardToken);
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
}

const StripeGateway = () => {
  const [CardInput, setCardInput] = useState({});

  const onSubmit = async () => {
    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      alert("Invalid Credit Card");
      return false;
    }

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(CardInput);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        alert("creditCardToken error");
        return;
      }
    } catch (e) {
      console.log("e", e);
      return;
    }
    // Send a request to the server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from the server
    if (error) {
      alert(error);
    } else {
      let payment_data = await charges();
      console.log("pament_data", payment_data);
      if (payment_data.status == "succeeded") {
        alert("Payment Successfully");
      } else {
        alert("Payment failed");
      }
    }
  };

  const charges = async () => {
    const card = {
      amount: 10.00,
      currency: CURRENCY,
      source: CARD_TOKEN,
      description: "Developers Sin Subscription",
    };

    return fetch("https://api.stripe.com/v1/charges", {
      headers: {
        // Use the correct MIME type for your server
        Accept: "application/json",
        // Use the correct Content Type to send data to Stripe
        "Content-Type": "application/x-www-form-urlencoded",
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${Secret_key}`,
      },
      // Use a proper HTTP method
      method: "post",
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map((key) => key + "=" + card[key])
        .join("&"),
    }).then((response) => response.json());
  };

  const _onChange = (data) => {
    setCardInput(data);
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#2471A3" /> */}
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
        }}
        style={styles.ImgStyle}
      />
      <CreditCardInput
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ccc"
        onChange={_onChange}
      />

      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    
  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button : {
    backgroundColor: COLORS.primary,
    width:150,
    height:45,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    borderRadius:5
  },
  buttonText : {
    fontSize: 15,
    color: COLORS.white,
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  inputContainerStyle : {
    backgroundColor: COLORS.white,
    borderRadius:5
  },
  inputStyle : {
    backgroundColor: COLORS.light,
    paddingLeft:15,
    borderRadius:5,
    color: COLORS.dark,
  },
  labelStyle : {
    marginBottom:5,
    fontSize:12
  }
 
});

export default StripeGateway;
