import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Sản phẩm A',
    price: 100000,
    quantity: 1,
    image: './../../assets/images/socola.jpg', // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: '2',
    name: 'Sản phẩm B',
    price: 200000,
    quantity: 1,
    image: './../../assets/images/socola.jpg',
  },
  {
    id: '3',
    name: 'Sản phẩm C',
    price: 150000,
    quantity: 1,
    image: './../../assets/images/socola.jpg',
  },
];

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' đ';
};

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, delta: number): void => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price)} x {item.quantity}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng: {formatPrice(total)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => alert('Đi đến thanh toán')}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF3E0', // Nền màu kem nhẹ nhàng
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3E2723', // Màu nâu chocolate cho tiêu đề
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Màu xám nhạt cho đường viền dưới mục
    alignItems: 'center',
    backgroundColor: '#fff', // Nền trắng cho mục
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5, // Bo góc cho ảnh sản phẩm
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    color: '#3E2723', // Màu nâu chocolate cho tên sản phẩm
  },
  itemPrice: {
    fontSize: 18,
    color: '#388E3C', // Màu xanh lá cây cho giá
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    fontSize: 18,
    color: '#3E2723', // Màu nâu chocolate cho nút + và -
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    color: '#3E2723', // Màu nâu chocolate cho văn bản số lượng
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0', // Màu xám nhạt cho đường viền trên tổng
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3E2723', // Màu nâu chocolate cho tổng
  },
  checkoutButton: {
    backgroundColor: '#3E2723', // Màu nâu chocolate cho nút
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Màu chữ trắng
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CartScreen;
