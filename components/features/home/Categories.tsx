'use client';
import { categoriesData } from '@/constants/data'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Product } from '@/type/type'

interface CategoriesProps {
  products: Product[];
}

function Categories({ products }: CategoriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return categoriesData.filter(category => 
      uniqueCategories.includes(category.title)
    );
  }, [products]);

  // Scroll functionality for chevrons
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowLeftChevron(container.scrollLeft > 0);
      setShowRightChevron(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [categories]);

  if (categories.length === 0) {
    return (
      <section className='py-16 px-4 gap-12 md:py-20 md:px-40'>
        <div className='flex justify-center items-center py-20'>
          <p className='text-gray-500'>No categories available</p>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 px-4 gap-12 md:pt-20 -mb-[80px] md:px-40 md:gap-8'>
      <div className='flex justify-between items-center pb-8'>
        <h2 className='text-2xl font-medium leading-8'>Browse By Categories</h2>
        
        <div className='hidden xl:flex items-center gap-2'>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            disabled={!showLeftChevron}
            className='h-10 w-10 rounded-full disabled:opacity-30'
            aria-label="Scroll categories left"
          >
            <ChevronLeft className='h-5 w-5' />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            disabled={!showRightChevron}
            className='h-10 w-10 rounded-full disabled:opacity-30'
            aria-label="Scroll categories right"
          >
            <ChevronRight className='h-5 w-5' />
          </Button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className='grid grid-cols-2 gap-4 xl:flex xl:gap-8 xl:overflow-x-auto xl:scrollbar-hide xl:scroll-smooth'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Link 
            key={category.title} 
            href={category.href} 
            className='flex flex-col items-center justify-center gap-2 min-w-[135px] max-w-[135px] rounded-2xl bg-[#EDEDED] py-6 px-4 hover:bg-[#E0E0E0] transition-colors duration-200'
            aria-label={`Browse ${category.title}`}
          >
            <div className='text-gray-700' aria-hidden="true">
              {category.icon}
            </div>
            <p className='text-center text-base font-medium leading-6'>
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories