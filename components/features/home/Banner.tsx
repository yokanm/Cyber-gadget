import Image from 'next/image'
import React from 'react'
import Airpod from '@/public/assets/images/Airpod.png'
import Vision from '@/public/assets/images/Vision Pro.png'
import Ps5 from '@/public/assets/images/PlayStation_Big.png'
import Macbook from '@/public/assets/images/MacBook Pro 14.png'
import Link from 'next/link'
function Banner() {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-1'>

      <div className='grid grid-cols-1 justify-items-center px-4 py-10 gap-8 xl:grid-cols-2 xl:pl-39 xl:pr-12 xl:justify-items-start relative overflow-hidden'>
        
          <Image src={Airpod} alt='Apple Airpod' className='w-[65%] xl:absolute xl:right-65' />
          <div className='flex flex-col justify-center items-center text-center gap-2 xl:min-w-[168px] xl:text-left '>
              <h3 className='text-black text-4xl font-light leading-8 xl:text-3xl xl:leading-10 '>Apple AirPods <span className='font-medium xl:text-3xl xl:leading-10 xl:block'>Max</span></h3>
              <p className='text-neutral-400 text-base font-medium leading-normal'>Computational audio. Listen, it&#39;s powerful</p>
          </div>
      </div>

      <div className='grid grid-cols-1 justify-items-center px-4 py-10 gap-8 xl:grid-cols-2 xl:pl-39 xl:pr-12 xl:justify-items-start relative overflow-hidden bg-[#353535]'>
        
          <Image src={Vision} alt='Apple Vision' className='w-[95%] xl:absolute xl:right-58 top-8' />
          <div className='flex flex-col justify-center items-center text-center self-stretch gap-2 xl:min-w-[168px] xl:text-left'>
              <h3 className='text-white text-4xl font-light leading-8 xl:text-3xl xl:leading-10 '>Apple Vision  <span className='font-medium'>Pro</span></h3>
              <p className='text-neutral-400 text-base font-medium leading-normal'>An immersive way to experience entertainment</p>
          </div>
      </div>

      <div className='grid grid-cols-1 justify-items-center px-4 py-10 gap-8 lg:col-start-1 lg:col-span-2 lg:row-start-1 xl:grid-cols-2 xl:justify-items-start xl:gap-0 xl:pl-84 xl:py-25 xl:mr-12 relative overflow-y-clip'>
        
          <Image src={Ps5} alt='Playstation 5' className='xl:absolute xl:right-80 xl:bottom-[-45px] w-[75%]'/>
        
          <div className='flex flex-col justify-center items-center text-center gap-3 xl:items-start xl:min-w-[404px] lg:gap-4 xl:text-start'>
              <h3 className='text-black text-4xl font-light leading-8 lg:text-5xl lg:font-medium'>Playstation   <span className='font-medium'>5</span></h3>
              <p className='text-neutral-400 text-base font-medium leading-normal'>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
          </div>
      </div>

      <div className='grid grid-cols-1 px-4 py-10 gap-8 xl:grid-cols-2 lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-2 xl:place-content-evenly lg:py-11 lg:pl-14 lg:gap-1 relative'>
          
          <Image src={Macbook} alt='Macbook Air' className='lg:object-fit xl:absolute xl:left-109 xl:top-16'/>
          <div className='flex flex-col gap-4 items-center md:justify-items-center xl:min-w-[360px]  xl:items-start  '>
              <div className='flex flex-col justify-center items-center text-center gap-3 lg:gap-4 lg:self-stretch xl:items-start xl:text-left '>
                  <h3 className='text-black text-4xl font-medium leading-8 lg:text-[64px] lg:font-thin'>Macbook <span className='font-light lg:text-[64px] lg:font-medium lg:block lg:mt-6 xl:mt-4 '> Air </span></h3>
                  <p className='text-neutral-400 text-sm font-medium leading-normal'>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
              </div>
              <div className='flex justify-center items-center self-stretch md:self-center xl:self-start rounded-[6px] border border-black hover:bg-black hover:text-white transition duration-300'>
                <Link href={'/category/computer'}>
                  <button
                    className='text-center text-base font-medium py-4 px-14 '
                  >
                        Shop Now
                  </button>
                </Link>
              </div>
          </div>
      </div>
      
      
    </section>
  )
}

export default Banner
