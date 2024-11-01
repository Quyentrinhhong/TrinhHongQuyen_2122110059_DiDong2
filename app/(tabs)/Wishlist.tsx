import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const initialWishlist: Product[] = [
  {
    id: '1',
    name: 'Sản phẩm 1',
    price: 200000,
    image: './../../assets/images/socola.jpg',
  },
  {
    id: '2',
    name: 'Sản phẩm 2',
    price: 350000,
    image: './../../assets/images/socola.jpg',
  },
  {
    id: '3',
    name: 'Sản phẩm 3',
    price: 450000,
    image: './../../assets/images/socola.jpg',
  },
];

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState<Product[]>(initialWishlist);

  const removeFromWishlist = (id: string) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            setWishlist(wishlist.filter(product => product.id !== id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderWishlistItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price.toLocaleString()} đ</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromWishlist(item.id)}
      >
        <Text style={styles.removeButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách yêu thích</Text>
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id}
          renderItem={renderWishlistItem}
        />
      ) : (
        <Text style={styles.emptyText}>Không có sản phẩm nào trong danh sách yêu thích.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    backgroundColor: '#FF9888',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default WishlistScreen;
