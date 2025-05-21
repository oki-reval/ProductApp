import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { increaseQty, decreaseQty, removeFromCart, clearCart } from '../store/cartSlice';

const CartScreen = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)} x {item.quantity}</Text>
      </View>

      <View style={styles.qtyContainer}>
        <TouchableOpacity onPress={() => dispatch(decreaseQty(item.id))} style={styles.qtyButton}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(increaseQty(item.id))} style={styles.qtyButton}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
        <Text style={styles.remove}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Keranjang kosong.</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkout} onPress={() => dispatch(clearCart())}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#555' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  qtyText: { fontSize: 16 },
  qty: { marginHorizontal: 8 },
  remove: { fontSize: 18, marginLeft: 10 },
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  total: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  checkout: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default CartScreen;
