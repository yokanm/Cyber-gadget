import Image from 'next/image'
import Link from 'next/link'
import Logo from "../../public/assets/images/Logo_Vector.png"
import React from 'react'
import NavbarLink from './NavbarLink'
import MobileNavbar from './MobileNavbar'
import UserActions from '../features/auth/UserActions'
import SearchBar from '../features/search/SearchBar'

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 border-b border-zinc-400 bg-white'>
      <div className='flex justify-between items-center px-6 py-6 xl:px-40 lg:py-4 self-stretch'>
        {/* Logo */}
        <Link
         href="/"  
         aria-label="Go to homepage"
        >
          <Image 
            src={Logo} 
            alt="Cyber Logo" 
            width={64}
            height={24}
            className='h-6 w-auto' 
            priority
          />
        </Link>
        <div className='hidden lg:block'>
          <SearchBar />
        </div>
        {/* Desktop Navigation */}
        <nav
         className='hidden md:flex' 
         aria-label="Main navigation"
        >
          <NavbarLink />
        </nav>
        
        {/* User Actions - Desktop */}
        <div className='hidden md:flex'>
          <UserActions />
        </div>

        {/* Mobile Menu */}
        <div className='md:hidden'>
          <MobileNavbar />
        </div>
      </div>
    </header>
  )
}

export default Navbar



// const Navbar = () => {
//   return (
//     <div className='flex items-center justify-between px-4 py-6 md:px-40 md:py-4'>
//         <Link href="/">
//           <Image 
//           src={Logo} 
//           alt="Logo" 
//           className='w-16 h-6 text-black' 
//           />
//         </Link>
//           {/* SearchBar */}
//         <nav className='hidden md:flex md:gap-12'>
//           <NavbarLink/>
//         </nav>
//           <MobileNavbar />
//     </div>
    
//   )
// }

// export default Navbar
