import './Home.css'
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';


export default function Home() {
    const history = useNavigate(); 
    let location = useLocation();

    console.log('Location State:', location.state);


    const username = location.state?.username || "Guest" ;
  
    const handleLogout = () => { 
        // Perform logout actions here (e.g., clear session, remove authentication token) 
        // After logout, redirect to the login page 
        Cookies.remove('token');
        history('/'); 
    }; 
    return (
    <div>
        <div class = "navbar">
            <header>Houses Of Cards</header>
            <ul>
                <li>Welcome {username}</li>
                <button type="button" className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button> 
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

