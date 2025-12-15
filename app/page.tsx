import { Suspense } from 'react';
import Hero from "@/components/features/home/Hero";
import Banner from "@/components/features/home/Banner";
import Categories from "@/components/features/home/Categories";
import HomeGrid from "@/components/features/home/HomeGrid";
import BigBanner from "@/components/features/home/BigBanner";
import Discount from "@/components/features/cart/Discount";
import Banner3 from "@/components/features/home/Banner3";
import { fetchProducts } from '@/lib/api';

function DiscountSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80" />
      ))}
    </div>
  );
}

export default async function Home() {
  // Fetch data server-side
  const products = await fetchProducts();

  return (
    <main className="overflow-hidden">
      <Hero />
      <Banner />
      <Categories products={products} />
      <HomeGrid products={products} />
      <BigBanner />
      <section className="py-14 px-4 xl:px-40 xl:py-14 bg-[#F9F9F9]">
        <Suspense fallback={<DiscountSkeleton />}>
          <Discount products={products} />
        </Suspense>
      </section>
      <Banner3 />
    </main>
  );
}