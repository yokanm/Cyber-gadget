"use client"
import React, { useEffect, useState } from 'react'
// import Link from 'next/link';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/type/type';
import ProductsTab from '../products/ProductsTab';

import HomeProductCard from './HomeProductCard';
import { TriangleAlertIcon } from 'lucide-react';


const HomeGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState< 'new' | 'bestseller' | 'featured'>('new');
  
useEffect(() => {
    const loadProducts= async () => {

      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } 

      catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching products:', err);
      } 
      
      finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
// json-server --watch mock_products_200.json --port 5000
  const filteredProducts = products.filter(
    (product) => product.value?.toLowerCase() === selectedTab
  );
 
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-6 flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-500 text-9xl mb-4 text-center pl-20"><TriangleAlertIcon size={40}/></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to load products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className=" py-14 px-4  xl:px-40 xl:py-14 ">
      <ProductsTab selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      
      {/* you can render the product list here */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 ">
        {filteredProducts.slice(0,8).map((product) => (
          <HomeProductCard key={product.id} product={product}/>
        ))}
      </div>
{/* Empty state */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😢</div>
          <p className="text-gray-500 text-lg">No products found in this category</p>
        </div>
      )}
    
    </section>
  );
};

export default HomeGrid