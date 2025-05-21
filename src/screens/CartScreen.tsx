import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet ,Alert} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { increaseQty, decreaseQty, removeFromCart, clearSelected } from '../store/cartSlice';

const CartScreen = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
  const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
  
  if (selectedItems.length === 0) {
    Alert.alert('Please choose product before checkout');
    return;
  }

  const productNames = selectedItems.map(item => item.title).join(', ');

  // Checkout hanya produk yang dichecklist
  selectedItems.forEach(item => {
    dispatch(removeFromCart(item.id));
  });

  // Reset checklist
  dispatch(clearSelected());
  Alert.alert(` successfully checkout: ${productNames}`);
};

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleSelect(item.id)} style={styles.checkbox}>
        <Text style={styles.checkboxText}>
          {selectedIds.includes(item.id) ? '✅' : '⬜'}
        </Text>
      </TouchableOpacity>

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
        ListEmptyComponent={<Text>Empty product </Text>}
      />

      <Text style={styles.selectedText}>
        {selectedIds.length} choose product to checkout
      </Text>

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkout} onPress={() => handleCheckout()}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: { marginRight: 10 },
  checkboxText: { fontSize: 20 },
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
  selectedText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
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
