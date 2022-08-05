import {useEffect, useState} from 'react'
import request from '../requests/Requests'
import UserCard from './UserCard'

function RenderUsers({user}) {
    const [users, setUsers] = useState()
    useEffect(()=> {
        (async()=> setUsers(await request.get('allUsers')))()
    }, [])
  return (
    <div className='cards-wrapper'>
        {users && users.users.map(user => <UserCard key={user._id} user={user}/>)}
    </div>
  )
}

export default RenderUsers