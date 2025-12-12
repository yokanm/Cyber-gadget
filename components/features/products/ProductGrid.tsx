

import ProductCard from './ProductCard';
import { Product } from '@/type/type';
import ProductSort from './ProductSort';
import { useMemo } from 'react';
// import ProductSort from './ProductSort';

interface ProductGridProps{
  filteredProducts: Product[];
  paginatedProducts: Product[];
  currentSort?: string;
  onSortChange?: (sort: string) => void;
  
}
const ProductGrid = ({
                      filteredProducts,
                      paginatedProducts,
                      currentSort = 'rating',
                      onSortChange = () => {}
                    }: ProductGridProps) => {
  // Sort products based on currentSort
  const sortedProducts = useMemo(() => {
    const products = [...paginatedProducts];
    
    switch (currentSort) {
      case 'price_asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return products.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      case 'name':
        return products.sort((a, b) => a.model.localeCompare(b.model));
      default:
        return products;
    }
  }, [paginatedProducts, currentSort]);

  return (
    <section className="w-full md:w-3/4 max-w-[831px]">
      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between items-center mb-6 pt-8">
        <div className="w-1/3">
          <p className='text-gray-700'>
            Selected Products:{" "}
            <span className="font-semibold">{filteredProducts.length}</span>
          </p>
        </div>
        <ProductSort currentSort={currentSort} onSortChange={onSortChange}/>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-black">{filteredProducts.length}</span> products found
        </p>
      </div>
      
      {/* Product Grid - Responsive */}
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 md:gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {sortedProducts.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 text-lg">
              No products found matching your filters.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your filters or search criteria.
            </p>
          </div>
        )}
      </div>
    </section>

  )
}

export default ProductGrid
