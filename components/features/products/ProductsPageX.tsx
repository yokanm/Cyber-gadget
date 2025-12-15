"use client"
import { fetchProducts } from "@/lib/api"
import { Product } from "@/type/type"
import { useEffect, useMemo, useState, useCallback } from "react"
import { batteryList, brandLists, screenSize } from "@/constants/data"
import FilterSidebar from "./FilterSidebar"
import ProductGrid from "./ProductGrid"
import Pagination from "./Pagination"
import FilterSheet from "./FilterSheet"
import ProductSort from "./ProductSort"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

const ProductsPageX = ({category}: {category: string}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Initialize state from URL params
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const brands = searchParams.get('brands')
    return brands ? brands.split(',') : []
  })

  const [selectedBattery, setSelectedBattery] = useState<string[]>(() => {
    const battery = searchParams.get('battery')
    return battery ? battery.split(',') : []
  })

  const [selectedSize, setSelectedSize] = useState<string[]>(() => {
    const size = searchParams.get('size')
    return size ? size.split(',') : []
  })

  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page')
    return page ? parseInt(page) : 1
  })

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('search') || ''
  })

  const [sortBy, setSortBy] = useState(() => {
    return searchParams.get('sort') || 'rating'
  })

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    return [
      minPrice ? parseInt(minPrice) : 0,
      maxPrice ? parseInt(maxPrice) : 2000
    ]
  })

  // Update URL when filters change
  const updateURL = useCallback((updates: Record<string, string | string[] | number | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','))
      } else {
        params.set(key, String(value))
      }
    })

    // Remove default values to keep URL clean
    if (params.get('sort') === 'rating') params.delete('sort')
    if (params.get('page') === '1') params.delete('page')

    const newURL = params.toString() ? `${pathname}?${params}` : pathname
    router.replace(newURL, { scroll: false })
  }, [pathname, router, searchParams])

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts()
        const filteredCategory = data.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        )
        setProducts(filteredCategory)
        
        // Set initial price range based on products
        if (filteredCategory.length > 0) {
          const prices = filteredCategory.map(p => p.price)
          const minPrice = Math.floor(Math.min(...prices))
          const maxPrice = Math.ceil(Math.max(...prices))
          
          // Only set price range if not already set by URL params
          if (!searchParams.get('minPrice') && !searchParams.get('maxPrice')) {
            setPriceRange([minPrice, maxPrice])
          }
        }
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [category, searchParams])

  useEffect(() => {
    updateURL({
      brands: selectedBrands,
      battery: selectedBattery,
      size: selectedSize,
      page: currentPage === 1 ? null : currentPage
    })
  }, [selectedBrands, selectedBattery, selectedSize, currentPage, updateURL])

  // Get price bounds from products
  const priceBounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 2000 }
    const prices = products.map(p => p.price)
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    }
  }, [products])

  const availableBrands = useMemo(() => {
    const brands = products.map(product => product.brand)
    const uniqueBrands = [...new Set(brands)]
    return brandLists.filter(brand => uniqueBrands.includes(brand))
  }, [products])

  const availableBattery = useMemo(() => {
    const batteryCapacity = products.map(product => product.specifications?.battery)
    const uniqueBattery = [...new Set(batteryCapacity)]
    return batteryList.filter(battery => uniqueBattery.includes(battery))
  }, [products])
  
  const availableSize = useMemo(() => {
    const screenSizes = products.map(product => product.specifications?.screen_size)
    const uniqueSize = [...new Set(screenSizes)]
    return screenSize.filter(size => uniqueSize.includes(size))
  }, [products])

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      
      const batteryMatch =
        selectedBattery.length === 0 ||
        (product.specifications?.battery &&
          selectedBattery.includes(product.specifications.battery))
      
      const sizeMatch =
        selectedSize.length === 0 ||
        (product.specifications?.screen_size &&
          selectedSize.includes(product.specifications.screen_size))

      const searchMatch = searchQuery.trim() === "" ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.details && product.details.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const priceMatch = 
        product.price >= priceRange[0] && 
        product.price <= priceRange[1]
        
      return brandMatch && batteryMatch && sizeMatch && searchMatch && priceMatch
    })
  }, [products, selectedBrands, selectedBattery, selectedSize, searchQuery, priceRange])

  // Toggle filters with URL update
  const toggleBrand = useCallback((brand: string) => {
  setSelectedBrands(prev => {
    const newBrands = prev.includes(brand) 
      ? prev.filter(b => b !== brand) 
      : [...prev, brand]
    return newBrands
  })
  setCurrentPage(1)
}, [])

const toggleBattery = useCallback((battery: string) => {
  setSelectedBattery(prev => {
    const newBattery = prev.includes(battery) 
      ? prev.filter(b => b !== battery) 
      : [...prev, battery]
    return newBattery
  })
  setCurrentPage(1)
}, [])

const toggleSize = useCallback((size: string) => {
  setSelectedSize(prev => {
    const newSize = prev.includes(size) 
      ? prev.filter(b => b !== size) 
      : [...prev, size]
    return newSize
  })
  setCurrentPage(1)
}, [])

  const handleSortChange = useCallback((sortKey: string) => {
    setSortBy(sortKey)
    updateURL({ sort: sortKey })
  }, [updateURL])

  const handlePriceChange = useCallback((newRange: [number, number]) => {
    setPriceRange(newRange)
    updateURL({ 
      minPrice: newRange[0], 
      maxPrice: newRange[1],
      page: 1
    })
    setCurrentPage(1)
  }, [updateURL])

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
    updateURL({ search: query, page: 1 })
    setCurrentPage(1)
  }, [updateURL])

  // Pagination
  const productsPerPage = 9
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    updateURL({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [updateURL])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSelectedBrands(['Apple'])
    setSelectedBattery([])
    setSelectedSize([])
    setSearchQuery('')
    setPriceRange([priceBounds.min, priceBounds.max])
    setCurrentPage(1)
    setSortBy('rating')
    
    // Clear URL params
    router.replace(pathname)
  }, [priceBounds, pathname, router])

  if (loading) {
    return <div className="px-40 pt-6">Loading...</div>
  }

  return (
    <section className="min-h-screen px-4 xl:px-40">
      <main className="container mx-auto pt-6 pb-14">
        {/* Mobile Filters */}
        <div className="flex items-center justify-evenly md:justify-between mb-4 lg:hidden">
          <FilterSheet
            availableBrands={availableBrands}
            availableBattery={availableBattery}
            availableSize={availableSize}
            selectedBrands={selectedBrands}
            selectedBattery={selectedBattery}
            selectedSize={selectedSize}
            searchQuery={searchQuery}
            setSearchQuery={handleSearchChange}
            products={products}
            toggleBrand={toggleBrand}
            toggleBattery={toggleBattery}
            toggleSize={toggleSize}
            resultsCount={filteredProducts.length}
            priceRange={priceRange}
            priceBounds={priceBounds}
            onPriceChange={handlePriceChange}
          />

          <ProductSort currentSort={sortBy} onSortChange={handleSortChange} />
        </div>

        {/* Active Filters Display */}
        {(selectedBrands.length > 0 || 
          selectedBattery.length > 0 || 
          selectedSize.length > 0 || 
          searchQuery ||
          priceRange[0] !== priceBounds.min ||
          priceRange[1] !== priceBounds.max) && (
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {selectedBrands.map(brand => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="px-3 py-1 bg-black text-white text-sm rounded-full flex items-center gap-2 hover:bg-gray-800"
              >
                {brand}
                <span className="text-xs">×</span>
              </button>
            ))}

            {selectedBattery.map(battery => (
              <button
                key={battery}
                onClick={() => toggleBattery(battery)}
                className="px-3 py-1 bg-black text-white text-sm rounded-full flex items-center gap-2 hover:bg-gray-800"
              >
                {battery}
                <span className="text-xs">×</span>
              </button>
            ))}

            {selectedSize.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className="px-3 py-1 bg-black text-white text-sm rounded-full flex items-center gap-2 hover:bg-gray-800"
              >
                {size}
                <span className="text-xs">×</span>
              </button>
            ))}

            {(priceRange[0] !== priceBounds.min || priceRange[1] !== priceBounds.max) && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="ml-2 text-sm text-red-600 hover:text-red-700 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Desktop & Mobile Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-64 p-6">
            <div className="sticky top-6">
              <FilterSidebar 
                availableBrands={availableBrands} 
                availableBattery={availableBattery}
                availableSize={availableSize}
                selectedBrands={selectedBrands} 
                selectedBattery={selectedBattery}
                selectedSize={selectedSize}
                searchQuery={searchQuery}
                setSearchQuery={handleSearchChange}
                toggleBrand={toggleBrand} 
                toggleBattery={toggleBattery}
                toggleSize={toggleSize}
                products={products}
                priceRange={priceRange}
                priceBounds={priceBounds}
                onPriceChange={handlePriceChange}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <ProductGrid 
            filteredProducts={filteredProducts} 
            paginatedProducts={paginatedProducts}
            currentSort={sortBy}
            onSortChange={handleSortChange}
          />
        </div>
        
        <div>
          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </section>
  )
}

export default ProductsPageX