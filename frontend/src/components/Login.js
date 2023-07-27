import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppContext from "../AppContext";

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {username,
                password
                }
                )
        };
        fetch('http://localhost:8080/login', requestOptions)
        .then(res => {
            console.log(res)
            return res.json
            })
        .then(() => {alert('Logged in successfully')})
        
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
                    <br></br>
                    <label for='text'>Password: </label>
                    <input
                    name="password"
                    type='text'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                    <br></br>
                    <button>Log In</button>
                </form>
            </div>
        </main>
    )
}

export default Login