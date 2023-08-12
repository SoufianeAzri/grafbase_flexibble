import React, { MouseEventHandler } from 'react'
import Image from 'next/image'

type Props = {
    title : string;
    isSubmitting? : boolean;
    rightIcon? : string;
    leftIcon? : string;
    bgColor? : string;
    textColor? : string;
    handleClick? : MouseEventHandler;
    type?: 'submit' | 'button',
}

const Button = ({title,leftIcon,isSubmitting,rightIcon,bgColor,handleClick,type,textColor}: Props) => {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 ${textColor || 'text-white'} ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full`}
      onClick={handleClick}
    >
        {leftIcon && (
            <Image src={leftIcon} width={14} height={14} alt='left' />
        )}
        {title}
        {rightIcon && (
            <Image src={rightIcon} width={14} height={14} alt='right' />
        )}
    </button>
  )
}

export default Button