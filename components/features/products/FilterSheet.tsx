
'use client';

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import { Product } from '@/type/type';
import PriceFilterModal from './PriceFilterModal';

interface FilterSheetProps {
  availableBrands: string[];
  availableBattery: string[];
  availableSize: string[];
  selectedBrands: string[];
  selectedBattery: string[];
  selectedSize: string[];
  searchQuery: string;
  products: Product[];
  toggleBrand: (brand: string) => void;
  toggleBattery: (battery: string) => void;
  toggleSize: (size: string) => void;
  setSearchQuery: (query: string) => void;
  resultsCount?: number;
  priceRange: [number, number];
  priceBounds: { min: number; max: number };
  onPriceChange: (range: [number, number]) => void;
}

export default function FilterSheet({
  availableBrands,
  availableBattery,
  availableSize,
  selectedBrands,
  selectedBattery,
  selectedSize,
  searchQuery,
  products,
  toggleBrand,
  toggleBattery,
  toggleSize,
  setSearchQuery,
  resultsCount = 0,
  priceRange,
  priceBounds,
  onPriceChange,
}: FilterSheetProps) {
  const [open, setOpen] = useState(false);

  const handleApply = () => {
    setOpen(false);
  };

  const clearAllFilters = () => {
    selectedBrands.forEach(brand => toggleBrand(brand));
    selectedBattery.forEach(battery => toggleBattery(battery));
    selectedSize.forEach(size => toggleSize(size));
    setSearchQuery('');
    onPriceChange([priceBounds.min, priceBounds.max]);
  };

  const hasActiveFilters = 
    selectedBrands.length > 0 || 
    selectedBattery.length > 0 || 
    selectedSize.length > 0 ||
    searchQuery.length > 0 ||
    priceRange[0] !== priceBounds.min ||
    priceRange[1] !== priceBounds.max;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center gap-6 border-2 rounded-md px-3.5 py-4">
          <SheetTitle className='text-sm font-normal'>Filter</SheetTitle>
          <div className='ml-3'>
            <SlidersHorizontal className="w-5 h-5" />
          </div>
        </div>
      </SheetTrigger>

      <SheetContent
        side='left'
        className="w-full sm:max-w-md p-0 flex flex-col [&>button:last-child]:hidden"
      >
        <SheetHeader className='px-6 py-4 border-b'>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <SheetClose asChild>
                <ChevronLeft className='w-6 h-6 font-light mt-1.5 text-gray-500 cursor-pointer'/>
              </SheetClose>
              <SheetTitle className='text-2xl font-semibold'>Filters</SheetTitle>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-md text-red-500 hover:text-red-700 underline"
              >
                Clear all
              </button>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Price Filter - Mobile Only */}
          <PriceFilterModal
            priceRange={priceRange}
            priceBounds={priceBounds}
            onPriceChange={onPriceChange}
          />

          <FilterSidebar
            availableBrands={availableBrands}
            availableBattery={availableBattery}
            availableSize={availableSize}
            selectedBrands={selectedBrands}
            selectedBattery={selectedBattery}
            selectedSize={selectedSize}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            products={products}
            toggleBrand={toggleBrand}
            toggleBattery={toggleBattery}
            toggleSize={toggleSize}
            priceRange={priceRange}
            priceBounds={priceBounds}
            onPriceChange={onPriceChange}
          />
        </div> 

        <div className="border-t p-4 bg-white">
          <Button 
            onClick={handleApply}
            className="w-full h-12 text-base font-medium"
          >
            Apply {resultsCount > 0 && `(${resultsCount} products)`}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
