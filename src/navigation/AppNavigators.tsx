// navigation/AppNavigators.tsx

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

// Definisikan tipe param list stack navigator
export type RootStackParamList = {
  Products: undefined;
  ProductDetail: { productId: number };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigators = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen name="Products" component={ProductListScreen} options={({ navigation }) => ({
            title: 'Produk',
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Text style={{ fontSize: 22, marginRight: 10 }}>🛒</Text>
            </TouchableOpacity>
            ),
        })} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={({ navigation }) => ({
            title: 'Produk',
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Text style={{ fontSize: 22, marginRight: 10 }}>🛒</Text>
            </TouchableOpacity>
            ),
        })} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigators;
