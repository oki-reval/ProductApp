import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/Product';

const ProductListScreen = () => {
  const dispatch = useAppDispatch();
  const { items: products } = useAppSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        placeholder="Search products..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Categories Tab */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.tab,
              selectedCategory === category && styles.activeTab,
            ]}
          >
            <Text style={selectedCategory === category ? styles.activeTabText : styles.tabText}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 40,
  },
  tabContainer: { marginBottom: 22 ,height: 38},
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    height:33
  },
  activeTab: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  tabText: { color: '#333', fontSize: 14 },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  list: { paddingBottom: 100 },
});

export default ProductListScreen;
