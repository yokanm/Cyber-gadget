
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { SearchIcon } from 'lucide-react'
import React from 'react'

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Search = ({ searchQuery, setSearchQuery }: SearchProps) => {
  return (
    <div>
        <InputGroup>
          <InputGroupInput type='search' value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)}  placeholder='Search' className='text-stone-500'/>
          <InputGroupAddon >
            <SearchIcon style={{width:'24px', height:'24px', color:'#989898'}}/>
          </InputGroupAddon>
        </InputGroup>
    </div>
  )
}

export default Search
    // <div className='hidden md:flex bg-neutral-100 justify-start items-center rounded-lg gap-2'>
    //     <SearchIcon className='w-6 h-6 left-[4px] top-[4px] text-neutral-400' />
    //     <input
    //      type='search' 
    //      placeholder='Search' 
    //      className='text-stone-500 text-sm font-medium opacity-50 bg-transparent border-none outline-none placeholder:text-stone-500 '
    //     />
    // </div>