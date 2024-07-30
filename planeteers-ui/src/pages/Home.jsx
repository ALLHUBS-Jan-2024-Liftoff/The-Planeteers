import './Home.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Home(username) {
    const history = useNavigate(); 
  
    const handleLogout = () => { 
        // Perform logout actions here (e.g., clear session, remove authentication token) 
        // After logout, redirect to the login page 
        history('/'); 
    }; 
    return (
    <div>
        <div class = "navbar">
            <header>House Of Cards</header>
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Sign Out</li>
            </ul>
        </div>
       	<div class="games">
          	<div>Game 1</div>
  			<div>Game 2</div>
 			<div>Game 3</div>
  			<div>Game 4</div>
        </div>
        <div class = "footer">
            <p>Contact Us</p>
            <button type="button" className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button> 
        </div>
    </div>
    )
}

