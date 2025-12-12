import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import NavbarLink from './NavbarLink'
import UserActions from '../features/auth/UserActions'
import SearchBar from '../features/search/SearchBar'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='md:hidden w-10 h-10' />
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
        {/* Add VisuallyHidden title for accessibility */}
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>
        
        <nav className='grid gap-6 text-lg font-medium mt-5 ml-5'>
          <NavbarLink />
        </nav>
        
        {/* Add search to mobile menu */}
        <div className="mt-6 px-5">
          <SearchBar />
        </div>
        
        <div>
          <UserActions />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar