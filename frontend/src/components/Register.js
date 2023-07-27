import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        // Simple POST request with a JSON body using fetch
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {username,
                password,
                first_name,
                last_name 
                }
                )
        };
        fetch('http://localhost:8080/sign-up', requestOptions)
        .then(() => {alert('Your account was made successfully!'); 
        setTimeout(window.location.href = '/', 3000)})
    }


    return (
        <main>
            <div className='login-card'>
            <form onSubmit={handleSubmit}>
                    <label className="labelHeaders">Username:
                        <input name="username"
                        type='text'
                        required
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}/>
                    </label><br/><br/>
                    <label className="labelHeaders">Password:
                        <input name="password"
                        type='text'
                        required
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </label><br/><br/>
                    <label className="labelHeaders">First Name:
                        <input name="firstname"
                        type='text'
                        required
                        value={first_name} 
                        onChange={(e) => setFirstName(e.target.value)}/>
                    </label><br/><br/>
                    <label className="labelHeaders">Last Name:
                        <input name="lastname"
                        type='text'
                        required
                        value={last_name} 
                        onChange={(e) => setLastName(e.target.value)}/>
                    </label><br/><br/>
                    <button className='submitButton'>Submit</button>
                </form>
            <div className='link-container'>
                <Link to={'/'}>Already have an account? Log in here.</Link>
            </div>
            </div>
        </main>
    )
}

export default Register