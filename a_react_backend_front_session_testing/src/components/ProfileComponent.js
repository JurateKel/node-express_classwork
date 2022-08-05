import {useEffect, useState, useRef} from 'react'
import request from '../requests/Requests'


function ProfileComponent({user}) {
    const [userProfile, setUserProfile] = useState('')

    useEffect(()=> {
        async function getUser() {
        const response = await request.get('getUser')
        if (!response.error) setUserProfile(response.user);
        }
        getUser()
    }, [])


  return (
    <div>
    {userProfile && 
        <div className='user-card'>
            <img src={userProfile.photo} alt="" />
            <h4>{userProfile.userName}</h4>
        </div>}
    </div>
  )
}

export default ProfileComponent