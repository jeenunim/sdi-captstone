import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from "../AppContext";
import { Container, Input, Button, Label } from './Utils/StyledComponents';
import { notify } from './Utils/Toaster';

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { userId, setUserId } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogin = (data) => {
        const { message, member } = data;
        setUserId(member.id);
        notify(message, 'success');
        navigate('/');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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
                notify(err.message, 'error');
            })
        
    }

    return (
        <Container>
                <form onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        placeholder='Username'
                        required
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    >
                    </Input>
                    <Input
                        type='password'
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    >
                    </Input>
                    <br></br>
                    <Button>Log In</Button>
                </form>
                <Label onClick={(event) => {navigate('/signup')} }>Dont't have an account?<br/>Sign up here!</Label>
        </Container>
    )
}

export default Login