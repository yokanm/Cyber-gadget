"use client"
import { Minus, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart,  
    cartTotal 
  } = useCart()

  const {success} = useToast()
  
  const [promoCode, setPromoCode] = useState('')
  const [bonusCard, setBonusCard] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(false)
  const router = useRouter()

  const TAX_RATE = 50
  const SHIPPING = 29
  const subtotal = cartTotal
  const total = subtotal + TAX_RATE + SHIPPING

  const handleUpdateQuantity = (id: string | number, delta: number) => {
    const item = cartItems.find(item => item.id === id)
    if (item) {
      updateQuantity(id, item.quantity + delta)
    }
  }

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim()) {
      setAppliedPromo(true)
      success('Promo code applied successfully!')
    }
  }

  const applyBonusCard = (e: React.FormEvent) => {
    e.preventDefault()
    if (bonusCard.trim()) {
      success('Bonus card applied successfully!')
    }
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cartItems.length === 0) {
      return
    }
    
    router.push('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <section className='px-4 py-12 md:py-20 md:px-40 lg:py-28'>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600">Add some items to get started</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='px-4 py-12 md:px-20 xl:px-40 lg:py-28 bg-white'>
      <div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Cart Items Section */}
          <div className='space-y-8'>
            <h1 className='font-inter font-semibold text-2xl leading-6 text-black'>
              Shopping Cart
            </h1>
            
            <div className='space-y-6'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='py-4 border-b border-gray-300 last:border-b-0'
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        {item.images?.[0] ? (
                          <Image 
                            src={item.images[0]} 
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-inter font-medium text-gray-900 text-base leading-snug">
                            {item.model}
                          </h3>
                          <p className="font-inter text-sm text-gray-500 mt-1">
                            #{item.id}
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls and Price */}
                      <div className="flex items-center justify-between mt-4 gap-2">
                        <div className="flex items-center rounded-lg ">
                          <Button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-l-lg hover:bg-gray-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>

                          <span className="px-4 py-1 font-inter font-medium text-black text-center min-w-[40px] border border-gray-300 rounded-sm ">
                            {item.quantity}
                          </span>

                          <Button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-r-lg hover:bg-green-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-6 h-6" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-lg font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(0)}
                          </span>

                          <div
                            onClick={() => removeFromCart(item.id)}
                            className="hover:bg-red-50 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <X className="w-6 h-6" />
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className=' px-4 py-14 md:px-16 md:py-14 border rounded-xl'>
              <h1 className="font-inter font-bold text-lg leading-4">Order Summary</h1>
              <div className="mt-10 ">
                <div className="space-y-6">
                  {/* Bonus Card Form */}
                  <div>
                    <label htmlFor="promo-code" className="font-inter text-sm font-medium text-gray-500 block mb-2">
                      Discount code / Promo code
                    </label>
                    <form onSubmit={applyPromoCode} className="relative">
                      <input
                        id="promo-code"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Code"
                        className="w-full pl-4 pr-20 py-4 rounded-md border border-gray-300 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <Button 
                        type="submit" 
                        variant="outline"
                        disabled={!promoCode.trim()}
                        className='absolute right-2 top-1/2 -translate-y-1/2 border-2 border-black text-black h-10 px-4 hover:bg-black hover:text-white transition-colors'
                      >
                        Apply
                      </Button>
                    </form>
                    {appliedPromo && (
                      <p className="text-sm text-green-600 mt-2">Promo code applied</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bonus-card" className="font-inter text-sm font-medium text-gray-500 block mb-2">
                      Your bonus card number
                    </label>
                    <form onSubmit={applyBonusCard} className="relative">
                      <input
                        id="bonus-card"
                        type="text"
                        value={bonusCard}
                        onChange={(e) => setBonusCard(e.target.value)}
                        placeholder="Enter Card Number"
                        className="w-full pl-4 pr-20 py-4 border border-gray-300 rounded-md text-sm font-inter focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <Button 
                        type="submit" 
                        variant="outline"
                        disabled={!bonusCard.trim()}
                        className='absolute right-2 top-1/2 -translate-y-1/2 border-2 border-black text-black h-10 px-4 hover:bg-black hover:text-white transition-colors'
                      >
                        Apply
                      </Button>
                    </form>
                  </div>
           

                  {/* Order Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-black text-base font-inter font-medium ">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm">
                      <span>Estimated Tax</span>
                      <span className='text-black'>${TAX_RATE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm">
                      <span>Estimated shipping & Handling</span>
                      <span className='text-black'>${SHIPPING.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-black text-base font-inter font-medium ">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Checkout Button */}
                  <form onSubmit={handleCheckout} className='pt-4'>
                    <Button
                      type="submit"
                      className="w-full px-14 py-6 rounded-sm "
                      size="lg"
                    >
                      Checkout
                    </Button>
                  </form>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Cart