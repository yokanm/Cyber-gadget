"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


export const navbarLinks = [
    {
        id:0,
        label: "Home",
        href: "/"
    },
    { 
        id:1, 
        label: "About", 
        href: "/about" 
    },
    {
        id:2, 
        label: "Services", 
        href: "/services" 
    },
    { 
        id:3, 
        label: "Contact", 
        href: "/contact" 
    },
]



const NavbarLink = () => {
    const location = usePathname()
    return(
        <div className='flex flex-col md:flex-row gap-2 justify-start items-start xl:gap-12'>
            {navbarLinks.map((link)=>(
                <Link
                    key={link.id} 
                    href={link.href}
                    className={cn(
                        location === link.href ? 
                        "text-black opacity-100"
                        : 
                        "text-black opacity-30",
                        "text-base font-medium font-inter hover:opacity-100 transition-opacity duration-150"
                )}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    )
 
}

export default NavbarLink
