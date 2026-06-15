import React, { useState } from 'react';

const Card = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  // This function acts like a color coordinator for our categories
  const getCategoryColor = (category) => {
    switch (category) {
      case "2026 Facts": return "#fff9c4"; // Light Yellow
      case "Tournament History": return "#c8e6c9"; // Light Green
      case "Co-Hosts": return "#ffcdd2"; // Light Red
      default: return "#ffffff"; // Default White
    }
  };
  
return (
    <div className="card-container" onClick={handleCardClick}>
      <div 
        className={`card ${isFlipped ? 'flipped' : ''}`}
        style={{ backgroundColor: isFlipped ? '' : getCategoryColor(props.category) }}
      >
        
        {!isFlipped && <div className="category-label">{props.category}</div>}
        
        {/* NEW: If the card is NOT flipped AND it has an image, display it! */}
        {!isFlipped && props.image && (
          <img src={props.image} alt="World Cup visual" className="card-image" />
        )}
        
        <h2>
          {isFlipped ? props.answer : props.question}
        </h2>
        
      </div>
    </div>
  );
};

export default Card;