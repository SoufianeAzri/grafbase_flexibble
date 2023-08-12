import { UserProfile,ProjectInterface } from '@/common.types';
import { getUserProject } from '@/lib/actions';
import  Link  from 'next/link';
import React from 'react'
import Image from 'next/image'

type Props = {
    userId : string;
    projectId : string;
}

const RelatedProjects = async ({userId,projectId} : Props) => {
    const result = await getUserProject(userId) as {
        user? : UserProfile
    }

    const filteredProjects = result?.user?.projects?.edges.filter(({node} : {node : ProjectInterface})=>(
        node?.id != projectId
    ))

    if(filteredProjects?.length === 0) return null;
  return (
    <section className='flex flex-col w-full mt-32'>
        <div className='flexBetween'>
            <p className='text-base font-bold'>More by {result?.user?.name}</p>
            <Link href={`/profile/${result?.user?.id}`} className='text-base text-primary-purple'>
                View More
            </Link>
        </div>
        <div className='related_projects-grid'>
            {filteredProjects?.map(({node} : {node : ProjectInterface})=>(
                <div className='flexCenter related_project-card drop-shadow-card'>
                    <Link href={`/project/${node?.id}`} className='flexCenter group relative w-full h-full'>
                        <Image src={node?.image} width={414} height={313} className='object-cover rounded-2xl h-full w-full' alt='project image' />
                        <div className='hidden group-hover:flex related_project-card_title'>
                            <p className='w-full'>{node?.title}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </section>
  )
}

export default RelatedProjects