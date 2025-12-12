'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { ReactNode } from 'react';


export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}