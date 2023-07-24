import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    const [First_Name, setFirstName] = useState('');
    const [Last_Name, setLastName] = useState('');
    const [Username, setUsername] = useState('');

    const handleSubmit = (e) => {
        // Simple POST request with a JSON body using fetch
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {First_Name,
                Last_Name, 
                Username
                }
                )
        };
        fetch('http://localhost:3001/users', requestOptions)
        .then(() => {alert('Your account was made successfully!'); 
        setTimeout(window.location.href = '/login', 3000)})
    }


    return (
        <main>
            <div className='login-card'>
            <form onSubmit={handleSubmit}>
                    <label className="labelHeaders">First Name:
                        <input name="firstName"
                        type='text'
                        required
                        value={First_Name} 
                        onChange={(e) => setFirstName(e.target.value)}/>
                    </label><br/><br/>
                    <label className="labelHeaders">Last Name:
                        <input name="lastName"
                        type='text'
                        required
                        value={Last_Name} 
                        onChange={(e) => setLastName(e.target.value)}/>
                    </label><br/><br/>
                    <label className="labelHeaders">Username:
                        <input name="username"
                        type='text'
                        required
                        value={Username} 
                        onChange={(e) => setUsername(e.target.value)}/>
                    </label><br/><br/>
                    <button className='submitButton'>Submit</button>
                </form>
            <div className='link-container'>
                <Link to={'/login'}>Already have an account? Log in here.</Link>
            </div>
            </div>
        </main>
    )
}

export default Register