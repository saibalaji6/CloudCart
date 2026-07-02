import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const savedCart = localStorage.getItem("cartItems");
  const savedOrders = localStorage.getItem("orders");

  const [cartItems, setCartItems] = useState(
    savedCart ? JSON.parse(savedCart) : []
  );

  const [orders, setOrders] = useState(
    savedOrders ? JSON.parse(savedOrders) : []
  );

  const saveCart = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  };

  const saveOrders = (orderList) => {
    localStorage.setItem("orders", JSON.stringify(orderList));
    setOrders(orderList);
  };

  const addToCart = (product) => {
  const existingProduct = cartItems.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    const updatedCart = cartItems.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    saveCart(updatedCart);
  } else {
    const updatedCart = [
      ...cartItems,
      { ...product, quantity: 1 },
    ];

    saveCart(updatedCart);
  }
};

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((item, index) => index !== indexToRemove);
    saveCart(updatedCart);
  };
  const increaseQuantity = (productId) => {
  const updatedCart = cartItems.map((item) =>
    item.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );

  saveCart(updatedCart);
};

const decreaseQuantity = (productId) => {
  const updatedCart = cartItems
    .map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0);

  saveCart(updatedCart);
};

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      customer: orderDetails,
      createdAt: new Date().toLocaleString(),
    };

    const updatedOrders = [...orders, newOrder];

    saveOrders(updatedOrders);
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{
  cartItems,
  orders,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  placeOrder,
}}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;