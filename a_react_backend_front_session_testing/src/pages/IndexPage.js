import {useEffect, useState} from 'react'
import request from '../requests/Requests'
import UserCard from '../components/UserCard'
import { useNavigate } from 'react-router-dom'

function RenderUsers({getSessionUser, sessionUser}) {
    const navigate = useNavigate()
    const [users, setUsers] = useState()

    async function setUsersFunc() {
        getSessionUser()
        setUsers(await request.get('allUsers'))
    }
    
    useEffect(()=> {
        setUsersFunc()
    }, [])
    if (!sessionUser || sessionUser.error === true) navigate('/login')

    return (
    <div className='cards-wrapper'>
        {users && users.users.map(user => <UserCard key={user._id} user={user}/>)}
    </div>
  )
}

export default RenderUsers
