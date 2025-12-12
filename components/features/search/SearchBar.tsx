'use client';

import { SearchIcon, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, FormEvent } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with URL params on mount/change
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
  }, [searchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    // Navigate to search results page with query parameter
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xs md:max-w-md">
      <div
        className={`flex items-center gap-2 px-4 py-4 rounded-md bg-neutral-100 transition-all ${
          isFocused ? 'ring-2 ring-black bg-white' : ''
        }`}
      >
        <SearchIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
        
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search products..."
          className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-stone-500"
          aria-label="Search products"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}

        {/* Keyboard shortcut hint - desktop only */}
        {!isFocused && !query && (
          <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 bg-white border border-gray-200 rounded">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </div>
    </form>
  );
}