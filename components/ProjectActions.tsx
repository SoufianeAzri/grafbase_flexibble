"use client"

import Link from 'next/link'
import React from 'react'
import {useState} from 'react'
import Image from 'next/image'
import { deleteProject, fetchToken } from '@/lib/actions'
import { useRouter } from 'next/navigation'


const ProjectActions = ({projectId} : {projectId : string}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async() =>{
        setIsDeleting(true);

        const {token} = await fetchToken();
        try {
            await deleteProject(projectId,token);
            router.push('/')
        } catch (error) {
            console.log(error)
        } finally{
            setIsDeleting(false);
        }
    }
  return (
    <>
      <Link href={`/edit-project/${projectId}`} className='flexCenter edit-action_btn'>
        <Image src='/pencile.svg' alt='edit' height={15} width={15} />
      </Link>

      <button className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`} onClick={handleDelete}>
        <Image src='/trash.svg' width={15} height={15} alt='delete' />
      </button>
    </>
  )
}

export default ProjectActions