"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export default function Breadcrumb() {
  const pathname = usePathname()
  
  // Don't show breadcrumb on homepage
  if (pathname === '/') return null
  
  // Split pathname and filter out empty strings
  const segments = pathname.split('/').filter(segment => segment !== '')
  
  // Function to format segment text (decode URI and capitalize)
  const formatSegment = (segment: string) => {
    return decodeURIComponent(segment)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  // Function to build path up to current segment
  const buildPath = (index: number) => {
    return '/' + segments.slice(0, index + 1).join('/')
  }
  
  return (
    <nav aria-label="Breadcrumb" className="bg-white">
      <div className="hidden lg:flex lg:px-40 lg:pt-10">
        <ol className="flex items-center gap-4 text-sm xl:text-lg font-medium">
          {/* Home Link */}
          <li>
            <Link 
              href="/" 
              className="flex items-center text-gray-500 hover:text-black transition-colors"
              aria-label="Home"
            >
              Home
            </Link>
          </li>
          
          {/* Breadcrumb segments */}
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1
            const path = buildPath(index)
            const label = formatSegment(segment)
            
            return (
              <li key={segment + index} className="flex items-center gap-4 ">
                <ChevronRight className="w-6 h-6 mt-1 text-gray-400" />
                {isLast ? (
                  <span className="text-gray-900 text-sm xl:text-lg font-medium">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={path}
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}