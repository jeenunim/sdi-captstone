import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styled from 'styled-components'
import AppContext from "../AppContext";

const Container = Styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        box-shadow: 0px 0px 16px #0008;
        margin-bottom: 5vh;
    `;

    const HomeButton = Styled.div`
        display: inline-block;
        cursor: pointer;
        font-weight: bold;
        padding: 10px;
        letter-spacing: 1px;
    `;

    const LoginButton = Styled.div`
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        letter-spacing: 1px;
    `;

    const ProfileButton = Styled.div`
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        letter-spacing: 1px;
    `;

    const LogoutButton = Styled.div`
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        letter-spacing: 1px;
    `;

const Header = () => {

    const navigate = useNavigate();
    const { userId, setUserId } = useContext(AppContext);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    const handleLogin = () => {
        navigate('login');
    }

    const handleLogout = () => {
        document.cookie = `memberId=${userId};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        setUserId(0);
        navigate('/login');
    }

    const render = () => {
        if (isLoggedIn) {
            return (
                <>
                    <ProfileButton onClick={() => navigate('/profile')}>
                        Profile
                    </ProfileButton>
                    <LogoutButton onClick={handleLogout}>
                        Logout
                    </LogoutButton>
                </>
            )
        } else {
            <LoginButton onClick={handleLogin}>
                Login
            </LoginButton>
        }
    }

    useEffect(() => {
        setIsLoggedIn(userId > 0);
    }, [userId])

    return (
        <Container>
            <HomeButton onClick={() => navigate('/')}>
                Home
            </HomeButton>
            {render()}
        </Container>
    )
}

export default Header