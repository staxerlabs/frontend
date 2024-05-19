import '../styles/card.css'
import React from 'react';

interface CardProps {
  text: string; // Define text prop as string
}

const Card: React.FC<CardProps> = ({ text }) => {
  return (
    <div className="card card-black">
      {text}
    </div>
  );
};

export default Card;