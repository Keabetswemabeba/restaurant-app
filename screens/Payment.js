import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { Secret_key, STRIPE_PUBLISHABLE_KEY } from "../keys";

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
      // Use the correct MIME type for your server
      Accept: "application/json",
      // Use the correct Content Type to send data to Stripe
      "Content-Type": "application/x-www-form-urlencoded",
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
  });
}
