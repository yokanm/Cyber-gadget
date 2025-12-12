
import { Product } from '@/type/type'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { Button } from '@/components/ui/button'
import { createSlug } from '@/lib/utils'
import { useWishlist } from '@/contexts/WishlistContext'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


const ProductCard = ({ product }: { product: Product;}) => {

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist} = useWishlist()
  const { success, info } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      id: product.id,
      name: product.model,
      model: product.model,
      price: product.price,
      images: product.images,
      category: product.category
    })
    
    info(`${product.model} added to cart!`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add wishlist functionality here
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      success('Removed from wishlist')
    } else {
      addToWishlist({
        id: product.id,
        name: product.model,
        model: product.model,
        price: product.price,
        images: product.images,
        category: product.category,
        brand: product.brand,
        addedAt: new Date().toISOString()
      })
      success('Added to wishlist')
    }
  }


  return (
    <div className='bg-[#F6F6F6] max-w-[264px] flex flex-col items-center py-4 px-3 lg:py-6 lg:px-4 gap-4 rounded-lg  hover:shadow-lg transition-shadow cursor-pointer group'>
      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className="self-end p-1.5 lg:p-2 hover:bg-gray-200 rounded-full transition-colors"
        aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-4 h-4 lg:w-6 lg:h-6 transition-all ${
            isInWishlist(product.id)
              ? 'fill-red-500 text-red-500 scale-110'
              : 'text-[#8B8B8B] hover:text-red-400'
          }`}
        />
      </button>
      
      {/* Product Image and Info - Clickable for details */}
      <Link 
        href={`/category/${product.category}/${createSlug(product.brand)}/${createSlug(product.model)}`}
        className="flex flex-col items-center gap-2 lg:gap-4 flex-1"
      >
        {/* Product Image */}
        <div className=''>
          <Image 
            src={product.images[0]} 
            alt={product.model} 
            className='w-20 h-20 items-center md:w-[104px] md:h-[104px]' 
            width={104} 
            height={104} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            loading="lazy" // or "eager" for above-fold
            
          />
        </div>
        <p className='text-black text-center text-base font-medium leading-6 overflow-ellipsis'>{product.model}</p>
        <p className='text-black text-center text-2xl font-semibold'>${product.price}</p>
      </Link>
      
      <div className="md:pb-1">
        <Button  
          onClick={handleAddToCart}
          className='py-5 px-6 md:py-6 md:px-14 md:rounded-md bg-black rounded-sm text-white font-medium'
        >
          Add to Cart
        </Button> 
      </div>
    </div>
  )
}

export default ProductCard