import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    key: string;
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
}

const ProjectCard = ({key,id,image,title,name,avatarUrl,userId} : Props) => {
  return (
    <div className='flex-col flexCenter rounded-2xl drop-shadow-card'>
        <Link href={`/project/${id}`} className='flexCenter group relative h-full w-full'>
          <Image 
            src={image}
            width={414}
            height={314}
            alt='Project image'
            className='object-cover w-full h-full rounded-2xl'
          />
          <div className='hidden group-hover:flex profile_card-title'>
            <p className='w-full'>{title}</p>
          </div>
        </Link>

        <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
            <Link href={`/profile/${userId}`}>
               <div className='flexCenter gap-2'>
                  <Image 
                    src={avatarUrl}
                    alt='User profile'
                    className='rounded-full'
                    width={24}
                    height={24}
                  />
                  <p>{name}</p>
               </div>
            </Link>

            <div className='flexCenter gap-3'>
                <div className='flexCenter gap-2'>
                    <Image src='/hearth.svg' alt='heart' width={13} height={12} />
                    <p className='text-sm'>5.2k</p>
                </div>
                <div className='flexCenter gap-2'>
                    <Image src='/eye.svg' alt='eye' width={13} height={12} />
                    <p className='text-sm'>12.4k</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard