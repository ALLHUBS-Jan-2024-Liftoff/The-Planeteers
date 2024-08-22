import './Home.css'
import { useState, useEffect } from "react";
import axios from "axios"

export default function War({user}) {

    const location = useLocation();
    const { username, playerPoints, gamePoints } = location.state || {};
    
    const [deckId, setDeckId] = useState('');
    const [playerCard, setPlayerCard] = useState(null);
    const [computerCard, setComputerCard] = useState(null);
    const [winner, setWinner] = useState('');
    const [playerDeckCount, setPlayerDeckCount] = useState(26);
    const [computerDeckCount, setComputerDeckCount] = useState(26);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => {
                setDeckId(response.data.deck_id);
            });
    }, []);

    const drawCards = () => {
        if (gameOver) return;

        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            .then(response => {
                const cards = response.data.cards;
                setPlayerCard(cards[0]);
                setComputerCard(cards[1]);
                determineWinner(cards[0], cards[1]);
            });
    };

    const determineWinner = (playerCard, computerCard) => {
        const cardValues = {
            'ACE': 14,
            'KING': 13,
            'QUEEN': 12,
            'JACK': 11,
            '10': 10,
            '9': 9,
            '8': 8,
            '7': 7,
            '6': 6,
            '5': 5,
            '4': 4,
            '3': 3,
            '2': 2
        };

        const playerValue = cardValues[playerCard.value];
        const computerValue = cardValues[computerCard.value];

        if (playerValue > computerValue) {
            setWinner('Player Wins!');
            setPlayerDeckCount(prevCount => prevCount + 1);
            setComputerDeckCount(prevCount => prevCount - 1);
            updatePlayerPoints(10); // Update player points
            updateGamePoints(5); // Update game points
        } else if (playerValue < computerValue) {
            setWinner('Computer Wins!');
            setPlayerDeckCount(prevCount => prevCount - 1);
            setComputerDeckCount(prevCount => prevCount + 1);
            updatePlayerPoints(-5); // Update player points
            updateGamePoints(-10); // Update game points
        } else {
            setWinner('It\'s a tie!');
        }

        checkGameOver();
    };

    const checkGameOver = () => {
        if (playerDeckCount <= 0) {
            setWinner('Game Over! Computer Wins the game!');
            setGameOver(true);
        } else if (computerDeckCount <= 0) {
            setWinner('Game Over! Player Wins the game!');
            setGameOver(true);
        }
    };

    const updatePlayerPoint = (points) => {
        axios.post('/api/user/updatePlayerPoints', {
            playerPoints: points
        }, {
            headers: { 'Authorization': `Bearer ${Cookies.get('token')}` }
        })
        .then(response => {
            console.log('Player points updated:', response.data);
        })
        .catch(error => {
            console.error('Error updating player points:', error.response ? error.response.data : error.message);
        });
    };

    const updateGamePoint = (points) => {
        axios.post('/api/user/updateGamePoints', {
            gamePoints: points
        }, {
            headers: { 'Authorization': `Bearer ${Cookies.get('token')}` }
        })
        .then(response => {
            console.log('Game points updated:', response.data);
        })
        .catch(error => {
            console.error('Error updating game points:', error.response ? error.response.data : error.message);
        });
    };


    return (
        <div>
            <div className="navbar">
                <header>House Of Cards</header>
                {/* <ul>
                    <li>Home</li>
                    <li>Profile</li>
                    {user?<li>Sign Out</li>: <li>Sign In</li>}
                </ul> */}
            </div>

            <div className="container">
                <h1>War Card Game</h1>
                <button onClick={drawCards} disabled={gameOver}>Draw Cards</button>
                <div className="card-container">
                    {playerCard && (
                        <div>
                            <h2>Player's Card</h2>
                            <img src={playerCard.image} alt={playerCard.code} />
                        </div>
                    )}
                    {computerCard && (
                        <div>
                            <h2>Computer's Card</h2>
                            <img src={computerCard.image} alt={computerCard.code} />
                        </div>
                    )}
                </div>
                <h3 className='black-header'>{winner}</h3>
                <h4 className='black-header'>Player Deck Count: {playerDeckCount}</h4>
                <h4 className='black-header'>Computer Deck Count: {computerDeckCount}</h4>
            </div>

          
            <div className="container-2">
    <div className="row">
        <a href="/how-to-play" className="box howtoplay">How To Play</a>
        {/* <a href="/rating" className="box rating">Rating</a> */}
    </div>
    <a href="/comments" className="box comments">Comments</a>
    {/* <a href="/contact-us" className="box footer">Contact Us</a> */}
</div>

        </div>
    );
}
