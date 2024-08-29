import './CardMatch.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import GamePage from './GamePage';
import UserContext from "./../UserContext"; // Import the UserContext


const Game = () => {
  const { user ,playerPoints, gamePoints, updatePlayerPoints, updateGamePoints } = useContext(UserContext); // Get points and update functions from context
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=6');
        const fetchedCards = response.data.cards.concat(response.data.cards); // Duplicate cards for the matching game
        setCards(shuffleArray(fetchedCards)); // Shuffle the cards before setting them in state
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedPairs.includes(index)) {
      const newFlippedCards = [...flippedCards, index];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = newFlippedCards;
        if (cards[firstIndex].code === cards[secondIndex].code) {
          setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
          updatePlayerPoints(2); // Update points using context function
          updateGamePoints(2); // Update points using context function
        }
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div id="GamePage" className="game">
    <h1>You have {matchedPairs.length/2} pairs!</h1>
    <ul>
            <li>Welcome, {user ? user.email : 'Guest'}!</li> {/* Display user email or a placeholder */}
            <li>Game Points: {gamePoints}</li>
             <li>Player Points: {playerPoints}</li>
             </ul>
      {cards.map((card, index) => (
        <Card
          key={index}
          onClick={() => handleCardClick(index)}
          style={{
    
            margin: '10px',
            cursor: 'pointer',
            opacity: matchedPairs.includes(index) ? 0.5 : 1,
            transform: flippedCards.includes(index) ? 'rotateY(0deg)' : 'rotateY(360deg)',
            transition: 'transform 0.5s',
          }}
        >
          <Card.Img
            variant="top"
            src={flippedCards.includes(index) || matchedPairs.includes(index) ? card.image : 'https://www.deckofcardsapi.com/static/img/back.png'}
          />
        </Card>
        
      ))}
    </div>
  );
};

export default Game;