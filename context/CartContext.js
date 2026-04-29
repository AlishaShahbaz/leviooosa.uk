"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const savedCart = localStorage.getItem("levioosa_cart");
        if (savedCart) setCart(JSON.parse(savedCart));

        const res = await fetch('/api/cart');
        if (res.ok) {
          const dbCart = await res.json();
          if (dbCart && dbCart.length > 0) setCart(dbCart);
        }
      } catch (err) {
        console.error("Initial cart fetch error:", err);
      } finally {
        setIsMounted(true);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("levioosa_cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem("levioosa_cart");
    try {
      await fetch('/api/cart', { method: 'DELETE' });
    } catch (err) {
      console.error("DB Clear Error:", err);
    }
  };

  const addToCart = async (product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
    try {
      await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, quantity: 1 }),
      });
    } catch (err) { console.error(err); }
  };

  const removeFromCart = async (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
    try {
      await fetch(`/api/cart?id=${id}&size=${size}`, { method: 'DELETE' });
    } catch (err) { console.error(err); }
  };

  const updateQuantity = async (id, size, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
    try {
      await fetch('/api/cart/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, size, delta }),
      });
    } catch (err) { console.error(err); }
  };

  // Naya Helper: Cart band karne ke liye
  const closeCart = () => setIsOpen(false);

  const cartTotal = cart.reduce((total, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, "")) 
      : item.price;
    return total + (price || 0) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (!isMounted) return null;

  return (
    <CartContext.Provider 
      value={{ 
        cart, addToCart, removeFromCart, updateQuantity, 
        isOpen, setIsOpen, closeCart, cartTotal, cartCount,
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};