// contexts/CartContext.tsx
"use client"
import { CartContextType, CartItem } from '@/type/type';
import { createContext, useState, useEffect, useContext } from 'react';



const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false); 
  // Save cart to localStorage whenever it changes
  useEffect(() => {
      if (isMounted) {
          localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isMounted]);

    // Load cart from localStorage on mount
    useEffect(() => {
      setIsMounted(true);
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          setCartItems([]);
        }
      }
    }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(current => {
      const existingItem = current.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Item already in cart, increase quantity
        return current.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // New item, add to cart with quantity 1
        return [...current, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string | number) => {
    setCartItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (id: string | number) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const isInCart = (id: string | number) => {
    return cartItems.some(item => item.id === id);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemQuantity,
      isInCart,
      totalItems,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};