import request from '../requests/Requests'
import {useNavigate} from 'react-router-dom'


function Toolbar({sessionUser, getSessionUser}) {  
    const navigate = useNavigate() 
    async function logoutSessionUser() {
        const logout = await request.get('logout')
        getSessionUser()
        navigate('/login')
    }



  return (
    <div>

        {sessionUser && sessionUser.error === false ? <button onClick={logoutSessionUser}>Logout</button> :
        <div>
            <button onClick={()=>navigate('/register')}>Register</button>
            <button onClick={()=>navigate('/login')}>Login</button>
        </div>
        }

    </div>
  )
}

export default Toolbar