// contexts/WishlistContext.tsx
"use client";
import { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';
import { WishlistItem, WishlistContextType } from '@/type/type';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'wishlist';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWishlistItems(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever wishlist changes (but only after initialization)
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }, [wishlistItems, isInitialized]);

  const addToWishlist = useCallback((product: WishlistItem) => {
    setWishlistItems(current => {
      // Check if already exists
      if (current.some(item => item.id === product.id)) {
        return current;
      }
      return [...current, product];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string | number) => {
    setWishlistItems(current => current.filter(item => item.id !== id));
  }, []);

  const isInWishlist = useCallback((id: string | number) => {
    return wishlistItems.some(item => item.id === id);
  }, [wishlistItems]);

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const totalItems = useMemo(() => wishlistItems.length, [wishlistItems]);

  const value = useMemo(() => ({
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    totalItems,
    clearWishlist
  }), [wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, totalItems, clearWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};