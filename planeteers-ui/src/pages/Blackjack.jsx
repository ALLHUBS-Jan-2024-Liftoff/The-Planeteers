import './Home.css'
import { useState, useEffect } from "react";
import axios from "axios"

        //TODO
        //Adjust Alerts so that the game updates to show what card leads to the player busting
        //Still Needs if statements for dealer hitting and standing on soft 17
        //Special message for initial draw if player draws blackjack or if dealer draws blackjack
        //Connect to backend
        


export default function Blackjack() {

    //Initialize the Use States
    const [deckId, setDeckId] = useState('');
    const [playerCards, setPlayerCards] = useState([]);
    const [playerCardCount, setPlayerCardCount] = useState('');
    const [dealerCardCount, setDealerCardCount] = useState('')
    const [playerBust, setPlayerBust] = useState(false);
    const [dealerBust, setDealerBust] = useState(false);
    const addPlayerCard = newPlayerCard => {
        setPlayerCards(prevPlayerCard => [...prevPlayerCard, newPlayerCard]);
      };
    
    const [dealerCards, setDealerCards] = useState([]);
    const addDealerCard = newDealerCard => {
        setDealerCards(prevDealerCard => [...prevDealerCard, newDealerCard]);
    };
    
    //Initializes the Card Deck
    useEffect(() => {
        axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => {
                setDeckId(response.data.deck_id);
            });
    }, []);

    //Updates Card Count and checks for bust whenever a card is drawn
    useEffect(() => {
        setPlayerCardCount(calculateCardCount(playerCards))
        setDealerCardCount(calculateCardCount(dealerCards));
    }, [playerCards]);
    
    useEffect(() => {
        calculateBust(playerCardCount)
    }, [playerCardCount]);

    useEffect(() => {
        if (playerBust) {
            alert("Player Busted. Dealer Wins!");
            resetGame();  // Reset the game
        }
    }, [playerBust]);
    

    const gameStart = () => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
            .then(response => {
                const cards = response.data.cards;
                setPlayerCards([cards[0], cards[2]]);
                setDealerCards([cards[1], cards[3]]);
            });
    };

    const toggleHiddenGame = () => {
            var game = document.getElementById('game');
            var startButton = document.getElementById('gameStartButton');
            if (game.classList.contains('hidden')) {
                game.classList.remove('hidden');
            } else {
                game.classList.add('hidden');
            }
            if (startButton.classList.contains('hidden')) {
                startButton.classList.remove('hidden');
            } else {
                startButton.classList.add('hidden');
            }
        }
        
    
    const drawPlayerCards = () => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => {
                const cards = response.data.cards;
                addPlayerCard(cards[0]);
            });
            
    };

    const drawDealerCards = () => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => {
                const cards = response.data.cards;
                addDealerCard(cards[0])           
            });
    };

    const calculateCardCount = (cards) => {
        let lowCount = 0;
        let highCount = 0;
        let hasAce = false;
        let i = 0
        for(const card of cards) {
            if(card.value === 'JACK' || card.value === 'KING' || card.value === 'QUEEN') {
                lowCount+=10;
                highCount+=10
            } else if(card.value === 'ACE') {
                 lowCount += 1;
                 if(hasAce == false){
                    highCount += 11
                    hasAce = true;
                 } else {
                    highCount += 1;
                 }                      
            } else {
                lowCount += Number(card.value);
                highCount += Number(card.value);
            }
        }
        if(highCount>21){
            return lowCount;
        } else {
            return highCount;
        }
   
    }

    const calculateBust = (cardCount) => {
        if (cardCount > 21) {
            setPlayerBust(true);
        }
    }

    const resetGame = () => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(response => {
        setPlayerBust(false);
        setDealerBust(false);
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerCardCount(0)
        setDealerCardCount(0)
        gameStart();
        });
    }

    const stand = () => {
        //Still Needs if statements for dealer hitting and standing on soft 17
        if(playerCardCount - 21 > dealerCardCount - 21) {
            alert("Player Wins!")
        } else if (playerCardCount - 21 < dealerCardCount - 21){
            alert("Dealer Wins!")
        } else {
            alert("Player and Dealer Tie: Push")
        }
        resetGame();
    }

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
        <div class="container" >
            <h1>Blackjack</h1>
            <button id="gameStartButton" onClick={function(event){ gameStart(); toggleHiddenGame()}}>Start Game</button>
            <div id='game' class="hidden">
            <button onClick={drawPlayerCards}>Hit</button>
            <button onClick={stand}>Stand</button>
            <div className="card-container">
            <div>
            <div>Player</div>
            <div class="numberFont">{`${playerCardCount}`}</div>
            {playerCards.map(playerCard => (
            <div key={playerCard.code} className="card">
                <img src={playerCard.image} alt={`${playerCard.value} of ${playerCard.suit}`} />
            </div> 
            ))}
            </div>
            <div>
            <div>Dealer</div>
            <div class="numberFont">{`${dealerCardCount}`}</div>
            {dealerCards.map(dealerCard => (
            <div key={dealerCard.code} className="card">
                <img src={dealerCard.image} alt={`${dealerCard.value} of ${dealerCard.suit}`} />
            </div>
            ))}
            </div>
            </div>
            </div>
        </div>
        <div class='row'>
        <div class="howtoplay">How To Play</div>
        <div class="rating">Rating</div>
        </div>
        <div class="comments">Comments</div>
    </div>
    )
}