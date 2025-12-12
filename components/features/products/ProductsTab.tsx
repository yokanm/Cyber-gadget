import { ProductValue } from "@/type/type";

interface Tab{
  selectedTab: ProductValue;
  onTabSelect: (tab: ProductValue) => void
}

const productType: {id: ProductValue; name: string}[] = [
  { id: "new", name: "New Arrival" },
  { id: "bestseller", name: "Bestseller" },
  { id: "featured", name: "Featured Products" },
];

const ProductsTab = ({selectedTab, onTabSelect}: Tab) => {
  return (
    <div className='bg-white min-[375px] flex flex-col items-start  py-14 px-4 gap-8'>
    <div className='flex items-center self-stretch gap-6 text-[#8B8B8B] text-center text-base font-medium leading-8'>
        {productType.map((type)=>(
            <button
              key={type.id} 
              className={`hover:text-black relative group hoverEffect ${selectedTab === type.id ? "text-black" :"text-[#8B8B8B]"}`}
              onClick={() => onTabSelect(type.id)}
              >
                {type.name}
                <span
                  className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black group-hover:w-1/2 hoverEffect group-hover:left-0`}
                />
                <span
                  className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black group-hover:w-1/2 hoverEffect group-hover:right-0`}
                />
            </button>
        ))}
    </div>
       
    </div>
  )
}

export default ProductsTab
