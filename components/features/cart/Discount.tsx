"use client";
import { Product } from '@/type/type'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useWishlist } from '@/contexts/WishlistContext'
import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import { createSlug } from '@/lib/utils';

// Predefined discount percentages
const DISCOUNT_OPTIONS = [5, 10, 15, 20, 25, 30];
const ROTATION_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Helper function to get random discount
const getRandomDiscount = () => {
  return DISCOUNT_OPTIONS[Math.floor(Math.random() * DISCOUNT_OPTIONS.length)];
};

// Helper function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface ProductWithDiscount extends Product {
  discount: number;
}

export default function Discount() {
  const [products, setProducts] = useState<ProductWithDiscount[]>([])
  const [rotationKey, setRotationKey] = useState(0); // Key to trigger re-randomization
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // Shuffle products and assign random discounts
        const shuffled = shuffleArray(data);
        const productsWithDiscounts = shuffled.map(product => ({
          ...product,
          discount: getRandomDiscount()
        }));
        setProducts(productsWithDiscounts);
      } catch(error) {
        console.error('Failed to load products:', error);
      }
    };
    
    loadProducts();
  }, [rotationKey]); // Re-fetch when rotationKey changes

  // Set up interval to rotate products every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationKey(prev => prev + 1); // Trigger product reload
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);
  
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { success, info } = useToast()

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      id: product.id,
      name: product.model,
      model: product.model,
      price: product.price,
      images: product.images,
      category: product.category
    })
    
    info(`${product.model} added to cart!`)
  }

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      success('Removed from wishlist')
    } else {
      addToWishlist({
        id: product.id,
        name: product.model,
        model: product.model,
        price: product.price,
        images: product.images,
        category: product.category,
        brand: product.brand,
        addedAt: new Date().toISOString()
      })
      success('Added to wishlist')
    }
  }

  return (
    <>
      <h2 className="text-2xl font-medium text-black leading-8 mb-8">
        Discounts up to -50%
      </h2>

      {/* Responsive grid & horizontal scroll for mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {products.slice(0,4).map((product) => {
          const discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);

          return (
            <div
              key={product.id}
              className='relative bg-[#F6F6F6] flex flex-col items-center py-6 px-3 md:px-4 gap-2 rounded-lg md:gap-4 shadow-sm hover:shadow-md transition'
            >
              <span className="absolute top-1 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -{product.discount}%
              </span>

              <button 
                className="absolute top-4 right-4 text-[#8B8B8B] hover:text-black z-10"
                onClick={(e) => handleWishlist(e, product)}
              >
                <Heart
                  aria-label={isInWishlist(product.id) 
                    ? 'Remove from wishlist' 
                    : 'Add to wishlist'}
                  className={`w-6 h-6 transition-all ${
                    isInWishlist(product.id)
                      ? 'fill-red-500 text-red-500 scale-110'
                      : 'text-[#8B8B8B] hover:text-red-500'
                  }`}
                />
              </button>

              <Link href={`/category/${product.category}/${createSlug(product.brand)}/${createSlug(product.model)}`} className="flex flex-col items-center w-full">
                <Image 
                  src={product.images?.[0] || "/placeholder.png"} 
                  alt={product.model} 
                  className='w-20 h-20 md:w-[104px] md:h-[104px] object-contain' 
                  width={104} 
                  height={104} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                  loading="lazy"
                />

                <p className='text-black text-center text-sm font-medium xl:text-lg mt-2'>
                  {product.model}
                </p>

                <div className="text-center mb-4 mt-2">
                  <p className="text-gray-400 line-through text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className='text-black text-center text-2xl font-semibold'>
                    ${discountedPrice}
                  </p>
                </div>
              </Link>

              <div>
                <Button  
                  onClick={(e) => handleAddToCart(e, product)}
                  className='py-5 px-6 md:py-6 md:px-8 xl:px-14 md:rounded-md bg-black rounded-sm text-white font-medium w-full'
                >
                  Buy Now
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}