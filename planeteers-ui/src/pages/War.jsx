import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./../UserContext";

const GameOfWar = () => {
  const { user, playerPoints, gamePoints, updatePlayerPoints, updateGamePoints } = useContext(UserContext);
  const [deckId, setDeckId] = useState('');
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [winner, setWinner] = useState('');
  const [playerDeckCount, setPlayerDeckCount] = useState(() => parseInt(localStorage.getItem("playerDeckCount")) || 26);
  const [computerDeckCount, setComputerDeckCount] = useState(() => parseInt(localStorage.getItem("computerDeckCount")) || 26);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    // Step 1: Shuffle a new deck on component mount
    axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => setDeckId(response.data.deck_id))
      .catch(error => console.error("Error fetching deck:", error));
  }, []);

  const drawCards = () => {
    if (playerPoints < 0) return "Not enough Player Points to play"; // Prevent play if not enough points
    if (gameOver) return; // Prevent drawing if the game is over

    updatePlayerPoints(-2); // Deduct points for each play
    
    // Draw cards for both player and computer
    axios.get(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(response => {
        const cards = response.data.cards;
        setPlayerCard(cards[0]);
        setComputerCard(cards[1]);
        determineWinner(cards[0], cards[1]);
      })
      .catch(error => console.error("Error drawing cards:", error));
  };

  const determineWinner = (playerCard, computerCard) => {
    const cardValues = { 'ACE': 14, 'KING': 13, 'QUEEN': 12, 'JACK': 11, '10': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2 };
    const playerValue = cardValues[playerCard.value];
    const computerValue = cardValues[computerCard.value];

    if (playerValue > computerValue) {
      setWinner('Player Wins!');
      updateDeckCounts(1, -1); // Player wins, adjust deck counts
      updatePlayerPoints(5); // Reward player
      updateGamePoints(5); // Update game points

    } else if (playerValue < computerValue) {
      setWinner('Computer Wins!');
      updateDeckCounts(-1, 1); // Computer wins, adjust deck counts

    } else {
      setWinner('It\'s a tie!');
    }

    checkGameOver(); // Check if the game is over after each draw
  };

  const updateDeckCounts = (playerChange, computerChange) => {
    setPlayerDeckCount(prevCount => {
      const newCount = prevCount + playerChange;
      localStorage.setItem("playerDeckCount", newCount);
      return newCount;
    });
    setComputerDeckCount(prevCount => {
      const newCount = prevCount + computerChange;
      localStorage.setItem("computerDeckCount", newCount);
      return newCount;
    });
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

  return (
    <div>
      <h1>War Card Game</h1>
      <ul>
        <li>Welcome, {user ? user.email : 'Guest'}!</li>
        <li>Game Points: {gamePoints}</li>
        <li>Player Points: {playerPoints}</li>
      </ul>
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
};

export default GameOfWar;
