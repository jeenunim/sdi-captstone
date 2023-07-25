import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ParentContext } from '../App'

const Login = () => {
    const { userData } = useContext(ParentContext)
    const [ username, setUsername ] = useState('')
    let user = userData.map((e) => e.Username)
    console.log(user)
    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.includes(username)) {
            alert(`Logged in successfully, welcome ${username}`)
            localStorage.setItem('username', username)
            window.location.href = '/'
        } else {
            alert('This username does not exist. Please try again.')
        }
        
    }

    return (
        <main>
            <div className='login-card'>
                <form onSubmit={handleSubmit}>
                    <label for='text'>Username: </label>
                    <input
                    name="username"
                    type='text'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    >
                    </input>
                    <button>Log In</button>
                </form>
                <div className='link-container'>
                    <Link to={'/register'}>Register for an Account!</Link>
                </div>
            </div>
        </main>
    )
}

export default Login