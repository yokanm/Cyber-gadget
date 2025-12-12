import Image from 'next/image'
import React from 'react'
import Iphone from '@/public/assets/images/Iphone Image.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='w-full bg-[#211C24] flex flex-col justify-between items-center px-4 pt-[88px] gap-12 xl:flex-row xl:px-40 xl:gap-6 overflow-hidden'>
        <div className='flex flex-col items-center text-center gap-8 xl:items-start lg:text-left lg:min-w-[400px] lg:gap-6'>
            <div className='flex flex-col items-center text-center gap-8 self-stretch lg:items-start lg:text-left lg:gap-6'>

                <p className='text-white text-2xl font-semibold leading-8 opacity-40'>Pro.Beyond.</p>

                <h1 className='text-white text-7xl font-thin leading-[72px] lg:text-8xl'>IPhone 14 <span className='text-white font-semibold leading-[72px] lg:text-8xl'>Pro</span></h1>
            </div>
            <div>
                <p className='text-neutral-400 text-lg font-medium text-center leading-normal'>Created to change everything for the better. For everyone</p>
            </div>
            <div className='items-center pb-4 gap-2'>
               <Button
                variant='custom' 
                size='custom' 
                className='hover:bg-white hover:text-black transition duration-300 items-center'>
                    <Link href={'/category/phone'}>Shop Now</Link> 
               </Button>
            </div>
        </div>
        <div className='w-full h-[289px] flex justify-center relative items-center self-stretch xl:w-[406px] xl:h-[632px]'>
            <Image 
            src={Iphone}
            alt="Iphone 14 Pro"
            className='w-[321px] h-[450px] object-fill absolute top-[-32px] md:relative md:top-0 xl:w-[406px] xl:h-[632px] '
            
            />
        </div>
      
    </section>
  )
}

export default Hero
