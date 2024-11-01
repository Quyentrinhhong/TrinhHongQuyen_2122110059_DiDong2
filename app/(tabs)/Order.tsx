import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string; // Thêm thuộc tính hình ảnh
}

const CheckoutScreen: React.FC = () => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  // Dữ liệu ví dụ cho giỏ hàng
  const cartItems: Product[] = [
    {
      id: '1',
      name: 'Sản phẩm 1',
      price: 450000,
      quantity: 1,
      image: './../../assets/images/socola.jpg', // Đường dẫn đến hình ảnh
    },
    {
      id: '2',
      name: 'Sản phẩm 2',
      price: 350000,
      quantity: 2,
      image: './../../assets/images/socola.jpg', // Đường dẫn đến hình ảnh
    },
  ];
 

  
  const handleCheckout = () => {
    Alert.alert('Thanh toán thành công!', `Cảm ơn ${recipientName} đã mua hàng!`);
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderCartItem = ({ item }: { item: Product }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{item.price.toLocaleString()} đ</Text>
        <Text style={styles.cartItemQuantity}>Số lượng: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thông tin người nhận</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ tên"
        value={recipientName}
        onChangeText={setRecipientName}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ nhận hàng"
        value={recipientAddress}
        onChangeText={setRecipientAddress}
      />
      
      <Text style={styles.title}>Phương thức thanh toán</Text>
      <View style={styles.paymentMethodContainer}>
        <TouchableOpacity
          style={[styles.paymentMethodButton, paymentMethod === 'credit_card' && styles.selectedPaymentMethod]}
          onPress={() => setPaymentMethod('credit_card')}
        >
          <Text style={styles.paymentMethodText}>Thẻ tín dụng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentMethodButton, paymentMethod === 'cash' && styles.selectedPaymentMethod]}
          onPress={() => setPaymentMethod('cash')}
        >
          <Text style={styles.paymentMethodText}>Tiền mặt khi nhận hàng</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>Đơn hàng của bạn</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        style={styles.cartList}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng: {totalAmount.toLocaleString()} đ</Text>
      </View>
      
      <TouchableOpacity style={styles.paymentButton} onPress={handleCheckout}>
        <Text style={styles.paymentButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFEBCD', // Nền màu bánh quy nhẹ
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3E2723', // Màu nâu chocolate cho tiêu đề
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D2691E', // Viền màu nâu socola
    borderRadius: 5,
    backgroundColor: '#FFFFFF', // Nền trắng
    marginBottom: 15,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentMethodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#D2691E', // Viền màu nâu socola
    borderRadius: 5,
    backgroundColor: '#FFF3E0', // Nền màu kem nhạt cho nút
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedPaymentMethod: {
    backgroundColor: '#D2691E', // Nền màu nâu socola cho nút đã chọn
  },
  paymentMethodText: {
    color: '#3E2723', // Chữ màu nâu chocolate
  },
  cartList: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D2691E', // Viền màu nâu socola
    borderRadius: 5,
    backgroundColor: '#FFF3E0', // Nền màu kem cho sản phẩm trong giỏ
    marginBottom: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    color: '#3E2723', // Chữ màu nâu chocolate
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#D2691E', // Màu nâu socola cho giá sản phẩm
  },
  cartItemQuantity: {
    fontSize: 12,
    color: '#777',
  },
  totalContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#D2691E', // Viền màu nâu socola
    borderRadius: 5,
    backgroundColor: '#FFF3E0', // Nền màu kem cho tổng
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723', // Màu nâu chocolate cho tổng
  },
  paymentButton: {
    backgroundColor: '#3E2723', // Màu cam cho nút thanh toán
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff', // Màu chữ trắng cho nút thanh toán
    fontWeight: 'bold',
    fontSize: 18,
  },


});


export default CheckoutScreen;
