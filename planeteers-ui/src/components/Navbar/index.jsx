import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/home" >
                        Home
                    </NavLink>
<<<<<<< HEAD
                    <NavLink to="/userprofile" activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Contact Us
=======
                    <NavLink to="/gamepage" activeStyle>
                        Games
                    </NavLink>
                    <NavLink to="/userprofile" activeStyle>
                        Profile
                    </NavLink>
                    <NavLink to="/comment" activeStyle>
                        Comments
>>>>>>> f3ce78f6eb5a5daf3364f5e29a703a8229dd8ee0
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
