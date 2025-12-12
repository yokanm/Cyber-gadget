
import Hero from "@/components/features/home/Hero";
import Banner from "@/components/features/home/Banner";
import Categories from "@/components/features/home/Categories";
import HomeGrid from "@/components/features/home/HomeGrid";
import BigBanner from "@/components/features/home/BigBanner";
import Discount from "@/components/features/cart/Discount";
import Banner3 from "@/components/features/home/Banner3";



export default async function Home() {
    return (
    <main className="overflow-hidden">
      <Hero />
      <Banner />
      <Categories/>
      <HomeGrid />
      <BigBanner />
      <section className="py-14 px-4 xl:px-40 xl:py-14 bg-[#F9F9F9]">
        <Discount />
      </section>
      
      <Banner3 />

    </main>
  );
}
 
