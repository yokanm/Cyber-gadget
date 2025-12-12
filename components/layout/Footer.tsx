import Image from 'next/image'
import Logo from "../../public/assets/svg/Logo_white.svg"
import X from "../../public/assets/svg/x-twitter.svg"
import facebook from '../../public/assets/svg/Facebook.svg'
import instagram from '../../public/assets/svg/Instagram.svg'
import Tiktok from '../..//public/assets/svg/Tiktok.svg'
import { footerLinks } from '@/constants/data'


const Footer = () => {
  return (
    <section className='bg-[#181313] py-12 px-8 gap-8 lg:py-26 lg:px-40 lg:gap-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3'>
            <div className='flex flex-col gap-4 mb-8 items-center lg:items-start lg:gap-6'>
                <div>
                    <Image src={Logo} alt='logo'  />
                </div>
                <p className='text-center font-normal text-sm text-[#CFCFCF] lg:font-medium lg:text-left'>We are a residential interior design firm located in Portland. Our boutique-studio offers more than.</p>
            </div>

            {footerLinks.map((item, index)=> (
              <div
               key={index}
               className='flex flex-col gap-2 mb-2 items-center lg:items-start lg:ml-auto'>

                <h3 className='text-base font-semibold text-white'>{item.title}</h3>

                {item.links.map((link, linkIdx) => (
                  <p key={linkIdx} className='text-sm font-normal text-[#CFCFCF] mb-2'
                  > {link} </p>
                ))}
              </div>
            ))}  
        </div>

        <div className='flex items-center justify-center gap-6 mt-8 lg:justify-start'>
        <Image src={X} alt='X-twiiter' className='w-6 h-6 text-white' />
        <Image src={facebook} alt='Facebook' />
        <Image src={Tiktok} alt='Tiktok' />
        <Image src={instagram} alt='Instagram' /> 
      </div>
      
    </section>
  )
}

export default Footer

{/* <p>We are a residential interior design firm located in Portland. Our boutique-studio offers more than just design services; we curate unique experiences that reflect the individuality of our clients.</p> */}