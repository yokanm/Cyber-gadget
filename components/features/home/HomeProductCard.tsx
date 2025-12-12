
import { Product } from '@/type/type'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useWishlist } from '@/contexts/WishlistContext'
import { createSlug } from '@/lib/utils'

const HomeProductCard = ({ product}: { product: Product;}) => {
  
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
    
        <div className='bg-[#F6F6F6] flex flex-col  items-center px-3 py-6 md:px-4 gap-4 rounded-lg'>
          
            <Heart
              aria-label={isInWishlist(product.id) 
                ? 'Remove from wishlist' 
                : 'Add to wishlist'}
              onClick={handleWishlist}
              className={`w-8 h-8 relative left-12 md:left-32 lg:left-24 text-[#8B8B8B]transition-all ${
              isInWishlist(product.id)
                ? 'fill-red-500 text-red-500 scale-110'
                : 'text-[#8B8B8B] bg-transparent hover:fill-red-500'
              }`}
            />
            
            <Link href={`/category/${product.category}/${createSlug(product.brand)}/${createSlug(product.model)}`}>
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
              <p className='text-black text-center text-base font-medium leading-6 overflow-ellipsis'>{product.model}</p>
              <p className='text-black text-center text-2xl font-semibold'>${product.price}</p>
            </Link>
            <div>
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
//href={`/category/${product.category}/${product.id}`}
export default HomeProductCard