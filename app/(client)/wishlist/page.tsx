import { Suspense } from 'react';
import { Metadata } from 'next';
import WishlistContent from '@/components/features/wishList/WishlistContent';
import ProtectedRoute from '@/components/features/auth/ProtectedRoute';


export const metadata: Metadata = {
  title: 'My Wishlist | Your Store',
  description: 'View and manage your favorite products',
};

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<WishlistSkeleton />}>
          <WishlistContent />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}

function WishlistSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4">
              <div className="w-full h-48 bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
