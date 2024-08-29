
import React, { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { Link } from 'react-router-dom'; // Import useHistory hook 
import Cookies from 'js-cookie';
import { 
    MDBContainer, 
    MDBInput, 
    MDBBtn, 
} from 'mdb-react-ui-kit';


export const Register = () => {
    const [email, setEmail] = useState('');
    const [pwHash, setPwHash] = useState('');
    const [confirmPwHash, setConfirmPwHash] = useState(''); 
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(''); // State to manage error messages 
    const navigate = useNavigate(); // Use useNavigate for navigation

    const onChange = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 13) setError("Invalid age")
            return setAge(age);

    }

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
    
    const handleSubmit = async () => {
        try {
          if (!name || !email || !age || !pwHash || !confirmPwHash) {
            setError('Please fill in all fields.');
            return;
          }
    
          if (pwHash !== confirmPwHash) {
            throw new Error('Passwords do not match');
          }
    
          const response = await axios.post('/api/user/create', {
            name,
            email,
            age,
            pwHash
          });
    
          const token = response.data.token;
          localStorage.setItem('token', token);
          localStorage.setItem('username', email);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          awardDailyLoginPoints();
          Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
          
          navigate('/home'); 
        } catch (error) {
          console.error('Registration failed', error.response ? error.response.data : error.message); 
          setError('Registration failed due to duplicate emails', error.response ? error.response.data : error.message);
        }
      };
    

    return (
        <div className="auth-form-container" >
            <MDBContainer className="p-3"> 
            <header>House of Cards</header>

            {error && <p className="text-danger">{error}</p>} 
                    <MDBInput wrapperClass='mb-3' id='name' placeholder={"Full Name"} value={name} type='text'
                              onChange={(e) => setName(e.target.value)}/> 
                    <MDBInput wrapperClass='mb-3' placeholder='Email Address' id='email' value={email} type='email'
                              onChange={(e) => setEmail(e.target.value)}/> 
                     <MDBInput wrapperClass='mb-3' placeholder='age' id='age' type='date' defaultValue={age} 
                              onChange={onChange}/>          
                    <MDBInput wrapperClass='mb-3' placeholder='Password' id='password' type='password' value={pwHash} 
                              onChange={(e) => setPwHash(e.target.value)}/>
                    <MDBInput wrapperClass='mb-3' placeholder='Confirm Password' id='confirmPwHash' type='password'
                              value={confirmPwHash} 
                              onChange={(e) => setConfirmPwHash(e.target.value)}/> 
  

                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
                            style={{height: '40px', width: '100%', padding: '0px'}} 
                            onClick={handleSubmit}>Sign Up 
                    </button> 
                    <div>

                    </div>
                    <Link to="/login">
                 <button type="button"
                         style={{margin: '10px', padding: '8px'}}>
                      Already have account? Log in here!
                 </button>
                </Link>
                </MDBContainer> 
            </div> 
    ); 
} 
  