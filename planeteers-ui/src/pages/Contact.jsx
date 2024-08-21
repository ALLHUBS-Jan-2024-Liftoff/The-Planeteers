import './Home.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
    const [responseMessage, setResponseMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target);

        fetch('https://formsubmit.co/ajax/houseofcardsdevteam@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                setResponseMessage('Thank you for your submission!');
                event.target.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'An error occurred');
                });
            }
        })
        .catch(error => {
            setResponseMessage(`Error: ${error.message}`);
        });
    };

    return (
        <div>
            <div className="navbar">
<<<<<<< HEAD
                <header>House of Cards</header>
=======
                <header>House Of Cards</header>
                <ul>
                    <li>Home</li>
                    <li>Profile</li>
                    <li>Sign Out</li>
                </ul>
>>>>>>> f3ce78f6eb5a5daf3364f5e29a703a8229dd8ee0
            </div>
            <div className="myForm">
                <label className="title">Contact Us</label>
                <form onSubmit={handleSubmit}>
                    <div className="inforow">
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="email" placeholder="Your Email" required />
                        <input type="hidden" name="_captcha" value="false" />
                    </div>
                    <div className="messagerow">
                        <textarea name="message" placeholder="Message" className="message" required />
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div id="responseMessage">{responseMessage}</div>
            </div>
        </div>
    );
}
