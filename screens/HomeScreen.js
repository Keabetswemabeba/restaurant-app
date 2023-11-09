import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { db, storage } from "../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth } from "../config/firebase";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [foods, setFoods] = useState([]);
  const [theFoods, setTheFoods] = useState([])
  const [foodCategory, setFoodCategory] = useState([])
  const [dessertCategory, setDessertCategory] = useState([])
  const [drinksCategory, setDrinksCategory] = useState([])
  const [foodName, setFoodName] = useState("");
  const [foodIngredients, setFoodIngredients] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [addCart, setAddCart] = useState(false);

  // const foodCategory = [];
  // const dessertCategory = [];
  // const drinksCategory = [];

  const foodRef = collection(db, "foods");
  const cartRef = collection(db, "cart");

  const user = auth.currentUser;
  console.log(user);

  const signOut = async () => {
    auth.signOut().then(() => console.log("User signed out!"));
    navigation.push("Login");
  };

  const getItems = async () => {
    const storage = getStorage();
    console.log(foodRef);

    let data = await getDocs(foodRef);

    const q = query(collection(db, "foods"));
    const querySnapshot = await getDocs(q);
 
    querySnapshot.forEach(async (doc) => {
    console.log(doc.data());
      const imageUrl = await getDownloadURL(ref(storage, doc.data().image));
      theFoods.push({
        id: doc.id,
        name: doc.data().name,
        ingredients: doc.data().ingredients,
        price: doc.data().price,
        cart: addCart,
        image: imageUrl,
      });
    });

    setFoods(theFoods);
  };

  const food = async () => {
    const q = query(collection(db, "foods"), where("category", "==", "food"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      // console logging the item names in the food category
      console.log(doc.data().name);

      const imageUrl = await getDownloadURL(ref(storage, doc.data().image));
      foodCategory.push({
        name: doc.data().name,
        price: doc.data().price,
        ingredients: doc.data().ingredients,
        image: imageUrl,
      });
    });
    // console.log(foodCategory);
    setFoodCategory(foodCategory);
  };

  const dessert = async () => {
    const q = query(
      collection(db, "foods"),
      where("category", "==", "dessert"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      // console logging the item names in the dessert category
      console.log(doc.data().name);

      const imageUrl = await getDownloadURL(ref(storage, doc.data().image));
      dessertCategory.push({
        name: doc.data().name,
        price: doc.data().price,
        ingredients: doc.data().ingredients,
        image: imageUrl,
      });
    });
    // console.log(dessertCategory);
    setDessertCategory(dessertCategory);
  };
  const drinks = async () => {
    const q = query(collection(db, "foods"), where("category", "==", "drink"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      // console logging the item names in the drinks category
      console.log(doc.data().name);

      const imageUrl = await getDownloadURL(ref(storage, doc.data().image));
      drinksCategory.push({
        name: doc.data().name,
        price: doc.data().price,
        ingredients: doc.data().ingredients,
        image: imageUrl,
      });
    });
    // console.log(drinksCategory);
    setDrinksCategory(drinksCategory);
  };

  function some() {
    for (var i = 0; i < foods.length; i++) {
      if (foods[i].category === "drinks") {
        console.log(foods[i].name);
        setFoodName(foods[i].name);
        setFoodPrice(foods[i].price);
        setFoodIngredients(foods[i].ingredients);
        setFoodImage(foods[i].image);
      }
    }
  }

  useEffect(() => {
    console.log("some");
    getItems()
  }, []);

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={food}>
          <View
            style={{
              backgroundColor: selectedCategoryIndex
                ? COLORS.primary
                : COLORS.secondary,
              ...style.categoryBtn,
            }}
          >
            <View style={style.categoryBtnImgCon}>
              <Image
                source={require("../assets/catergories/burger.png")}
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
              />
            </View>
 
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                color: selectedCategoryIndex ? COLORS.dark : COLORS.primary,
              }}
            >
              Food
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={dessert}>
          <View
            style={{
              backgroundColor: selectedCategoryIndex
                ? COLORS.primary
                : COLORS.secondary,
              ...style.categoryBtn,
            }}
          >
            <View style={style.categoryBtnImgCon}>
              <Image
                source={require("../assets/catergories/dessert.jpg")}
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                color: selectedCategoryIndex ? COLORS.dark : COLORS.primary,
              }}
            >
              Dessert
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={drinks}>
          <View
            style={{
              backgroundColor: selectedCategoryIndex
                ? COLORS.primary
                : COLORS.secondary,
              ...style.categoryBtn,
            }}
          >
            <View style={style.categoryBtnImgCon}>
              <Image
                source={require("../assets/catergories/drink.jpg")}
                style={{
                  height: 35,
                  width: 35,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                color: selectedCategoryIndex ? COLORS.dark : COLORS.primary,
              }}
            >
              Drinks
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const Card = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 1,
        }}
      >
        {foods.length > 0 &&
          foods.map((food, index) => (
            <TouchableHighlight
              underlayColor={COLORS.white}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("DetailsScreen", food)}
              key={index}
            >
              <View style={style.card}>
                <View style={{ alignItems: "center", top: -40 }}>
                  <Image
                    source={{ uri: food.image }}
                    style={{
                      top: 50,
                      height: 100,
                      width: 120,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      objectFit: 'cover'
                    }}
                  />
                </View>
                <View style={{ marginHorizontal: 20 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginTop: 15,
                      fontWeight: "bold",
                      color: COLORS.dark,
                    }}
                  >
                    {food.name}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: COLORS.dark, marginTop: 2 }}
                  >
                    {food.ingredients}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: COLORS.dark,
                    }}
                  >
                    R{food.price}
                  </Text>
                  <TouchableOpacity
                    style={style.addToCartBtn}
                    onPress={async () => {
                      await addDoc(collection(db, "cart"), {
                        foodName: food.name,
                        price: food.price,
                        ingredients: food.ingredients,
                        num: 1,
                        image: food.image,
                      });
                      console.log("added");
                      console.log({ uri: food.image });
                    }}
                  >
                    <Icon name="add" size={20} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableHighlight>
          ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={[style.header, style.shadowProp]}>
        <View>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Text style={{ fontSize: 28, color: COLORS.dark }}>Hello,</Text>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                marginLeft: 10,
                color: COLORS.dark,
              }}
            >
              {user.displayName}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={require("../assets/profile-img.webp")}
            style={{ height: 50, width: 50, borderRadius: 25, marginTop: 15 }}
          />
          <TouchableOpacity
            style={{ paddingLeft: 10, marginTop: 20 }}
            onPress={signOut}
          >
            <Icon name="logout" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{ marginTop: 40, flexDirection: "row", paddingHorizontal: 20 }}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search For Food"
          />
        </View>
        <TouchableOpacity style={style.sortBtn} onPress={some}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View>
        <ListCategories />
      </View>
      <ScrollView>
        <Card style={{ backgroundColor: COLORS.dark }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.light,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
