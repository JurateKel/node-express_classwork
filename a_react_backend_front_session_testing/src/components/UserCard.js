import React from 'react'
import {useNavigate} from 'react-router-dom'

function UserCard({user}) {
  const navigate = useNavigate()
  return (
    <div className='user-card' onClick={()=> navigate('/users/'+ user.userName)}>
        <img src={user.photo} alt="" />
        <h4>{user.userName}</h4>
    </div>
  )
}

export default UserCard