import {useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import request from '../requests/Requests'

function Register() {
    const userNameRef = useRef()
    const passOneyRef = useRef()
    const passTwoRef = useRef()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function getData() {
        setError('')

        const user = {
            userName: userNameRef.current.value,
            passOne: passOneyRef.current.value,
            passTwo: passTwoRef.current.value
        }
        if (user.passOne !== user.passTwo) return setError('Passwords does not match')
        const response = await request.post({userName: user.userName, password: user.passOne}, 'registration')
        if (response.error) setError(response.message)
        if (!response.error) navigate('/users')
        
    }
  return (
    <div className='registration-block'>
        <input ref={userNameRef} type="text" placeholder='User email'/>
        <input ref={passOneyRef} type="text" placeholder='Password'/>
        <input ref={passTwoRef} type="text" placeholder='Repeat password'/>
        {error && <p>{error}</p>}
        <button onClick={getData}>Get data</button>
    </div>
  )
}

export default Register