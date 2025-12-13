import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React, { Suspense } from 'react'
import NavbarLink from './NavbarLink'
import UserActions from '../features/auth/UserActions'
import SearchBar from '../features/search/SearchBar'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export default function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='md:hidden w-10 h-10' />
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        
        <nav className='grid gap-6 text-lg font-medium mt-5 ml-5'>
          <NavbarLink />
        </nav>
        
        {/* Add search to mobile menu - Wrap in Suspense */}
        <div className="mt-6 px-5">
          <Suspense fallback={
            <div className="w-full h-10 bg-gray-100 rounded-md animate-pulse" />
          }>
            <SearchBar />
          </Suspense>
        </div>
        
        <div>
          <UserActions />
        </div>
      </SheetContent>
    </Sheet>
  )
}