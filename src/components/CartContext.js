// src/context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");
  const [lastAddedId, setLastAddedId] = useState(null);   // 🆕 track product

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.product_id);
      if (existing) {
        setMessage(`${product.product_name} quantity updated ✅`);
        setLastAddedId(product.product_id);
        return prev.map((item) =>
          item.id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      setMessage(`${product.product_name} added to cart successfully ✅`);
      setLastAddedId(product.product_id);
      return [...prev, { ...product, id: product.product_id, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setMessage("Item removed ❌");
    setLastAddedId(id);
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
    setMessage("Cart updated 🔄");
    setLastAddedId(id);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, message, lastAddedId }}>
      {children}
    </CartContext.Provider>
  );
};
