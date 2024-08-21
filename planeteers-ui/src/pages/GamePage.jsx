import './Home.css'
import { useState } from "react";



export default function GamePage() {
    return(
    <div>
        <div class = "navbar">
            <header>House of Cards</header>
        </div>
        <div class="game">
            Game Goes Here
        </div>
        <div class='row'>
        <div class="howtoplay">How To Play</div>
        <div class="rating">Rating</div>
        </div>
        <div class="comments">Comments</div>

    </div>
    )
}