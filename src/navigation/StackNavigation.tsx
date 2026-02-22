import React, { useState } from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';

import Home from '../modules/pet/screen/Home';
import Cart from '../modules/pet/screen/Cart';
import { PetUpload } from '../modules/pet/screen/PetUpload';
import MenuModal from '../components/MenuModal';
import { useCartStore } from '../modules/pet/store/cartStore';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const itemCount = useCartStore((state) => state.items.length);
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => setMenuVisible((prev) => !prev)}
                style={{ marginLeft: 15 }}
              >
                <Text style={{ fontSize: 24 }}>☰</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{ marginRight: 20 }}
              >
                <View style={{ position: 'relative' }}>
                  <Text style={{ fontSize: 24 }}>🛒</Text>
                  {itemCount > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        backgroundColor: 'red',
                        borderRadius: 10,
                        minWidth: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: '#fff', fontSize: 12 }}>
                        {itemCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="PetUpload" component={PetUpload} />
      </Stack.Navigator>

      {/* GLOBAL MENU MODAL */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
      >
        <Pressable
          
          onPress={() => setMenuVisible(false)}
        >
          <View style={{ 
            top:60,
            width: 200 ,
            bottom: 0,}}>
            <MenuModal
              closeModal={() => setMenuVisible(false)}
            />
          </View>
        </Pressable>
      </Modal>
    </NavigationContainer>
  );
};

export default StackNavigation;