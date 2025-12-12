'use client';

import { User, LogOut } from 'lucide-react';
import Link from 'next/link';
import WishlistBadge from '../wishList/WishlistBadge';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CartBadge from '../cart/CartBadge';

export default function UserActions() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 pl-4 md:pl-0">
      {/* Wishlist */}
      <WishlistBadge />
      <CartBadge />
      
      {/* User Menu */}
      {isAuthenticated && user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {user.avatar ? (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.name[0].toUpperCase()}
              </div>
            )}
            <span className="hidden text-sm font-medium text-gray-700">
              {user.name.split(' ')[0]}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute left-0 md:left-auto md:right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {/* User Info */}
              <div className="p-2 md:p-4 bg-gray-50 border-b">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">My Profile</span>
                </Link>

                <div className="border-t my-2"></div>

                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Not Authenticated - Show Login/Signup
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}