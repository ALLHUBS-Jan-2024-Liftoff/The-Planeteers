import './Home.css'
import { useNavigate,Link, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';


export default function Home() {
    // const history = useNavigate(); 
    // let location = useLocation();

    // console.log('Location State:', location.state);


    const username = localStorage.getItem('username');
  
    const handleLogout = () => { 
        setUser({});
        setUsername("");
        setPassword("");
        localStorage.clear();
        Cookies.remove('token');
        const navigate = useNavigate(); // Use navigate function to redirect
        navigate('/login'); 
    }; 
    return (
    <div>
        <div class = "navbar">
            <header>House of Cards
            <button type="button" onClick={handleLogout}>Logout</button> 

            </header>
            <ul>
                <li>Welcome {username}!</li>
                </ul>
        </div>
        <div class="emptyspace">.</div>
        <div class="emptyspace">.</div>
       	<div class="games">
            <Link to="/CardMatch">
          	    <div><img src="https://www.dropbox.com/scl/fi/bmlqqtls5mhd2ti806w29/cardmatch.jpg?rlkey=2l1c8rwwkrx49eorp3z1qh53y&st=cik849uh&raw=1" alt="Card Match" /></div>
                <div>Card Match</div>
            </Link>
            <Link to="/War">
  			    <div><img src="https://www.dropbox.com/scl/fi/ca6lpj5pg37bj26pp3ful/gameofwar.jpg?rlkey=pfwxuigp06ggy76u8wpnnx82d&st=0g6gd19b&raw=1" alt="Game of War" /></div>
              <div>Game Of War</div>
            </Link>
            <Link to="/Solitaire">
 			    <div><img src="https://www.dropbox.com/scl/fi/4y8r6k98508dk5z1rhfop/solitaire.png?rlkey=wgvpgv32pwtg5rl1baj4s0wul&st=f58z71ki&raw=1" alt="Solitaire" /></div>
                <div>Solitaire</div>
            </Link>
            <Link to="/Blackjack">
  			    <div><img src="https://www.dropbox.com/scl/fi/93epmz1pc6amh6g1dwrvw/blackjack.jpg?rlkey=jwhpa1cfqaoaw8nwdjaxfah4t&st=wun5jgco&raw=1" alt="Blackjack" /></div>
                <div>Blackjack</div>
            </Link>

        </div>
    </div>
    )
}

