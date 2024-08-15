import './Home.css'
import { useState } from "react";

export default function Contact() {
    return (
        <div>
            <div class = "navbar">
                <header>House Of Cards</header>
                <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Sign Out</li>
                </ul>
            </div>
            <div class="form">
            <label class="title">Contact Us</label>
            <form action="https://formsubmit.co/houseofcardsdevteam@gmail.com" method="POST">
                <div class="inforow">
                <input type="text" name="name" placeholder="Your Name" required></input>
                <input type="email" name="email" placeholder="Your Email" required></input>
                </div>
                <div class="messagerow">
                <textarea type="text" name="message" placeholder="Message" class="message" required></textarea>
                <button type="submit" text="Submit">Submit</button>
                </div>
            </form>        
            </div>
        </div>
    )
}