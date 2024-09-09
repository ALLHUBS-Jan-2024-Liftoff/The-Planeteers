import { useState } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { 
    MDBContainer, 
    MDBInput, 
    MDBBtn, 
} from 'mdb-react-ui-kit';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [pwHash, setPwHash] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate(); // Use useNavigate for navigation

    const hasLoggedInToday = () => {
        const lastLogin = localStorage.getItem('lastLoginDate');
        const today = new Date().toLocaleDateString();
        return lastLogin === today;
    };
  
      const awardDailyLoginPoints = () => {
        if (!hasLoggedInToday()) {
            const dailyPoints = 100; // Set the number of points you want to award
  
            // Get the current game points from localStorage
            let playerPoints = parseInt(localStorage.getItem('gamePoints')) || 0;
  
            // Add daily points
            playerPoints += dailyPoints;
  
            // Save the new points total to localStorage
            localStorage.setItem('playerPoints', playerPoints);
  
            // Update the last login date
            localStorage.setItem('lastLoginDate', new Date().toLocaleDateString());
  
            console.log(`You've been awarded ${dailyPoints} player points!`);
        } else {
            console.log('You have already received your daily login points today.');
        }
    };
   
    const handleLogin = async () => { 

        try { 
            if (!email || !pwHash) { 
                setError('Please enter both username and password.'); 
                return; 
            } 
  
            const response = await axios.post('/api/user/login', { email, pwHash }); 
            console.log('Login successful:', response.data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('username', email);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            awardDailyLoginPoints();
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
          
            navigate('/home'); 

        } catch (error) { 
            console.error('Login failed:', error.response ? error.response.data : error.message); 
            setError('Invalid username or password.'); 
        } 
    }; 

    return (
        <div className="d-flex justify-content-center align-items-center vh-100"> 
            <div className="border rounded-lg p-4" style={{width: '1100px', height: 'auto'}}> 
            <header>House of Cards</header>

                <MDBContainer className="p-3"> 
            
                    <MDBInput wrapperClass='mb-3' placeholder='Email address' id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} /> 
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={pwHash} onChange={(e) => setPwHash(e.target.value)} /> 
                    {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */} 
                    <button className="mb-4 d-block btn-primary" style={{ height:'50px',width: '100%' }} onClick={handleLogin}>Sign in</button> 
                    <div>
                    <Link to="/register">
                <button 
                    style={{margin: '8px'}}
                    type="button">Register here</button>
                    </Link>
            <button className = 'button'>Forgot Password?</button>
                        <img src="https://www.dropbox.com/scl/fi/nekcsfp5w9ilj8m2y4a8c/house-of-cards.jpg?rlkey=44v72v56nidvs7o3je7kq1r8q&st=6b27e26t&raw=1" alt="House of Cards" />

                    </div> 
            </MDBContainer> 
         </div>
         </div>
        )
    }   
        
  