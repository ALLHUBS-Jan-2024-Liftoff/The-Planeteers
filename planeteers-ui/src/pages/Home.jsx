import './Home.css'
import { useState } from "react";

export default function Home() {
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
       	<div class="games">
          	<div><img src="https://www.dropbox.com/scl/fi/bmlqqtls5mhd2ti806w29/cardmatch.jpg?rlkey=2l1c8rwwkrx49eorp3z1qh53y&st=cik849uh&raw=1" alt="Card Match" /></div>
  			<div><img src="https://www.dropbox.com/scl/fi/ca6lpj5pg37bj26pp3ful/gameofwar.jpg?rlkey=pfwxuigp06ggy76u8wpnnx82d&st=0g6gd19b&raw=1" alt="Game of War" /></div>
 			<div><img src="https://www.dropbox.com/scl/fi/4y8r6k98508dk5z1rhfop/solitaire.png?rlkey=wgvpgv32pwtg5rl1baj4s0wul&st=f58z71ki&raw=1" alt="Solitaire" /></div>
  			<div><img src="https://www.dropbox.com/scl/fi/93epmz1pc6amh6g1dwrvw/blackjack.jpg?rlkey=jwhpa1cfqaoaw8nwdjaxfah4t&st=wun5jgco&raw=1" alt="Blackjack" /></div>
        </div>
        <div class = "footer">
            <p>Contact Us</p>
        </div>
    </div>
    )
}

