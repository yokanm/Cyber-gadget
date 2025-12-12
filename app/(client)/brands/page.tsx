'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/type/type';
import { createSlug } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Search, TrendingUp, Award } from 'lucide-react';

interface BrandData {
  name: string;
  slug: string;
  productCount: number;
  categories: string[];
  priceRange: { min: number; max: number };
  featuredProduct: Product;
}

export default function AllBrandsPage() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();

        const brandMap = new Map<string, Product[]>();
        
        products.forEach((product) => {
          const brand = product.brand;
          if (!brandMap.has(brand)) {
            brandMap.set(brand, []);
          }
          brandMap.get(brand)!.push(product);
        });

        const brandsData: BrandData[] = Array.from(brandMap.entries())
          .map(([brand, brandProducts]) => {
            const prices = brandProducts.map(p => p.price);
            const categories = [...new Set(brandProducts.map(p => p.category))];
            
            return {
              name: brand,
              slug: createSlug(brand),
              productCount: brandProducts.length,
              categories,
              priceRange: {
                min: Math.min(...prices),
                max: Math.max(...prices)
              },
              featuredProduct: brandProducts[0]
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        setBrands(brandsData);
      } catch (error) {
        console.error('Failed to load brands:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularBrands = [...filteredBrands]
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, 8);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading brands...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-200 to-black border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-40 py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-black rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">All Brands</h1>
              <p className="text-gray-600 mt-1">
                Discover {brands.length} premium brands
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search for brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      {!searchQuery && popularBrands.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-40 py-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-gray-900" />
            <h2 className="text-2xl font-bold text-gray-900">Popular Brands</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {popularBrands.map((brand, index) => (
              <Link
                key={index}
                href={`/category/${brand.categories[0]}/${brand.slug}`} 
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-black hover:shadow-xl transition-all relative"
              >
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 px-2 py-1 bg-black text-white text-xs font-bold rounded-lg">
                    #1
                  </div>
                )}

                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {brand.featuredProduct?.images?.[0] ? (
                    <Image
                      src={brand.featuredProduct.images[0]}
                      alt={brand.name}
                      width={120}
                      height={120}
                      className="object-contain p-4 group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-gray-400">
                      {brand.name[0]}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-center text-gray-900 mb-1 group-hover:text-black">
                  {brand.name}
                </h3>
                <p className="text-xs text-center text-gray-500">
                  {brand.productCount} products
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Brands Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-40 py-8 pb-16">
        {!searchQuery && (
          <div className='mb-8'>
              <h2 className="text-2xl font-bold text-gray-900">All Brands</h2>
              <p className="text-sm text-gray-600">Click to explore products</p>
            </div> 
        )}
          
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/category/${brand.categories[0]}/${brand.slug}`}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-black hover:shadow-xl transition-all"
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {brand.featuredProduct?.images?.[0] ? (
                    <Image
                      src={brand.featuredProduct.images[0]}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="object-contain p-3 group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-gray-400">
                      {brand.name[0]}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-center text-gray-900 mb-1 group-hover:text-black text-sm">
                  {brand.name}
                </h3>
                <p className="text-xs text-center text-gray-500">
                  {brand.productCount} products
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No brands found</h3>
            <p className="text-gray-600">
              Try searching for something else
            </p>
          </div>
        )}
      </section>
    </div>
  );
}