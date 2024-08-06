import './Home.css'
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';


// import Cookies from 'js-cookie';

export default function Home() {
    const history = useNavigate(); 
    let location = useLocation();

    console.log('Location State:', location.state);


    const username = location.state?.username || "Guest" ;
  
    const handleLogout = () => { 
        // Perform logout actions here (e.g., clear session, remove authentication token) 
        // After logout, redirect to the login page 
        Cookies.remove('token');
        history('/'); 
    }; 
    return (
    <div>
        <div class = "navbar">
            <header>House Of Cards</header>
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Welcome {username}</li>
                <button type="button" className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button> 
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
        </div>
    </div>
    )
}

