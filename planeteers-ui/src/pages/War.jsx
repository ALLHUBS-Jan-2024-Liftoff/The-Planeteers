import './Home.css'
import React, {useEffect, useState} from "react";
import axios from "axios"

export default function War({user}) {
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
        } else if (playerValue < computerValue) {
            setWinner('Computer Wins!');
            setPlayerDeckCount(prevCount => prevCount - 1);
            setComputerDeckCount(prevCount => prevCount + 1);
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

    const showHowToPlay = () => {
        const howToPlay = document.getElementById('howToPlay');
        if (howToPlay.classList.contains('hidden')) {
            howToPlay.classList.remove('hidden');
        } else {
            howToPlay.classList.add('hidden');
        }
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
                    <a onClick={showHowToPlay} className="box howtoplay">How To Play</a>
                    <div id="howToPlay" class="hidden">
                    <p>The goal of the game is to get all of your opponents cards. The player and the computer will both draw a card simultaneuously and then both cards are compared. Whoever has the higher value card wins the round and takes the cards. Cards are valued with Aces as the highest followed by Kings, Queens, Jacks, and then numbers going down.</p>
                    </div>
                </div>
                <a href="/comments" className="box comments">Comments</a>
            </div>
        </div>
    );
}
