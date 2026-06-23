import React from 'react';
import './App.css';

function Card({ card, isFlipped, onCardClick }) {
  
  const getCategoryColor = (category) => {
    if (category === "2026 Facts") return "#e8f4f8";
    if (category === "Tournament History") return "#fdf5e6";
    if (category === "Co-Hosts") return "#eef9f1";
    return "#ffffff";
  };

  return (
    <div className="card-container" onClick={onCardClick}>
      <div 
        className={`card ${isFlipped ? 'flipped' : ''}`}
        style={{ backgroundColor: isFlipped ? '' : getCategoryColor(card.category) }}
      >
        {!isFlipped && <div className="category-label">{card.category}</div>}
        
        {!isFlipped && card.image && (
          <img src={card.image} alt="World Cup visual" className="card-image" />
        )}
        
        <h2>
          {isFlipped ? card.answer : card.question}
        </h2>
      </div>
    </div>
  );
}

export default Card;