import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styled from 'styled-components'
import AppContext from "../AppContext";
import { NavItem } from './Utils/StyledComponents';
import { notify } from './Utils/Toaster';
import { HeaderContainer as Container, LightThemeButton, DarkThemeButton } from './Utils/StyledComponents';

const Header = () => {

    const navigate = useNavigate();
    const { userId, setUserId } = useContext(AppContext);
    const { isDarkMode, setIsDarkMode } = useContext(AppContext);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    
    const handleLogin = () => {
        navigate('login');
    }

    const handleLogout = () => {
        document.cookie = `memberId=${userId};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        setUserId(0);
        navigate('/login');
        notify('Logged out successfully!', 'success');
    }

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    const render = () => {
        if (isLoggedIn) {
            return (
                <>
                    <NavItem onClick={() => navigate('/profile')}>
                        Profile
                    </NavItem>
                    <NavItem onClick={handleLogout}>
                        Logout
                    </NavItem>
                </>
            )
        } else {
            return (
                <NavItem onClick={handleLogin}>
                    Login
                </NavItem>
            )
        }
    }

    useEffect(() => {
        setIsLoggedIn(userId > 0);
    }, [userId])

    return (
        <Container>
            <NavItem onClick={() => navigate('/')}>
                Home
            </NavItem>
            {render()}
            {isDarkMode ? <LightThemeButton onClick={toggleDarkMode} /> : <DarkThemeButton onClick={toggleDarkMode} />}
        </Container>
    )
}

export default Header