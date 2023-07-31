import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from "../AppContext";
import { NavItem, LightThemeButton, DarkThemeButton } from './Utils/StyledComponents';
import { notify } from './Utils/Toaster';
import { HeaderContainer as Container } from './Utils/StyledComponents';

const Header = () => {

    const navigate = useNavigate();
    const { userId, setUserId, isDarkMode, setIsDarkMode } = useContext(AppContext);
    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        document.cookie = `memberId=${userId};expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        setUserId(0);
        navigate('/login');
        notify('Logged out successfully!', 'success');
    }

    const render = () => {
        if (userId > 0) {
            return (
                <>
                    <NavItem onClick={() => navigate('/profile')}>
                        Profile
                    </NavItem>
                    <NavItem onClick={handleLogout}>
                        Logout
                    </NavItem>
                    <NavItem onClick={()=> navigate('/subordinates')}>
                        TESTING SUBORDINATES    
                    </NavItem>
                </>
            )
        } else {
            return(
                <NavItem onClick={handleLogin}>
                    Login
                </NavItem>
            )
        }
    }

    return (
        <Container>
            <NavItem onClick={() => navigate('/')}>
                Home
            </NavItem>
            {render()}
            {isDarkMode ? <LightThemeButton onClick={() => {setIsDarkMode(false)}}/> : <DarkThemeButton onClick={() => {setIsDarkMode(true)}}/>}
        </Container>
    )
}

export default Header