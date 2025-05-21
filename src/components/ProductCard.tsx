import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store';
import { addToCart } from '../store/cartSlice';
import { Product } from '../types/Product';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigators';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [added, setAdded] = useState(false);
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
    };

    const handleViewDetails = () => {
        navigation.navigate('ProductDetail', { productId: Number(product.id) });
    };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.category}>{product.category}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleViewDetails}>
            <Text style={styles.buttonText}>Lihat Detail</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.cartButton]} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>{added ? '✅ Ditambahkan!' : 'Keranjang'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 6,
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ProductCard;
