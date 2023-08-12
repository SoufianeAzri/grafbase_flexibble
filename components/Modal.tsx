"use client"

import React from 'react'
import {useCallback, useRef, ReactNode} from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'

const Modal = ({children}: {children : ReactNode}) => {
    const overly = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const onDismiss = useCallback(() => {
        router.push('/')
    },[router]);
    const handleClick = useCallback((e:React.MouseEvent)=>{
        if((e.target === overly.current) && onDismiss){
            onDismiss();
        }
    },[overly,onDismiss]);

  return (
    <div ref={overly} className='modal' onClick={handleClick}>
        <button type='button' className='absolute top-4 right-8' onClick={onDismiss}>
            <Image src='/close.svg' alt='close' width={17} height={20} />
        </button>
        <div ref={wrapper} className='modal_wrapper'>
            {children}
        </div>
    </div>
  )
}

export default Modal