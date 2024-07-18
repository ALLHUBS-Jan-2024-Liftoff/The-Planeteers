import { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const onChange = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 13) setError("Invalid age");
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="auth-form-container" >

            <header>House of Cards</header>

            <form onSubmit={handleSubmit}>

                <label htmlFor="name"> Name: </label>
                <input defaultValue={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Full Name" id="name" name="name" />
                

                <label htmlFor="email"> Email: </label>
                <input defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password"> Password: </label>
                <input defaultValue={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" id="password" name="password" />
                
                <label htmlFor="age"> Age: </label>
                <input type="date" placeholder="mm/dd/yyyy" id="age" name="age" onChange={onChange} />
                
                <button>Submit</button>
            </form>
            <button onClick={() => props.onFormSwitch('login')}>Already have account? Log in here!</button>
        </div>
    )
}