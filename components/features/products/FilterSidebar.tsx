"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FilterSidebarProps } from "@/type/type";
import { useMemo } from "react";
import Search from "../search/Search";

interface ExtendedFilterSidebarProps extends FilterSidebarProps {
  priceRange: [number, number];
  priceBounds: { min: number; max: number };
  onPriceChange: (range: [number, number]) => void;
}

const FilterSidebar = ({
  availableBrands,
  availableSize, 
  availableBattery, 
  selectedBrands, 
  selectedBattery,
  selectedSize,
  searchQuery,
  setSearchQuery, 
  products, 
  toggleBrand, 
  toggleBattery,
  toggleSize,
}: ExtendedFilterSidebarProps) => {

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(product => {
      counts[product.brand] = (counts[product.brand] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-64"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium">Brand</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="space-y-2 max-h-64 overflow-auto pr-2">
              <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              {availableBrands.map(brand => (
                <div key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="h-3 w-3 accent-black cursor-pointer"
                  />
                  <label htmlFor={`brand-${brand}`} className="ml-2 text-black font-semibold">
                    {brand} <span className="text-gray-700">({brandCounts[brand] || 0})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium">Battery Capacity</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="space-y-2 max-h-64 overflow-auto pr-2">
              {availableBattery.map(battery => (
                <div key={battery} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`battery-${battery}`}
                    checked={selectedBattery.includes(battery)}
                    onChange={() => toggleBattery(battery)}
                    className="h-3 w-3 accent-black cursor-pointer"
                  />
                  <label htmlFor={`battery-${battery}`} className="ml-2 text-black font-semibold">
                    {battery}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium">Screen Diagonal</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <div className="space-y-2 max-h-64 overflow-auto pr-2">
              {availableSize.map(size => (
                <div key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`size-${size}`}
                    checked={selectedSize.includes(size)}
                    onChange={() => toggleSize(size)}
                    className="h-3 w-3 accent-black cursor-pointer"
                  />
                  <label htmlFor={`size-${size}`} className="ml-2 text-black font-semibold">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default FilterSidebar