'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/type/type';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

interface CategoryData {
  name: string;
  slug: string;
  count: number;
  products: Product[];
  image: string;
}

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        
        const categoryMap = new Map<string, Product[]>();
        
        products.forEach((product) => {
          const category = product.category.toLowerCase();
          if (!categoryMap.has(category)) {
            categoryMap.set(category, []);
          }
          categoryMap.get(category)!.push(product);
        });

        const categoriesData: CategoryData[] = Array.from(categoryMap.entries()).map(
          ([category, categoryProducts]) => ({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            slug: category,
            count: categoryProducts.length,
            products: categoryProducts,
            image: categoryProducts[0]?.images?.[0] || '/placeholder.png'
          })
        );

        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-black rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section - Modern & Clean */}
      <section className="relative overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-purple-50 to-black opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                {categories.length} Collections Available
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
              Explore Our
              <span className="block bg-gradient-to-r from-gray-600 to-black bg-clip-text text-transparent">
                Collections
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Discover premium products curated across diverse categories. Find exactly what you&apos;re looking for.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{categories.length}+</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {categories.reduce((acc, cat) => acc + cat.count, 0)}+
                </div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {[...new Set(categories.flatMap(cat => cat.products.map(p => p.brand)))].length}+
                </div>
                <div className="text-sm text-gray-600">Brands</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid - Modern Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(category.slug)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      hoveredCard === category.slug ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Trending Badge (for categories with many products) */}
                  {category.count > 50 && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                      <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-xs font-semibold text-gray-900">Trending</span>
                    </div>
                  )}

                  {/* Product Count Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full">
                    <span className="text-xs font-semibold text-white">
                      {category.count} Items
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.count} products available
                      </p>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className={`w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center transition-all duration-300 ${
                      hoveredCard === category.slug ? 'bg-purple-600 scale-110' : ''
                    }`}>
                      <svg 
                        className={`w-5 h-5 transition-all duration-300 ${
                          hoveredCard === category.slug ? 'text-white translate-x-1' : 'text-purple-600'
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Featured Brands */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Top Brands
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(category.products.map(p => p.brand))]
                        .slice(0, 3)
                        .map((brand) => (
                          <span
                            key={brand}
                            className="px-2.5 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-200"
                          >
                            {brand}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Hover Shine Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 ${
                  hoveredCard === category.slug ? 'translate-x-full' : ''
                }`}></div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Zap className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Categories Yet
            </h2>
            <p className="text-gray-600">
              Our collection is being curated. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-400 via-gray-200 to-gray-700">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Use our powerful search to discover products across all categories
            </p>
            
            <Link
              href="/search"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

       
      </section>
    </div>
  );
}