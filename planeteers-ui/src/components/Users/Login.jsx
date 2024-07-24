import { useState } from "react";
import { Link } from "react-router-dom"

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pwHash, setPwHash] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    function sendLoginRequest(){

        const userLogin = { email, pwHash }
    
        fetch("http://localhost:8080/user/login", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(userLogin)
        }).then(() => {
            console.log("Sucessfully login");
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="auth-form-container" >

            <header>House of Cards</header>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email"> Email: </label>
                <input defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                
                <label htmlFor="pass"> Password: </label>
                <input defaultValue={pwHash} onChange={(e) => setPwHash(e.target.value)} type="password" placeholder="******" id="password" name="password" />

                <button id="submit" onClick={()=>sendLoginRequest()}>Log in</button>

            </form>
            <Link to="/register">
                <button type="button">Register here</button>
            </Link>
            <button className = 'button'>Forgot Password?</button>
            <img src="https://www.dropbox.com/scl/fi/nekcsfp5w9ilj8m2y4a8c/house-of-cards.jpg?rlkey=44v72v56nidvs7o3je7kq1r8q&st=6b27e26t&raw=1" alt="House of Cards" />
        </div>
    )
}