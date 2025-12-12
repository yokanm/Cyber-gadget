'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import { Heart } from 'lucide-react';
import Link from 'next/link';


export default function WishlistBadge() {
  const { totalItems } = useWishlist();

  return (
    <div className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <Link href='/wishlist'>
        <Heart className="w-6 h-6 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}