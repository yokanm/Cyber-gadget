import { Suspense } from 'react';
import ProtectedRoute from "@/components/features/auth/ProtectedRoute";
import Cart from "@/components/features/cart/Cart";

// Loading fallback for the cart page
function CartSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600">Loading cart...</p>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<CartSkeleton />}>
        <Cart />
      </Suspense>
    </ProtectedRoute>
  );
}