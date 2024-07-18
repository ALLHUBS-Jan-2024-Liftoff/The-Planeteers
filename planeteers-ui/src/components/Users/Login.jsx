import { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="auth-form-container" >

            <header>House of Cards</header>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email"> Email: </label>
                <input defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                
                <label htmlFor="pass"> Password: </label>
                <input defaultValue={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" id="password" name="password" />

                <button>Log in</button>

            </form>
            <button onClick={() => props.onFormSwitch('register')}>Register here</button>
            <button>Forgot Password?</button>
            <img src="https://www.dropbox.com/scl/fi/nekcsfp5w9ilj8m2y4a8c/house-of-cards.jpg?rlkey=44v72v56nidvs7o3je7kq1r8q&st=6b27e26t&raw=1" alt="House of Cards" />
        </div>
    )
}