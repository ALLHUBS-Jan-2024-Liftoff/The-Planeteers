import { useState } from "react";
import { Link } from "react-router-dom"


export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pwHash, setPwHash] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const onChange = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 13) setError("Invalid age")
            return setAge(age);

    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { name, email, age, pwHash };
        console.log(user);
    
        fetch("http://localhost:8080/user/create", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(user)
        }).then(() => {
            console.log("New User added");
        }).catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="auth-form-container" >

            <header>House of Cards</header>

            <form onSubmit={handleSubmit}>

                <label htmlFor="name"> Name: </label>
                <input defaultValue={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Full Name" id="name" name="name" />
                

                <label htmlFor="email"> Email: </label>
                <input defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="pwHash"> Password: </label>
                <input defaultValue={pwHash} onChange={(e) => setPwHash(e.target.value)} type="password" placeholder="******" id="password" name="password" />
                
                <label htmlFor="age"> Age: </label>
                <input defaultValue={age} type="date" placeholder="mm/dd/yyyy" id="age" name="age" onChange={onChange} />
                
                <button onClick={handleSubmit}>Submit</button>
            </form>
             <Link to="/login">
                 <button type="button">
                      Already have account? Log in here!
                 </button>
             </Link>
{/*             <button onClick={() => props.onFormSwitch('login')}>Already have account? Log in here!</button> */}
        </div>
    )
}