import { useState } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";
import { 
    MDBContainer, 
    MDBInput, 
    MDBBtn, 
} from 'mdb-react-ui-kit';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pwHash, setPwHash] = useState('');
    const [error, setError] = useState(''); 
    const history = useNavigate(); 
   
    const handleLogin = async () => { 

        try { 
            if (!email || !pwHash) { 
                setError('Please enter both username and password.'); 
                return; 
            } 
  
            const response = await axios.post('/api/user/login', { email, pwHash }); 
            console.log('Login successful:', response.data); 
            history('/home'); 
        } catch (error) { 
            console.error('Login failed:', error.response ? error.response.data : error.message); 
            setError('Invalid username or password.'); 
        } 
    }; 

    return (
        <div className="auth-form-container" >

            <header>House of Cards</header>
            
            <MDBContainer className="p-3"> 
                    <MDBInput wrapperClass='mb-4' placeholder='Email address' id='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)} /> 
                    <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' value={pwHash} onChange={(e) => setPwHash(e.target.value)} /> 
                    {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */} 
                    <button className="mb-4 d-block btn-primary" style={{ height:'50px',width: '100%' }} onClick={handleLogin}>Sign in</button> 
                    <div>
                    <Link to="/register">
                <button type="button">Register here</button>
                    </Link>
            <button className = 'button'>Forgot Password?</button>
                        <img src="https://www.dropbox.com/scl/fi/nekcsfp5w9ilj8m2y4a8c/house-of-cards.jpg?rlkey=44v72v56nidvs7o3je7kq1r8q&st=6b27e26t&raw=1" alt="House of Cards" />

                    </div> 
            </MDBContainer> 
         </div>
        )
    }   
        
  