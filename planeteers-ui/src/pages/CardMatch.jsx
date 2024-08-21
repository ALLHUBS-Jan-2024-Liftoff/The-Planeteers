import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  
  useEffect(() => {
    const fetchCards = async () => {
      const response = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=6');
      setCards(response.data.cards.concat(response.data.cards));
    };
    
    fetchCards();
  }, []);
  
  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }
    
    if (flippedCards.length === 1 && cards[flippedCards[0]].code === cards[index].code) {
      setFlippedCards([]);
    } else if (flippedCards.length === 2) {
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };
  
  return (
    <div className="game">
      {cards.map((card, index) => (
        <Card key={index} onClick={() => handleCardClick(index)} style={{ width: '200px', height: '200px', margin: '10px', cursor: 'pointer',  }}>
          <Card.Img variant="top" src={card.image} />
        </Card>
      ))}
    </div>
  );
};

export default Game;