
import React, { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { Link } from 'react-router-dom'; // Import useHistory hook 
import { 
    MDBContainer, 
    MDBInput, 
    MDBBtn, 
} from 'mdb-react-ui-kit';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pwHash, setPwHash] = useState('');
    const [confirmPwHash, setConfirmPwHash] = useState(''); 
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(''); // State to manage error messages 
    const history = useNavigate();

    const onChange = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 13) setError("Invalid age")
            return setAge(age);

    }
    
    const handleSubmit = async () => { 
        try { 
            // Check for empty fields 
            if (!name || !email || !age || !pwHash || !confirmPwHash ) { 
                setError('Please fill in all fields.'); 
                return; 
            } 
  
            if (pwHash !== confirmPwHash) { 
                throw new Error("Passwords do not match"); 
            } 
  
            const response = await axios.post('/api/user/create', { 
                name,
                email,
                age,
                pwHash
            }); 
            // Handle successful signup 
            console.log(response.data); 
            history('/home'); 
        } catch (error) { 
            // Handle signup error 
            console.error('Signup failed:', error.response ? error.response.data : error.message); 
            setError(error.response ? error.response.data : error.message); 
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
                            style={{height: '40px', width: '100%'}} 
                            onClick={handleSubmit}>Sign Up 
                    </button> 
  
                    <Link to="/login">
                 <button type="button">
                      Already have account? Log in here!
                 </button>
                </Link>
                </MDBContainer> 
            </div> 
    ); 
} 
  