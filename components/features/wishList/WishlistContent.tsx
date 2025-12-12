'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { createSlug } from '@/lib/utils';

export default function WishlistContent() {
  const {
    wishlistItems,
    removeFromWishlist,
    totalItems,
    clearWishlist
  } = useWishlist();

  const { addToCart } = useCart();
  const { success } = useToast();
  
  // Calculate total value
  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  const handleMoveToCart = (itemId: string | number) => {
    const item = wishlistItems.find(i => i.id === itemId);
    if (!item) return;

    // Add to cart
    addToCart({
      id: item.id,
      name: item.name,
      model: item.model,
      price: item.price,
      images: item.images,
      category: item.category,
    });

    // Remove from wishlist
    removeFromWishlist(itemId);
    success(`${item.name} moved to cart!`);
  };

  const handleRemove = (itemId: string | number, itemName: string) => {
    removeFromWishlist(itemId);
    success(`${itemName} removed from wishlist`);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      success('Wishlist cleared');
    }
  };

  if (totalItems === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-md px-4">
            Save your favorite items for later shopping
          </p>
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-black hover:bg-gray-900 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-lg transition-all hover:shadow-lg"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className='max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 xl:px-40 xl:py-14'>
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-8 sm:mb-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">
              My Wishlist
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
              <span className="block sm:inline">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline mt-1 sm:mt-0">
                Total: <span className="text-gray-900 font-bold">${totalValue.toFixed(2)}</span>
              </span>
            </p>
          </div>
          
          {/* Clear All Button */}
          {totalItems > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors"
            >
              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="inline">Clear All</span>
            </Button>
          )}
        </div>
      </div>

      {/* Wishlist Items Grid */}
      <div className="bg-gray-50 px-3 sm:px-4 md:px-6 py-6 sm:py-8 rounded-xl">
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
          {wishlistItems.map((item)=>(
            <div
              key={item.id}
              className="relative bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group p-3 sm:p-4 lg:p-5 border border-gray-100"
            >
              <Link href={`/category/${item.category}/${createSlug(item.brand)}/${createSlug(item.model)}`}>
                {/* Product Image */}
                <div className="relative w-full aspect-square mb-3">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={75}
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-gray-400">No image</span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <div className='relative'>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemove(item.id, item.name);
                      }}
                      className="absolute -right-1 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white shadow-sm transition-colors "
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600 hover:text-red-700 transition-colors" />
                    </button>
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="space-y-2 sm:space-y-3">
                <p className='text-gray-900 text-center text-xs sm:text-sm lg:text-base font-semibold leading-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]'>
                  {item.model}
                </p>
                <p className='text-gray-900 text-center text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight'>
                  ${item.price.toFixed(2)}
                </p>

                {/* Add to Cart Button */}
                <Button  
                  onClick={(e) => {
                    e.preventDefault();
                    handleMoveToCart(item.id);
                  }}
                  className="w-full py-2.5 sm:py-3 lg:py-4 px-3 sm:px-4 bg-black hover:bg-gray-900 text-white font-semibold text-xs sm:text-sm lg:text-base rounded-lg transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                >
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1.5 sm:mr-2 lg:mr-3" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout CTA */}
        <div className="mt-8 sm:mt-12 bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border border-gray-100">
          <div className="text-center sm:text-left">
            <p className="text-gray-900 text-lg sm:text-xl font-bold mb-1 sm:mb-2">
              Ready to checkout?
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              Move items to your cart to continue
            </p>
          </div>
          <Link href="/cart" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-lg transition-all hover:shadow-lg"
            >
              Go to Cart
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}