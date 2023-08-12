"use client"

import React from 'react'
import { useRouter } from "next/navigation";
import Button from './Button';

type Props = {
    startCursor : string;
    endCursor : string;
    hasPreviosPage : boolean;
    hasNextPage : boolean;
}


const LoadMore = ({startCursor,endCursor,hasPreviosPage,hasNextPage}: Props) => {

    const router = useRouter();
    const handleNavigation = (page : string) =>{
        const currentParams = new URLSearchParams(window.location.search);
        
        if(page === 'next' && hasNextPage){
            currentParams.delete("startCursor");
            currentParams.set("endCursor",endCursor);
        }else if(page === 'first' && hasPreviosPage){
            currentParams.delete("endCursor");
            currentParams.set("startCursor",startCursor);
        }

        const newPSearchParams = currentParams.toString();

        const newPathName = `${window.location.pathname}?${newPSearchParams}`;

        router.push(newPathName);
        
    }
  return (
    <div className='w-full flexCenter mt-10 gap-5'>
        {
            hasPreviosPage && (
                <Button title='First Page' handleClick={()=>handleNavigation('first')} />
            )
        }
         {
            hasNextPage && (
                <Button title='Next Page' handleClick={()=>handleNavigation('next')} />
            )
        }
    </div>
  )
}

export default LoadMore