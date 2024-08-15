import './Home.css'
import { useState } from "react";



export default function GamePage() {
    return(
    <div>
        <div class = "navbar">
            <header>House Of Cards</header>
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Sign Out</li>
            </ul>
        </div>
        <div class="game">
            Game Goes Here
        </div>
        <div class='row'>
        <div class="howtoplay">How To Play</div>
        <div class="rating">Rating</div>
        </div>
        <div class="comments">Comments</div>
        <div class="footer">Contact Us</div>

    </div>
    )
}