import { UserProfile } from '@/common.types';
import ProfilePage from '@/components/ProfilePage';
import { getUserProject } from '@/lib/actions'
import React, { use } from 'react'

type Props = {
  params : {
    id : string;
  }
}

const UserProfile = async( {params} : Props) => {
    const result = await getUserProject(params.id,100) as { user : UserProfile};
    console.log("User Profile")
    if(!result.user){
        <p className='no-result-text'>Failed to fetch user data</p>
    }
    console.log(result.user.projects.edges.length);
  return (
    <ProfilePage user={result?.user} />
  )
}

export default UserProfile