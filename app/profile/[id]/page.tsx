import { ProjectInterface, UserProfile } from '@/common.types';
import ProfilePage from '@/components/ProfilePage';
import { getUserProject } from '@/lib/actions'
import React from 'react'

const UserProfile = async( {params : {id}} : {params : {id : string}}) => {
    const result = await getUserProject(id,100) as { user : UserProfile};

    if(!result.user){
        <p className='no-result-text'>Failed to fetch user data</p>
    }
  return (
    <ProfilePage user={result?.user} />
  )
}

export default UserProfile