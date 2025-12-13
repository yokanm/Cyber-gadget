'use client';

import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartBadge() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  // Only show badge after component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <Link href="/cart">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {mounted && totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs font-bold rounded-full flex items-center justify-center">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}