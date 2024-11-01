import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [bannerImage, setBannerImage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isPaymentVisible, setIsPaymentVisible] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
// State for registration
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + (parseFloat(product.price) * product.quantity), 0).toFixed(2);
  };
  
  
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);

      if (data.length > 0) {
        setBannerImage(data[0].image);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Could not load products. Please try again later.");
    }
  };

  useEffect(() => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/users");
      const users: User[] = await response.json();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setIsLoggedIn(true);
        setUsername(""); // Clear username and password
        setPassword("");
      } else {
        Alert.alert("Error", "Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Could not log in. Please try again later.");
    }
  };
  const handleRegister = async () => {
    // Logic for registration (e.g., saving the new user to a database)
    Alert.alert("Success", `User ${newUsername} has been registered.`);
    // Reset fields
    setNewUsername("");
    setNewPassword("");
    setIsRegisterVisible(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  const viewCart = () => {
    setIsCartVisible(true);
  };

  const closeCart = () => {
    setIsCartVisible(false);
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    Alert.alert("Success", `Product has been removed from the cart.`);
  };

  const handlePayment = () => {
    Alert.alert("Payment Success", `Your payment with card ${cardNumber} has been processed.`);
    // Reset cart and close payment form
    setCart([]);
    setCardNumber("");
    setIsPaymentVisible(false);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <TouchableOpacity onPress={() => viewProductDetails(item)}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCartItem = ({ item }: { item: Product }) => (
    <View style={styles.cartItem}>
       <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <Text style={styles.cartItemTitle}>{item.title}</Text>
      <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
      <Text style={styles.cartItemQuantity}> Quantity:{item.quantity}</Text> {/* Hiển thị số lượng */}
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text style={styles.removeButtonText}> Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.homepage}>
      {!isLoggedIn ? (
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Login</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
           {/* Registration Button */}
           <TouchableOpacity onPress={() => setIsRegisterVisible(true)} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
           {/* Registration Modal */}
           {isRegisterVisible && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={isRegisterVisible}
              onRequestClose={() => setIsRegisterVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Register</Text>
                  <TextInput
                    placeholder="Username"
                    value={newUsername}
                    onChangeText={setNewUsername}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    style={styles.input}
                  />
                  <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsRegisterVisible(false)}
                    style={styles.modalCloseButton}
                  >
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Image source={{ uri: bannerImage }} style={styles.bannerImage} />
            <Text style={styles.bannerText}>Shop Now for the Best Deals!</Text>
            <View style={styles.headerContent}>
              <TextInput
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
              />
              <TouchableOpacity style={styles.headerButton} onPress={viewCart}>
                <Icon name="shopping-cart" size={20} color="#FFD700" />
                {cart.length > 0 && <View style={styles.cartCount}><Text style={styles.cartCountText}>{cart.length}</Text></View>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Icon name="user" size={20} color="#FFD700" />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            style={styles.productList}
          />
        </>
      )}

      {selectedProduct && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!selectedProduct}
          onRequestClose={closeDetails}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Image
                source={{ uri: selectedProduct.image }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
              <Text style={styles.modalPrice}>${selectedProduct.price}</Text>
              <Text style={styles.modalDescription}>
                Product details will go here.
              </Text>
              <TouchableOpacity
                onPress={closeDetails}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {isCartVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isCartVisible}
          onRequestClose={closeCart}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Shopping Cart</Text>
              <FlatList
                data={cart}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id.toString()}
              />
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => setIsPaymentVisible(true)}
                disabled={cart.length === 0}
              >
                <Text style={styles.paymentButtonText}>Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeCart}
                style={styles.modalCloseButton}
              >
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
{isPaymentVisible && (
  <Modal
    transparent={true}
    animationType="slide"
    visible={isPaymentVisible}
    onRequestClose={() => setIsPaymentVisible(false)}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Payment</Text>
        <Text style={styles.modalTotal}>Total: ${calculateTotal()}</Text> {/* Hiển thị tổng tiền */}
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <TextInput
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          style={styles.input}
        />
        
        <TouchableOpacity
          onPress={handlePayment}
          style={styles.paymentButton}
        >
          <Text style={styles.paymentButtonText}>Pay Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsPaymentVisible(false)}
          style={styles.modalCloseButton}
        >
          <Text style={styles.modalCloseButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  homepage: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalContainer: {
    width: '100%', // Thay đổi chiều rộng tại đây
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10, // Thêm độ đổ bóng
  },
  input: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  header: {
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  bannerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "60%",
  },
  headerButton: {
    padding: 10,
  },
  cartCount: {
    position: "absolute",
    right: 0,
    top: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCountText: {
    color: "white",
    fontWeight: "bold",
  },
  productList: {
    marginTop: 10,
  },
  productItem: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontWeight: "bold",
    marginTop: 5,
  },
  productPrice: {
    color: "#888",
  },
  addToCartButton: {
    backgroundColor: "#FFD700",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  addToCartButtonText: {
    color: "#fff",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: "#fff",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cartItemTitle: {
    fontSize: 16,
  },
  cartItemPrice: {
    color: "#888",
  },
  removeButtonText: {
    color: "red",
  },
  paymentButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modalTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cartItemImage: {
    width: 50, 
    height: 50, 
    marginRight: 10,
  },

});

export default App;
