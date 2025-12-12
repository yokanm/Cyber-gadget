import Link from 'next/link';
import { Home, Search, ShoppingBag, AlertCircle } from 'lucide-react';
;

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center animate-pulse">
              <AlertCircle className="w-16 h-16 text-white" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              !
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold text-gray-900 tracking-tight mb-2">
            404
          </h1>
          <div className="h-1 w-24 bg-black mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Oops! The page you&apos;re looking for seems to have wandered off into the digital void. 
          It might have been moved, deleted, or never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl font-medium group"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            Back to Home
          </Link>
          
          <Link
            href="/category/computer"
            className="flex items-center gap-2 px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:border-gray-900 transition-all font-medium group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Browse Products
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Maybe you&apos;re looking for:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <Link
              href="/category"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">All Categories</p>
                <p className="text-sm text-gray-600">Browse our collections</p>
              </div>
            </Link>

            <Link
              href='/brands'
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Popular Brands</p>
                <p className="text-sm text-gray-600">Shop by brand</p>
              </div>
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">My Account</p>
                <p className="text-sm text-gray-600">Login or sign up</p>
              </div>
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Contact Us</p>
                <p className="text-sm text-gray-600">Get help & support</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-6">
          <p className="text-gray-700 mb-3 font-medium">
            Still can&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-black font-medium hover:underline"
          >
            <Search className="w-5 h-5" />
            Try our search feature
          </Link>
        </div>

        {/* Error Code Reference */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
}