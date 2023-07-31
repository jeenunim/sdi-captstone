import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from "../AppContext";
import { Container, Input, Button, Label, Heading } from './Utils/StyledComponents';

const Register = () => {
    const { userId } = useContext(AppContext);
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    if (userId > 0) {
        navigate('/');
    }

    const handleSubmit = (e) => {
        // Simple POST request with a JSON body using fetch
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name
            })
        };
        fetch('http://localhost:8080/sign-up', requestOptions)
        .then(() => {alert('Your account was made successfully!'); 
        setTimeout(window.location.href = '/', 3000)})
    }


    return (
        <Container>
            <Heading>Create New Account</Heading>
            <form onSubmit={handleSubmit}>    
                    <Input 
                        type='text'
                        required
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input 
                        type='password'
                        required
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type='text'
                        required
                        placeholder='First Name' 
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                        type='text'
                        required
                        placeholder='Last Name'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Button>
                        Submit
                    </Button>
                </form>
                <Label onClick={(event) => {navigate('/login')} }>
                    Login
                </Label>
        </Container>
    )
}

export default Register