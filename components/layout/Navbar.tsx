import Image from 'next/image'
import Link from 'next/link'
import Logo from "../../public/assets/images/Logo_Vector.png"
import React, { Suspense } from 'react'
import NavbarLink from './NavbarLink'
import MobileNavbar from './MobileNavbar'
import UserActions from '../features/auth/UserActions'
import SearchBar from '../features/search/SearchBar'

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 border-b border-zinc-400 bg-white'>
      <div className='flex justify-between items-center px-6 py-6 xl:px-40 lg:py-4 self-stretch'>
        {/* Logo */}
        <Link href="/" aria-label="Go to homepage">
          <Image 
            src={Logo} 
            alt="Cyber Logo" 
            width={64}
            height={24}
            className='h-6 w-auto' 
            priority
          />
        </Link>
        
        {/* Desktop Search - Wrap in Suspense */}
        <div className='hidden lg:block'>
          <Suspense fallback={
            <div className="w-full max-w-xs md:max-w-md h-10 bg-gray-100 rounded-md animate-pulse" />
          }>
            <SearchBar />
          </Suspense>
        </div>
        
        {/* Desktop Navigation */}
        <nav className='hidden md:flex' aria-label="Main navigation">
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