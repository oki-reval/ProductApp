import React,{useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigators';
import { useAppDispatch,useAppSelector } from '../store';
import { addToCart } from '../store/cartSlice';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
    const route = useRoute<ProductDetailRouteProp>();
    const [added, setAdded] = useState(false);
    const { productId } = route.params;
    const product = useAppSelector(state =>
        state.products.items.find(p => p.id === productId)
    );
    const dispatch = useAppDispatch();

    if (!product) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Produk tidak ditemukan.</Text>
        </View>
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product?.thumbnail }} style={styles.thumbnail} />

      <Text style={styles.title}>{product?.title}</Text>
      <Text style={styles.brand}>{product?.brand}</Text>
      <Text style={styles.category}>Kategori: {product?.category}</Text>

      <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
      <Text style={styles.discount}>Diskon: {product?.discountPercentage}%</Text>
      <Text style={styles.stock}>{product?.availabilityStatus} ({product?.stock} pcs)</Text>
      <Text style={styles.rating}>Rating: {product?.rating} ⭐</Text>

      <Text style={styles.sectionTitle}>Deskripsi</Text>
      <Text style={styles.description}>{product?.description}</Text>

      <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
      <Text>{product?.shippingInformation}</Text>

      <Text style={styles.sectionTitle}>Garansi & Retur</Text>
      <Text>Garansi: {product?.warrantyInformation}</Text>
      <Text>Retur: {product?.returnPolicy}</Text>

      <Text style={styles.sectionTitle}>Tags</Text>
      <View style={styles.tagsContainer}>
        {product?.tags.map((tag: string) => (
          <Text key={tag} style={styles.tag}>#{tag}</Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Review</Text>
      {product?.reviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          <Text style={styles.reviewer}>{review.reviewerName} ({review.rating}⭐)</Text>
          <Text style={styles.comment}>"{review.comment}"</Text>
          <Text style={styles.date}>{new Date(review.date).toLocaleDateString()}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() =>handleAddToCart()}
      >
        <Text style={styles.cartButtonText}>{added ? '✅ Ditambahkan!' : '+ Tambah ke Keranjang'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: '#555',
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#28a745',
    marginBottom: 4,
  },
  discount: {
    fontSize: 14,
    color: '#e83e8c',
    marginBottom: 4,
  },
  stock: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 4,
    fontSize: 12,
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewer: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  comment: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  cartButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProductDetailScreen;
