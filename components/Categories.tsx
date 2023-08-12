"use client"

import React from 'react'
import { useRouter,useSearchParams,usePathname } from "next/navigation";
import { categoryFilters } from '@/constant';
const Categories = () => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    console.log(category);
    const handleClick = (filter : string) => {
        router.push(`${pathName}?category=${filter}`)
    };

  return (
    <div className='flexBetween gap-5 w-full flex-wrap'>
        <ul className='flex gap-2 overflow-auto'>
            {categoryFilters.map((filter)=>(
                <button 
                  key={filter}
                  type='button'
                  onClick={()=>handleClick(filter)}
                  className={`${
                    category === filter ? 'bg-light-white-300 font-medium' : 'font-normal'
                  } py-3 px-4 rounded-lg capitalize whitespace-nowrap`}
                >
                    {filter}
                </button>
            ))}
        </ul>
    </div>
  )
}

export default Categories