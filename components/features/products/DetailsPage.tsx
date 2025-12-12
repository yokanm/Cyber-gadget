"use client";
import { useMemo, useState, useEffect } from 'react'
import { Product } from "@/type/type";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { 
  Monitor, 
  Cpu, 
  Camera, 
  Battery, 
  Truck, 
  Package, 
  Shield, 
  Star
} from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/contexts/ToastContext';
import Discount from '../cart/Discount';

export default function DetailsPage({product}: {product: Product})  {

  const storageOptions = ["128GB", "256GB", "512GB", "1TB"];
  const reviews = [
    {
      name: "Grace Carey",
      date: "24 January, 2023",
      rating: 4,
      comment:
        "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn't connect with my data plan, since the new phones don't have the physical Sim tray anymore, but couldn't have been easier! I bought an Unlocked black iPhone 14 Pro Max in excellent condition and everything is PERFECT. It was super easy to set up and the phone works and looks great. It truly was in excellent condition. Highly recommend!!🖤",
      avatar: "/avatars/grace.jpg",
    },
    {
      name: "Ronald Richards",
      date: "24 January, 2023",
      rating: 5,
      comment:
        "This phone has 1T storage and is durable. Plus all the new iPhones have a C port! Apple is phasing out the current ones! (All about the Benjamin's) So if you want a phone that's going to last grab an iPhone 14 pro max and get several cords and plugs.",
      avatar: "/avatars/ronald.jpg",
    },
    {
      name: "Darcy King",
      date: "24 January, 2023",
      rating: 4,
      comment:
        "I might be the only one to say this but the camera is a little funky. Hoping it will change with a software update; otherwise, love this phone! Came in great condition",
      avatar: "/avatars/darcy.jpg",
      images: ["/reviews/phone1.jpg", "/reviews/phone2.jpg"],
    },
  ];
  
  const pickColor = [
    { name: "black", color: "#000000" },
    { name: "purple", color: "#781DBC" },
    { name: "red", color: "#E10000" },
    { name: "yellow", color: "#E1B000" },
    { name: "white", color: "#E8E8E8" },
  ];

  const reviewStats = {
    average: 4.8,
    total: 125,
    breakdown: [
      { label: "Excellent", count: 100, percentage: 80 },
      { label: "Good", count: 11, percentage: 8.8 },
      { label: "Average", count: 3, percentage: 2.4 },
      { label: "Below Average", count: 8, percentage: 6.4 },
      { label: "Poor", count: 1, percentage: 0.8 },
    ],
  };

  const thumbnailImages = useMemo(() => {
    const mainImages = product.images;

    const viewImagesList = [
      product.viewImages?.front,
      product.viewImages?.side, 
      product.viewImages?.back,
    ].filter(Boolean);

    const viewList = [
    product.views?.front,
    product.views?.side, 
    product.views?.back,
  ].filter(Boolean);

    return [...mainImages, ...viewImagesList, ...viewList].slice(0, 4);
  }, [product.images, product.viewImages, product.views]);

  
  
  const [discountedPrice, setDiscountedPrice] = useState<number>(product?.price || 0);
  const [selectedImage, setSelectedImage] = useState<string>(thumbnailImages[0] || "/placeholder.png");
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  useEffect(() => {
    if (product) {
      const DISCOUNT_OPTIONS = [5, 10, 15, 20, 25, 30];
      const randomDiscount = DISCOUNT_OPTIONS[Math.floor(Math.random() * DISCOUNT_OPTIONS.length)];
      setDiscountedPrice(product.price * (1 - randomDiscount / 100));
    }
  }, [product]);
 

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { success, info } = useToast()

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
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

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product || !product.id) {
      console.error('Invalid product data');
      return;
    }
    
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
  
  if (!product) {
    return (
      <div className="p-10 text-center text-xl text-gray-400">
        Product not found
      </div>
    );
  }

  return (
    <>
      {/* MOBILE VIEW - Product Images */}
      <div className="lg:hidden">
        <div className="flex flex-col items-center">
          <Image 
            src={selectedImage} 
            alt={product.model}
            width={400}
            height={400}
            className="w-64 h-80 object-contain p-4"
            quality={75}
            loading="lazy" 
          />
        </div>
        
        {/* Mobile Thumbnails */}
        <div className="flex justify-evenly gap-6 px-4 py-3 overflow-x-auto">
          {thumbnailImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="w-16 h-16 rounded-lg overflow-hidden"
            >
              <Image
                src={img || "/placeholder.png"}
                alt={`${product.model} view ${idx + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                quality={75}
                
              />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE VIEW - Product Info */}
      <div className="lg:hidden px-4 py-4">
        <h1 className="font-inter text-4xl font-bold text-gray-900 mb-3">
          {product.model}
        </h1>

        {/* Mobile Price */}
        <div className="flex items-baseline gap-3 mb-4">
          <div className="font-inter text-3xl font-bold text-gray-900">
            ${discountedPrice.toFixed(0)} <span className="font-inter text-2xl text-gray-400 line-through">${product.price}</span>
          </div>
        </div>
         
        {/* Mobile Color Selection */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 mb-3 block">
            Select color :
          </span>
          <div className="flex gap-2">
            {pickColor.map((item, index) => (
              <button
                key={index}
                className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-black transition"
                style={{ backgroundColor: item.color }}
                title={item.name}
              />
            ))}
          </div>
        </div>

        {/* Mobile Storage Selection */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {storageOptions.map((storage, idx) => (
            <button
              key={idx}
              className={`py-2.5 px-3 rounded-lg opacity-100 border text-sm font-medium transition-colors ${
                idx === 3
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {storage}
            </button>
          ))}
        </div>

        {/* Mobile Quick Specs */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Monitor className="w-6 h-6 text-gray-600" />
            <div>
              <div className="text-xs text-gray-500">Screen size</div>
              <div className="text-sm font-semibold truncate">
              {product.specifications?.screen_size || product.specifications?.screenDiagonal || "6.7\""}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Cpu className="w-6 h-6 text-gray-600" />
            <div>
              <div className="text-xs text-gray-500">CPU</div>
              <div className="text-sm font-semibold">{product.specifications?.CPU || "A16 Bionic"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Cpu className="w-5 h-5 text-gray-600" />
            <div>
              <div className="text-xs text-gray-500">No of Cores</div>
              <div className="text-sm font-semibold">{product.specifications?.number_of_cores || "6"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Camera className="w-6 h-6 text-gray-600" />
            <div>
              <div className="text-xs text-gray-500">Main cam</div>
              <div className="text-sm font-semibold">{product.specifications?.camera || '48-12 MP'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Camera className="w-6 h-6 text-gray-600" />
            <div>
              <div className="text-xs text-gray-500">Front cam</div>
              <div className="text-sm font-semibold">{product.specifications?.camera || '12 MP'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Battery className="w-6 h-6 text-gray-600" />
            <div>
              <div className="text-xs text-gray-500">Battery</div>
              <div className="text-sm font-semibold">{product.specifications?.battery}</div>
            </div>
          </div>
        </div>

        {/* Mobile Description */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.details || "Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging throughout the day. Incredible photos in weak, and in bright lighting"}{" "}
          <span className="text-black font-semibold cursor-pointer">more...</span>
          </p>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex flex-col space-y-3 mb-6">
          <Button
            onClick={(e) => handleWishlist(e, product)}
            variant="outline"
            className="py-6 text-base font-medium rounded-lg border-2"
          >
            Add to Wishlist
          </Button>
          <Button
            onClick={(e) => handleAddToCart(e, product)}
            className="py-6 text-base font-medium rounded-lg bg-black hover:bg-gray-800">
            Add to Cart
          </Button>
        </div>

        {/* Mobile Service Features */}
        <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 flex items-center justify-center">
              <Truck className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-xs font-medium text-gray-400">Free Delivery</div>
            <div className="text-xs font-medium ">1-2 day</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 flex items-center justify-center">
              <Package className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-xs font-medium text-gray-400">In Stock</div>
            <div className="text-xs font-medium">Today</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 flex items-center justify-center">
              <Shield className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-xs font-medium text-gray-400">Guaranteed</div>
            <div className="text-xs font-medium">1 year</div>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW - (Hidden on mobile) */}
      <section className='hidden lg:block lg:px-20 lg:py-14 xl:px-40 xl:py-28'>
        {/* Main Product Section */}
        <main className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Images */}
          <div className="flex gap-4">
            {/* Thumbnail Gallery */}
            <div className="flex flex-col gap-4 mt-24">
              {thumbnailImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-gray-300 transition"
                >
                  <Image
                    src={img || "/placeholder.png"}
                    alt={`${product.model} view ${idx + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    quality={75}
                    
                  />
                </div>
              ))}
            </div>
            {/* Main Image */}
            <div className="flex-1 bg-white p-8 flex items-center justify-center mb-24">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={product.model}
                  width={400}
                  height={400}
                  className="object-contain transition-all duration-300 rounded-2xl"
                  quality={75}
                  loading="lazy" 
                />

              ) : 
              (<div className="placeholder">No Image</div>)}
            </div>
          </div>
  
          {/* Right Side - Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">{product.model}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-medium">${product.price}</span>
                <span className="text-2xl font-normal text-gray-400 line-through">
                  ${discountedPrice.toFixed(0)}
                </span>
              </div>
            </div>
  
            {/* Color Selection */}
            <div>
              <label className="text-sm font-normal text-gray-600 mb-3 block">
                Select color :
              </label>
              <div className="flex gap-2">
                {pickColor.map((item, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-black transition"
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                  />
                ))}
              </div>
            </div>
  
            {/* Storage Options */}
            <div>
              <div className="grid grid-cols-4 gap-4">
                {storageOptions.map((storage, idx) => (
                  <button
                    key={idx}
                    className={`py-4 px-6 border rounded-xl opacity-100 text-sm font-medium transition ${
                      idx === 3
                        ? "border-black bg-white"
                        : "border-gray-300 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>
  
            {/* Key Specs Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg md:px-2 md:py-4 flex items-center gap-2">
                <Monitor className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-400">Screen size</p>
                  <p className="font-medium">
                    {product.specifications?.screen_size || product.specifications?.screenDiagonal || "6.7\""}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg md:px-2 md:py-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-400">CPU</p>
                  <p className="font-medium text-sm">
                    {product.specifications?.CPU || "Apple A16 Bionic"}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg md:px-2 md:py-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-400">Number of Cores</p>
                  <p className="font-medium">
                    {product.specifications?.number_of_cores || "6"}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg md:px-2 md:py-4 flex items-center gap-2">
                <Camera className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-400">Main camera</p>
                  <p className="font-medium text-sm">{product.specifications?.battery || '48-12-12 MP'}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg md:px-2 md:py-4 flex items-center gap-2">
                <Camera className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-400">Front-camera</p>
                  <p className="font-medium">12 MP</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg md:px-2 md:py-4 flex items-center gap-2">
                <Battery className="w-6 h-6 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-400">Battery capacity</p>
                  <p className="font-medium">{product.specifications?.battery}</p>
                </div>
              </div>
            </div>
  
            {/* Description */}
            <p className="text-gray-600 text-sm leading-6">
              {product.details || "Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without rechargingthroughout the day. Incredible photosas in weak, yes and in bright lightusing the new systemwith two cameras"}{" "}
              <span className="font-semibold text-gray-950 cursor-pointer">more...</span>
            </p>
  
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                onClick={(e) => handleWishlist(e, product)}
                variant="outline"
                className="py-6 text-base font-medium rounded-lg border-2"
              >
                Add to Wishlist
              </Button>
              <Button
                onClick={(e) => handleAddToCart(e, product)}
                className="py-6 text-base font-medium rounded-lg bg-black hover:bg-gray-800">
                Add to Cart
              </Button>
            </div>
  
            {/* Delivery Info */}
            <div className="grid grid-cols-3 gap-8 pt-6 border-t">
              <div className="flex items-center gap-4 ">
                <div className="bg-gray-200 p-4">
                  <Truck className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Free Delivery</p>
                  <p className="font-medium text-sm">1-2 day</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <div className="bg-gray-200 p-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">In Stock</p>
                  <p className="font-medium text-sm">Today</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 p-4">
                  <Shield className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Guaranteed</p>
                  <p className="font-medium text-sm">1 year</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <section className='px-4 py-10 lg:px-40 lg:py-20 bg-gray-100'>
        <main className='px-6 py-12 lg:px-10 lg:py-12 bg-white'>
          <h2 className="text-2xl font-medium mb-6">Details</h2>
          <p className="text-sm text-gray-600 font-medium mb-8 leading-relaxed">
            Just as a book is judged by its cover, the first thing you notice when you
            pick up a modern smartphone is the display. Nothing surprising, because
            advanced technologies allow you to practically level the display frames and
            cutouts for the front camera and speaker, leaving no room for bold design
            solutions. And how good that in such realities Apple everything is fine with
            displays. Both critics and mass consumers always praise the quality of the
            picture provided by the products of the Californian brand. And last year&apos;s
            6.7-inch Retina panels, which had ProMotion, caused real admiration for many.
          </p>
  
          {/* Screen Specifications */}
          <div className="gap-6">
            <h3 className="text-xl font-semibold">Screen</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Screen diagonal</span>
                <span className="font-medium">6.7&quot;</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">The screen resolution</span>
                <span className="font-medium">2796Ã—1290</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">The screen refresh rate</span>
                <span className="font-medium">120 Hz</span>
              </div>
              {showMoreDetails && (
                <>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">The pixel density</span>
                    <span className="font-medium">460 ppi</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Screen type</span>
                    <span className="font-medium">OLED</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Additionally</span>
                    <div className="text-right">
                      <p className="font-medium">Dynamic Island</p>
                      <p className="font-medium">Always-On display</p>
                      <p className="font-medium">HDR display</p>
                      <p className="font-medium">True Tone</p>
                      <p className="font-medium">Wide color (P3)</p>
                    </div>
                  </div>
                </>
              )}
            </div>
  
            {/* CPU Specifications */}
            {showMoreDetails && (
              <>
                <h3 className="text-xl font-semibold pt-8">CPU</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">CPU</span>
                    <span className="font-medium">{product.specifications?.CPU}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-600">Number of cores</span>
                    <span className="font-medium">6</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="px-14 py-3 border-2 border-gray-500"
              onClick={() => setShowMoreDetails(!showMoreDetails)}
            >
              {showMoreDetails ? 'View Less' : 'View More'}
            </Button>
          </div>
        </main>
      </section>
        {/* REVIEWS SECTION - Responsive */}
        <section className="px-4 py-10 lg:px-40 lg:py-22">
          <div>
            <h2 className="text-2xl font-medium mb-8">Reviews</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
              {/* Overall Rating */}
              <div className="px-2 md:px-60 lg:px-0 xl:mr-12 text-center">
                <div className="flex gap-4 rounded-xl px-8 pt-4 md:flex-col md:pt-8 lg:px-0 md:pb-4 xl:rounded-4xl md:gap-0 border bg-gray-200 ">
                  <div>
                      <div className="font-inter text-5xl md:text-6xl md:font-bold mb-2">{reviewStats.average}</div>
                      <p className="text-xs md:text-lg font-inter text-gray-400 mb-3">of {reviewStats.total} reviews</p>
                  </div>

                  <div className='mt-6 pl-1 lg:mt-0 lg:px-0 '>
                      <div className="flex justify-center gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                          >
                            <Star size={24} className={
                              star <= Math.floor(reviewStats.average)
                               ? "fill-yellow-400 text-yellow-400"
                               : "text-gray-300"}
                              />
                          </span>
                        ))}
                      </div>
                  </div>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="lg:col-span-3 space-y-3">
                {reviewStats.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-600 w-28">{item.label}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden bg-[#D9D9D9] border border-[#D9D9D9]">
                      <div
                        className="h-full bg-[#FFB547] rounded-full "
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
              {/* Leave Comment Button */}
            <div className="w-full border border-gray-300 rounded-md mb-8" >
              <input type="text" placeholder="Leave Comment" className="w-full px-4 py-6 text-gray-400" />
            </div>
          </div>

          

              {/* Individual Reviews */}
              <div className='space-y-6'>
                {reviews.slice(0, showMoreReviews ? reviews.length : 2).map((review, idx) =>(
                    <div
                      key={idx}
                      className='flex pl-4 pr-7 py-6 space-y-5 space-x-6  bg-gray-100 rounded-xl'
                    >
                      {/* Image Profile */}
                      <div>
                        <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-black" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className='space-y-2'>
                        <div className='space-y-2'>
                          <div className='flex justify-between'>
                            <p className='font-inter font-bold text-sm'>{review.name}</p>
                            <p className='font-inter font-medium text-xs text-gray-400'>{review.date}</p>
                          </div>
                          {/* Stars */}
                          <div className="flex gap-1 my-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                >
                                  <Star size={16} className={
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"}
                                    />
                                </span>
                              ))}
                          </div> 
                        </div>
                          <div className='font-inter font-medium text-gray-400 leading-relaxed'>{review.comment}</div>
                      </div>
                      
                    </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button
                  variant="outline" 
                  className="px-14 py-3 border-2 border-gray-500"
                  onClick={() => setShowMoreReviews(!showMoreReviews)}
                >
                  {showMoreReviews ? 'View Less' : 'View More'}
                </Button>
              </div>
        </section> 

        <section className='px-4 mb-20 lg:px-40 lg:py-20'>
          <Discount />
        </section>
        
      </>
    );
  }

