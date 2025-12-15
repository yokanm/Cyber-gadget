'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/type/type';
import ProductCard from '@/components/features/products/ProductCard';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';

// Separate the search logic into its own component
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();

    return products.filter((product) => {
      return (
        product.model.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.details?.toLowerCase().includes(searchTerm) ||
        (product.specifications?.CPU || '').toLowerCase().includes(searchTerm)
      );
    });
  }, [products, query]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, Product[]> = {};
    
    searchResults.forEach((product) => {
      const category = product.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
    });

    return groups;
  }, [searchResults]);

  if (loading) {
    return (
      <div className="min-h-screen px-4 xl:px-40 py-12">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Searching...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="min-h-screen px-4 xl:px-40 py-12">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SearchIcon className="w-16 h-16 text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Start searching
          </h1>
          <p className="text-gray-600">
            Enter a search term to find products
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 xl:px-40 py-12">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600">
          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for{' '}
          <span className="font-semibold text-gray-900">&quot;{query}&quot;</span>
        </p>
      </div>

      {/* No Results */}
      {searchResults.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <SearchIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No results found
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            We couldn&apos;t find any products matching &quot;{query}&quot;. Try different keywords or browse our categories.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* Results by Category */}
      {Object.entries(groupedResults).map(([category, categoryProducts]) => (
        <div key={category} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold capitalize">
              {category}
              <span className="ml-2 text-lg text-gray-500 font-normal">
                ({categoryProducts.length})
              </span>
            </h2>
            <Link
              href={`/category/${category}`}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all in {category} →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}

      {/* Search Tips */}
      {searchResults.length > 0 && searchResults.length < 5 && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            Search Tips
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Try using different keywords</li>
            <li>• Check your spelling</li>
            <li>• Use more general terms</li>
            <li>• Try searching by brand name</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen px-4 xl:px-40 py-12">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search...</p>
          </div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}