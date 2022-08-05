import {useRef, useState} from 'react'
import request from '../requests/Requests'

function Login({setIsLogged}) {
    const userNameRef = useRef()
    const passRef = useRef()
    const [error, setError] = useState()
    async function getData() {
        setError('')
        const user = {
            userName: userNameRef.current.value,
            password: passRef.current.value
        }
        const response = await request.post({userName: user.userName, password: user.password}, 'login')
        if (response.error) setError(response.message)
        if (!response.error) setIsLogged(true)
        
    }

  return (
    <div>
        <input ref={userNameRef} type="text" placeholder='User name'/>
        <input ref={passRef} type="text" placeholder='Password'/>
        {error && <h4>{error}</h4>}
        <button onClick={getData}>Get data</button>
    </div>
  )
}

export default Login