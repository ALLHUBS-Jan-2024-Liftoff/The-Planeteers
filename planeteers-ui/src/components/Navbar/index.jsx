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
    const navigate = useNavigate();  // Use navigate hook here
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
                    <NavLink to="/home" >
                        Home
                    </NavLink>
                    <NavLink to="/userprofile" activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Contact Us
                    </NavLink> 
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
                    </NavLink>
                </NavMenu>
                {!currentUser ? (
                    <NavBtn>
                        <NavBtnLink to="/login">Sign In</NavBtnLink>
                    </NavBtn>
                ) : (
                    <NavBtn>
                        {/* <button  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                            Log out
                        </button> */}
                        <NavBtnLink onClick={handleLogout}> Log Out</NavBtnLink>
                    </NavBtn>
                )}
                {currentUser && <h3>Welcome Back {currentUser.name}</h3>}
            </Nav>
        </>
    );
};
export default NavBar
