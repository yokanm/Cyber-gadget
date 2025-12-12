// app/components/ProductSort.tsx
'use client';

interface ProductSortProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

export default function ProductSort({ currentSort, onSortChange }: ProductSortProps) {
  return (
    <div className="relative">
      <select 
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none border-2 rounded-md px-4 pr-10 py-4 md:py-2 text-sm font-normal w-full md:w-auto min-w-[180px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="rating">By rating</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest First</option>
        <option value="name">Name: A to Z</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="h-5 w-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}