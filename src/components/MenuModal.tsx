import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function MenuModal({closeModal  }: any) {
  const navigation=useNavigation()
  return (
    <View style={styles.modalContainer}>
    
      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => {
          closeModal();
          navigation.navigate("Cart");
        }}
      >
        <Text style={styles.modalButtonText}>Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.modalButton}
        onPress={() => {
          closeModal();
          navigation?.navigate?.("PetUpload");
        }}
      >
        <Text style={styles.modalButtonText}>Upload Pet</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
 modalOverlay: {
    position: 'absolute',
    top: 95,
    left: 0,
    right: 200,
    bottom: 0,
    padding:10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // justifyContent: 'center',
    // alignItems: 'center',
    zIndex: 15,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});