import React from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const NavBar = () => {
    const navigate = useNavigate();  
    const currentUser = JSON.parse(localStorage.getItem("user"));
    
    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('user');
        
        // Clear cookies (if used)
        Cookies.remove('token');
        
        // Redirect to login page
        navigate('/login');
    };
    
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/home">
                        Home
                    </NavLink>
                    <NavLink to="/userprofile">
                        Profile
                    </NavLink>
                    <NavLink to="/contact">
                        Contact Us
                    </NavLink>
                </NavMenu>

                {!currentUser ? (
                    <NavBtn>
                        <NavBtnLink to="/login">Sign In</NavBtnLink>
                    </NavBtn>
                ) : (
                    <NavBtn>
                        <NavBtnLink as="button" onClick={handleLogout}>
                            Log Out
                        </NavBtnLink>
                    </NavBtn>
                )}

                {currentUser && <h3>Welcome Back {currentUser.name}</h3>}
            </Nav>
        </>
    );
};

export default NavBar;
