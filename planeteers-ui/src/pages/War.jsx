import './Home.css'
import React, {useEffect, useState} from "react";
import axios from "axios"




const GameOfWar=()=>{
  const [deckId, setDeckId] = useState('');
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [winner, setWinner] = useState('');
  const [playerDeckCount, setPlayerDeckCount] = useState(26); // Initial count for a single deck
  const [computerDeckCount, setComputerDeckCount] = useState(26); // Initial count for a single deck
  const [gameOver, setGameOver] = useState(false);

  // Step 1: Shuffle a new deck on component mount
  useEffect(() => {
      axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
          .then(response => {
              setDeckId(response.data.deck_id);
          });
  }, []);

  // Step 2: Draw two cards, one for the player and one for the computer
  const drawCards = () => {
      if (gameOver) return; // Prevent drawing if the game is over

      axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
          .then(response => {
              const cards = response.data.cards;
              setPlayerCard(cards[0]);
              setComputerCard(cards[1]);
              determineWinner(cards[0], cards[1]);
          });
  };

  // Step 3: Determine the winner
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

  // Step 4: Check if the game is over
  const checkGameOver = () => {
      if (playerDeckCount <= 0) {
          setWinner('Game Over! Computer Wins the game!');
          setGameOver(true);
      } else if (computerDeckCount <= 0) {
          setWinner('Game Over! Player Wins the game!');
          setGameOver(true);
      }
  };

  return (
      <div>
          <h1>War Card Game</h1>
          <button onClick={drawCards} disabled={gameOver}>Draw Cards</button>
          <div>
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
          <h3>{winner}</h3>
          <h4>Player Deck Count: {playerDeckCount}</h4>
          <h4>Computer Deck Count: {computerDeckCount}</h4>
      </div>
  );

}


export default GameOfWar