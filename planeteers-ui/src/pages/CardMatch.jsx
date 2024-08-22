import './CardMatch.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import GamePage from './GamePage';

const Game = () => {
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