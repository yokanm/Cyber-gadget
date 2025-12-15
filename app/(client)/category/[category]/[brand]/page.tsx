'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/type/type';
import { createSlug } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';


export default function SingleBrandPage() {
  const params = useParams();
  const brandSlug = params.brand as string;
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const { addToCart } = useCart();
  const { info } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const brandProducts = useMemo(() => {
    // Find products matching the brand slug
    let products = allProducts.filter(product => 
      createSlug(product.brand) === brandSlug
    );
    
    // Apply search filter
   if (searchQuery) {
  products = products.filter(product =>
    product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.details?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

    return products;
  }, [allProducts, brandSlug, searchQuery]);

  const brandName = brandProducts[0]?.brand || '';
  const brandImage = brandProducts[0]?.images?.[0] || '';

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.model,
      model: product.model,
      price: product.price,
      images: product.images,
      category: product.category
    });
    
    info(`${product.model} added to cart!`);
  };
 

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Brand Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-200 to-black border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-40 py-8">
          {/* Brand Logo & Info */}
          <div className="flex items-center gap-6 mb-6">
            {brandImage && (
              <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={brandImage}
                  alt={brandName}
                  width={80}
                  height={80}
                  className="object-contain p-2"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {brandName}
              </h1>
              <p className="text-gray-600">
                {brandProducts.length} products available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-40 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
           
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-40 py-8">
        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {brandProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-black hover:shadow-xl transition-all relative"
              >

                <Link href={`/category/${product.category}/${createSlug(product.brand)}/${createSlug(product.model)}`}>
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.model}
                        width={120}
                        height={120}
                        quality={75}
                        className="object-contain p-4 group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <ShoppingCart className="w-12 h-12 text-gray-300" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded capitalize">
                        {product.category}
                      </span>
                      {product.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-medium text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
                      {product.model}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.details}
                    </p>

                    <div className="pt-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="mt-4 w-full py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search' : 'This brand has no products available'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}



