'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PriceFilterModalProps {
  priceRange: [number, number];
  priceBounds: { min: number; max: number };
  onPriceChange: (range: [number, number]) => void;
}

export default function PriceFilterModal({
  priceRange,
  priceBounds,
  onPriceChange,
}: PriceFilterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState<[number, number]>(priceRange);

  const handleMinChange = (value: string) => {
    const numValue = parseInt(value) || priceBounds.min;
    setTempRange([Math.min(numValue, tempRange[1]), tempRange[1]]);
  };

  const handleMaxChange = (value: string) => {
    const numValue = parseInt(value) || priceBounds.max;
    setTempRange([tempRange[0], Math.max(numValue, tempRange[0])]);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, isMax: boolean) => {
    const value = parseInt(e.target.value);
    if (isMax) {
      setTempRange([tempRange[0], Math.max(value, tempRange[0])]);
    } else {
      setTempRange([Math.min(value, tempRange[1]), tempRange[1]]);
    }
  };

  const handleApply = () => {
    onPriceChange(tempRange);
    setIsOpen(false);
  };

  return (
    <div className="mb-6 border-b pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-lg font-medium"
      >
        <span>Price</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6">
          {/* Price Input Fields */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                type="number"
                value={tempRange[0]}
                onChange={(e) => handleMinChange(e.target.value)}
                min={priceBounds.min}
                max={tempRange[1]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Min"
              />
            </div>
            <span className="text-gray-400">-</span>
            <div className="flex-1">
              <input
                type="number"
                value={tempRange[1]}
                onChange={(e) => handleMaxChange(e.target.value)}
                min={tempRange[0]}
                max={priceBounds.max}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Dual Range Slider */}
          <div className="relative pt-2 pb-6">
            <div className="relative h-1 bg-gray-200 rounded">
              {/* Selected Range Bar */}
              <div
                className="absolute h-1 bg-black rounded"
                style={{
                  left: `${((tempRange[0] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                  right: `${100 - ((tempRange[1] - priceBounds.min) / (priceBounds.max - priceBounds.min)) * 100}%`,
                }}
              />
            </div>

            {/* Min Slider */}
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              value={tempRange[0]}
              onChange={(e) => handleSliderChange(e, false)}
              className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              style={{ top: 0 }}
            />

            {/* Max Slider */}
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              value={tempRange[1]}
              onChange={(e) => handleSliderChange(e, true)}
              className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              style={{ top: 0 }}
            />
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full bg-black text-white py-2.5 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
