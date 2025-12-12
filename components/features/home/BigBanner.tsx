"use client"
import { useState } from "react";
import Image from "next/image";
import Img0 from '@/public/assets/images/Airpod.png'
import Img01 from '@/public/assets/images/Apple Tab L.png'
import Img02 from '@/public/assets/images/Samsung Z flip.png'
import Img03 from '@/public/assets/images/MacBook Pro 14.png'
import { Button } from "@/components/ui/button";
import { cn, createSlug } from "@/lib/utils";
import Link from "next/link";

const BigBanner = () => {
    const products = [
    {
      id: 1,
      title: "Popular Products",
      description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      image: Img0,
      cta: "Shop Now",
      bg: '#F9F9F9',
      href: `/category`
    },
    {
      id: 2,
      title: "Ipad Pro",
      description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      image: Img01,
      cta: "Shop Now",
      dark: false,
      bg: 'bg-[#F9F9F9]',
      href: `/category/phone/`
    },
    {
      id: 3,
      title: "Samsung Galaxy",
      description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      image: Img02,
      cta: "Shop Now",
      dark: false,
      bg: "bg-[#EAEAEA]",
      href: `/category/phone/${createSlug('Samsung')}`
    },
    {
      id: 4,
      title: "Macbook Pro",
      description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
      image: Img03,
      cta: "Shop Now",
      dark: true,
      bg: "bg-[#353535]",
      href: `/category/computer`
    }
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  return (
    <section className=''>
        {/* Mobile view */}
        <div className="block lg:hidden relative overflow-hidden">

          <div 
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {products.slice(1,4).map((item) => (
              <div 
                key={item.id} 
                className={`flex flex-col shrink-0 w-full items-center gap-4 min-w-70 py-14 px-8 ${
                item.bg}`}
              >
                
                <div className="relative w-90 h-82">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-contain" 
                  />
                </div>

                <h3 className="text-black text-5xl font-light text-center">{item.title}</h3>
                <p className="text-[#909090] text-center text-sm font-medium leading-6">{item.description}</p>
                <Button 
                  variant='customBlack' 
                  size='custom' 
                  className={
                    cn( 
                      "text-base font-medium transition",
                      item.dark
                        ? "text-white border-white hover:bg-white hover:text-gray-900"
                        : "border border-gray-900 hover:bg-gray-900 hover:text-white ",
                )}>
                  {item.cta}
                </Button>

                {/* Carousel Dots */}

                  <div className="flex justify-center space-x-2 mt-4">
                    {products.slice(1, 4).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full ${
                          currentSlide === index
                           ? "bg-black" 
                           :
                            "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop view */}
        <div className="hidden lg:grid grid-cols-4 ">
          {products.map((item) => (
            <div key={item.id} className={cn("flex flex-col items-start gap-6 px-4 pt-4 pb-14 flex-1 relative", item.bg)}>
              <div className="w-84 h-92 relative">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  quality={70}
                  className="absolute object-contain" 
                  
                   
                />
              </div>
              <h3 className="text-black text-3xl font-light text-left">{item.title}</h3>
              <p className="text-[#909090] text-left text-sm font-medium leading-6">{item.description}</p>
              <Link href={item.href}>
                <Button 
                    variant='customBlack' 
                    size='custom' 
                    className={
                      cn( 
                        "text-base font-medium transition",
                        item.dark
                          ? "text-white border-white hover:bg-white hover:text-gray-900"
                          : "border-gray-900 hover:bg-gray-900 hover:text-white",
                  )}>
                    {item.cta}
                  </Button>
              </Link>
            </div>
          ))}

        </div>
      
    </section>
  )
}

export default BigBanner
