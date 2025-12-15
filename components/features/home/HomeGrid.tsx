"use client"
import React, { useState } from 'react'
import { Product } from '@/type/type';
import ProductsTab from '../products/ProductsTab';
import HomeProductCard from './HomeProductCard';

interface HomeGridProps {
  products: Product[];
}

const HomeGrid = ({ products }: HomeGridProps) => {
  const [selectedTab, setSelectedTab] = useState<'new' | 'bestseller' | 'featured'>('new');
  
  const filteredProducts = products.filter(
    (product) => product.value?.toLowerCase() === selectedTab
  );

  return (
    <section className="py-14 px-4 xl:px-40 xl:py-14">
      <ProductsTab selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {filteredProducts.slice(0, 8).map((product) => (
          <HomeProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">😢</div>
          <p className="text-gray-500 text-lg">No products found in this category</p>
        </div>
      )}
    </section>
  );
};

export default HomeGrid