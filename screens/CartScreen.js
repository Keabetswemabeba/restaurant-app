import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { PrimaryButton } from "../components/Button";

const CartScreen = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [num, setnum] = useState(1);
  const [prices, setPrices] = useState([]);

  let count = 1;

  const cart = [];

  const cartRef = collection(db, "cart");

  const getItems = async () => {
    console.log(cartRef);

    let data = await getDocs(cartRef);
    setFoods(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    setPrices(data.docs.map((doc) => doc.data().price));
  };

  const sum = prices.reduce((total, price)=> {
    const roundedPrice = Math.round(price)
    return total + roundedPrice
  }, 0)
  console.log(sum);

  const deleteFood = async (id) => {
    console.log(cartRef, id);
    let task = doc(cartRef, id);
    console.log("task: ");
    // return
    await deleteDoc(task)
      .then((promise) => {
        alert("deleted");
        getItems();
      })
      .catch();
    getItems();
  };

  useEffect(() => {
    console.log("some");
    getItems();
    console.log(prices);
  }, []);

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image source={{ uri: item.image }} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 16, color: COLORS.dark }}
          >
            {item.foodName}
          </Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {item.ingredients}
          </Text>
          <Text
            style={{ fontSize: 17, fontWeight: "bold", color: COLORS.dark }}
          >
            R{item.price}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <TouchableOpacity
            style={style.actionBtn}
            onPress={() => deleteFood(item.id)}
          >
            <Icon name="remove" size={25} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={foods}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total Price
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>R{sum}</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton
                title="CHECKOUT"
                onPress={() => navigation.navigate("PaymentScreen")}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.light,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default CartScreen;
