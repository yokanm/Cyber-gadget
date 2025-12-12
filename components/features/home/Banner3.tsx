import { Button } from "@/components/ui/button";
import Link from "next/link";


const Banner3 = () => {
  return (
    <section className="bg-[url('/assets/images/Banner.png')] bg-cover bg-center bg-no-repeat px-4 py-26 flex items-center justify-center lg:h-[400px] overflow-hidden " >
      <div className="flex flex-col items-center gap-10 ">
        <div className="text-white text-center">
          <h3 className=" font-thin text-5xl">Big Summer 
             <span className="font-bold block">Sale</span></h3>
          <p className="text-base text-[#787878] text-center">Commodo fames vitae vitae leo mauris in Eu consequat</p>
        </div>

        <Link href="/category/phone">
          <Button 
            variant='custom' 
            size='custom'
            className="hover:bg-white hover:text-gray-900 "
          >
            Shop Now
          </Button>
        </Link>
      </div>
      
    </section>
  );
};

export default Banner3;
