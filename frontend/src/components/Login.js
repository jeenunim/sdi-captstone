import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from "../AppContext";

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { userId, setUserId } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogin = (data) => {
        const { message, member } = data;
        setUserId(member.id);
        alert(message);
        setTimeout(() => {navigate('/')}, 3000);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        };
        fetch('http://localhost:8080/login', requestOptions)
            .then(res => res.json())
            .then(data => {
                handleLogin(data);
            })
            .catch(err => {
                alert(err.message);
            })
        
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
            <div className='link-container'>
                <Link to={'/signup'}>Don't have an account? Sign-up here!</Link>
            </div>
            </div>
        </main>
    )
}

export default Login