import './Home.css'
import { useState, useEffect } from "react";
import axios from "axios"


        


export default function Blackjack() {

    //Initialize the Use States
    const [deckId, setDeckId] = useState('');
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerCardCount, setPlayerCardCount] = useState('');
    const [dealerCardCount, setDealerCardCount] = useState('')
    const [dealerShownCount, setDealerShownCount] = useState('')
    const [playerBust, setPlayerBust] = useState(false);
    const [dealerBust, setDealerBust] = useState(false);
    const [playerStand, setPlayerStand] = useState(false);
    const [isDealerTurn, setIsDealerTurn] = useState(false);
    const [shouldDrawDealerCard, setShouldDrawDealerCard] = useState(false);
    const [winMessage, setWinMessage] = useState('');
    const [showFirstCard, setShowFirstCard] = useState(false);
    const [isFirstDraw, setIsFirstDraw] = useState(true);

    const addPlayerCard = newPlayerCard => {
        setPlayerCards(prevPlayerCard => [...prevPlayerCard, newPlayerCard]);
      };
    
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
        setDealerShownCount(calculateShownCount(dealerCards));
    }, [playerCards]);
    
    useEffect(() => {
        setPlayerBust(calculateBust(playerCardCount))
        if(isFirstDraw) {
            if(playerCardCount == 21) {
                if(dealerCardCount == 21) {
                    setWinMessage("Push. It's a Tie!");
                } else {
                    setWinMessage("BLACKJACK!!!");
                }
                var restart = document.getElementById('restart');
                restart.classList.remove('hidden');
                setShowFirstCard(true);
                document.getElementById('dealerCount').innerText = `${dealerCardCount}`;
            }
        }
    }, [playerCardCount]);

    useEffect(() => {
        setDealerBust(calculateBust(dealerCardCount))
    }, [dealerCardCount]);

    useEffect(() => {
        if (playerBust) {
            setWinMessage("Player Busted. Dealer Wins!");
            var restart = document.getElementById('restart');
            restart.classList.remove('hidden');
            setShowFirstCard(true);
            document.getElementById('dealerCount').innerText = `${dealerCardCount}`;
        }
    }, [playerBust]);

    useEffect(() => {
        if (dealerBust) {
            setWinMessage("Dealer Busted. Player Wins!");
            var restart = document.getElementById('restart');
            restart.classList.remove('hidden');
            setShowFirstCard(true);
            document.getElementById('dealerCount').innerText = `${dealerCardCount}`;
        }
    }, [dealerBust]);
    

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
                if(playerBust != true){
                const cards = response.data.cards;
                addPlayerCard(cards[0]);
                setIsFirstDraw(false)
                }
            });
            
    };

    const drawDealerCards = () => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => {
                if(playerBust != true){
                const cards = response.data.cards;
                addDealerCard(cards[0]);
                const newDealerCardCount = calculateCardCount([...dealerCards, cards[0]]);
                setDealerCardCount(newDealerCardCount);
                calculateBust(newDealerCardCount, false);
                }
            });
    };

    const calculateCardCount = (cards) => {
        let lowCount = 0;
        let highCount = 0;
        let hasAce = false;
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

    const calculateShownCount = (cards) => {
        let count = 0;
        if (cards.length > 1) {
        if(cards[1].value === 'JACK'  || cards[1].value === 'KING' || cards[1].value === 'QUEEN') {
            count = 10;
        } else if(cards[1].value === 'ACE') {
            count = 11;
        } else {
            count = Number(cards[1].value);
        }}
        return count;
        
    }

    const calculateBust = (cardCount) => {
        if (cardCount > 21) {
            return true;
        }
    }

    const resetGame = () => {
        axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(response => {
        setPlayerBust(false);
        setDealerBust(false);
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerStand(false)
        setPlayerCardCount(0);
        setDealerCardCount(0);
        setWinMessage('')
        setShowFirstCard(false);
        setIsFirstDraw(true);
        var restart = document.getElementById('restart');
        restart.classList.add('hidden');
        gameStart();
        });
    }

    const stand = () => {
        setIsDealerTurn(true);
        setShouldDrawDealerCard(true);
        
    };

    const determineWinner = () => {
        let message = '';
        if(isFirstDraw) {
            if(playerCardCount == 21) {
                if(dealerCardCount == 21) {
                    message = "Push. It's a Tie!";
                } else {
                    message = "BLACKJACK!!!"
                }
            }
        }
        if (playerCardCount > 21) {
            message = "Player Busted. Dealer Wins!";
        } else if (dealerCardCount > 21) {
            message = "Dealer Busted. Player Wins!";
        } else if (playerCardCount > dealerCardCount) {
            message = "Player Wins!";
        } else if (playerCardCount < dealerCardCount) {
            message = "Dealer Wins!";
        } else {
            message = "Push. It's a Tie!";
        }
        setWinMessage(message);
        var restart = document.getElementById('restart');
        restart.classList.remove('hidden');
        setShowFirstCard(true);
        document.getElementById('dealerCount').innerText = `${dealerCardCount}`;
    }

    useEffect(() => {
        if (isDealerTurn && shouldDrawDealerCard) {
            if (dealerCardCount < 17) {
                drawDealerCards();
            } else {
                setShouldDrawDealerCard(false); // Stop drawing cards
                // Handle dealer bust or game result here
                if (dealerCardCount > 21) {
                    setWinMessage("Dealer Busted. Player Wins!");
                }
                determineWinner()
            }
        }
    }, [isDealerTurn, shouldDrawDealerCard, dealerCardCount, dealerCards]);
    

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
            <h1 style={{fontSize: 55}}>Blackjack</h1>
            <button id="gameStartButton" onClick={function(event){ gameStart(); toggleHiddenGame()}}>Start Game</button>
            <div id='game' class="hidden">
                <button onClick={drawPlayerCards}>Hit</button>
                <button onClick={stand}>Stand</button>
                <button id='restart' class="hidden" onClick={resetGame}>Restart</button>
                {winMessage && <div className="win-message" style={{ fontSize: '30px' }}>{winMessage}</div>}
                <div className="card-container">
                    <div>
                        <div style={{fontSize: 25}}>Player</div>
                        <div style={{fontSize: 37}}>{`${playerCardCount}`}</div>
                        {playerCards.map(playerCard => (
                        <div key={playerCard.code} className="card">
                            <img src={playerCard.image} alt={`${playerCard.value} of ${playerCard.suit}`} />
                        </div> 
                        ))}
                    </div>
                    <div>
                        <div style={{fontSize: 25}}>Dealer</div>
                        <div id="dealerCount" style={{fontSize: 37}}>{`${dealerShownCount}`}</div>
                        {dealerCards.map((dealerCard, index) => (
                        <div key={dealerCard.code} className="card">
                        <img
                            src={index === 0 && !showFirstCard ? 'https://www.deckofcardsapi.com/static/img/back.png' : dealerCard.image}
                            alt={`${dealerCard.value} of ${dealerCard.suit}`}
                        />             
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