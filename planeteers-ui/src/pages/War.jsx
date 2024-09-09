import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./../UserContext"; // Import the UserContext

const GameOfWar = () => {
  const { user ,playerPoints, gamePoints, updatePlayerPoints, updateGamePoints } = useContext(UserContext); // Get points and update functions from context
  const [deckId, setDeckId] = useState('');
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [winner, setWinner] = useState('');
  const [playerDeckCount, setPlayerDeckCount] = useState(() => {
    return parseInt(localStorage.getItem("playerDeckCount")) || 26;
  });
  const [computerDeckCount, setComputerDeckCount] = useState(() => {
    return parseInt(localStorage.getItem("computerDeckCount")) || 26;
  });
  const [gameOver, setGameOver] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (user) {
      axios.get(`/points/playerPoints/${user.id}`)
        .then(response => {
          setPlayerPoints(response.data.playerPoint);
          updatePlayerPoints(response.data.playerPoint);
        })
        .catch(error => console.error('Error fetching player points:', error));

      axios.get(`/points/gamePoints/${user.id}`)
        .then(response => {
          setGamePoints(response.data.gamePoint);
          updateGamePoints(response.data.gamePoint);
        })
        .catch(error => console.error('Error fetching game points:', error));
    }
  }, [user, updatePlayerPoints, updateGamePoints]);

  // Step 1: Shuffle a new deck on component mount
  useEffect(() => {
    axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => {
        setDeckId(response.data.deck_id);
      });
  }, []);

  // Step 2: Draw two cards, one for the player and one for the computer
  const drawCards = () => {
    if (playerPoints < 0){
    return ("Not enough Player Points to play")} 
    else 
    updatePlayerPoints(-2); // Update points using context function
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
      setPlayerDeckCount(prevCount => {
        const newCount = prevCount + 1;
        localStorage.setItem("playerDeckCount", newCount);
        return newCount;
      });
      setComputerDeckCount(prevCount => {
        const newCount = prevCount - 1;
        localStorage.setItem("computerDeckCount", newCount);
        return newCount;
      });
      updatePlayerPoints(5); // Update points using context function
      updateGamePoints(5); // Update points using context function
      


    } else if (playerValue < computerValue) {
      setWinner('Computer Wins!');
      setPlayerDeckCount(prevCount => {
        const newCount = prevCount - 1;
        localStorage.setItem("playerDeckCount", newCount);
        return newCount;
      });
      setComputerDeckCount(prevCount => {
        const newCount = prevCount + 1;
        localStorage.setItem("computerDeckCount", newCount);
        return newCount;
      });
    } else {
      setWinner('It\'s a tie!');
    }

    checkGameOver();
    axios.post('/points/playerPoints/saveOrUpdate', {
      userId: user.id,
      playerPoint: newPlayerPoints
  }).catch(error => console.error('Error updating player points:', error));

  axios.post('/points/gamePoints/saveOrUpdate', {
      userId: user.id,
      gamePoint: newGamePoints
  }).catch(error => console.error('Error updating game points:', error));
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
        <li>Welcome, {user ? user.email : 'Guest'}!</li> {/* Display user email or a placeholder */}
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

              {playerCard && (
                  <div>
                      <h2>{currentUser?.name}'s Card</h2>
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
        )}
      </div>
      <h3>{winner}</h3>
      <h4>Player Deck Count: {playerDeckCount}</h4>
      <h4>Computer Deck Count: {computerDeckCount}</h4>
      <h4>Player Points: {playerPoints}</h4>
      <h4>Game Points: {gamePoints}</h4>
      {/* console.log({gamePoints}, {playerPoints}) */}
    </div>
  );
};

export default GameOfWar;
