import React from 'react';
import './Card.css'; 

interface CardProps {
  name: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ name, imageUrl }) => {
  return (
    <div className="card"> 
      <img src={imageUrl} alt={name} className="card-image" />
      <h3 className="card-title">{name}</h3>
    </div>
  );
};

export default Card;