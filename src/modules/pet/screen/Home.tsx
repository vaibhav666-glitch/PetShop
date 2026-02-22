import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { getRandomPet } from "../../../service/petApiService";
import { useCartStore } from "../store/cartStore";

export default function Home({ navigation }) {
  //const navigation = useNavigation<any>();

  const [pet, setPet] = useState<any>(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRandomPet();

        setPet({
          id: "1",
          name: "Golden Retriever",
          price: 5000,
          image: data.message,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const isInCart = items.some((item) => item.id === pet?.id);

  if (!pet) return null;

  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        <Image
          source={{ uri: pet.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.title}>{pet.name}</Text>
        <Text style={styles.price}>₹{pet.price}</Text>

        {!isInCart ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(pet)}
          >
            <Text style={styles.buttonText}>Add To Cart 🛒</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(pet.id)}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("Cart")}
            >
              <Text style={styles.buttonText}>Go To Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});