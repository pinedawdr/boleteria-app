// src/components/common/EventCard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiHeart } from 'react-icons/fi';
import Button from './Button';

const Card = styled(motion.div)`
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all ${props => props.theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const CardImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${Card}:hover & img {
    transform: scale(1.1);
  }
`;

const CardCategory = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: ${props => props.theme.gradients.primary};
  color: white;
  padding: 6px 14px;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 0.8rem;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  box-shadow: ${props => props.theme.shadows.small};
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.small};
  transition: all ${props => props.theme.transitions.default};
  
  svg {
    color: ${props => props.isFavorite ? props.theme.colors.primary : '#6c757d'};
    transition: all ${props => props.theme.transitions.default};
  }
  
  &:hover {
    background-color: ${props => props.isFavorite ? '#fff0f3' : 'white'};
    transform: scale(1.1);
    
    svg {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 12px;
  transition: color ${props => props.theme.transitions.default};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${props => props.theme.colors.text};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  
  svg {
    min-width: 16px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const Price = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  font-size: 1.3rem;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const EventCard = ({ 
  id, 
  title, 
  image, 
  category, 
  date, 
  time, 
  location,
  price, 
  isFeatured = false,
  isFavorite = false,
  onFavoriteToggle
}) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardImage>
        <img src={image} alt={title} />
        <CardCategory>{category}</CardCategory>
        <FavoriteButton 
          onClick={() => onFavoriteToggle(id)}
          isFavorite={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart fill={isFavorite ? "#ff3366" : "none"} />
        </FavoriteButton>
      </CardImage>
      
      <CardContent>
        <CardTitle to={`/evento/${id}`}>{title}</CardTitle>
        
        <CardMeta>
          <MetaItem>
            <FiCalendar size={16} />
            <span>{date}</span>
          </MetaItem>
          <MetaItem>
            <FiClock size={16} />
            <span>{time}</span>
          </MetaItem>
          <MetaItem>
            <FiMapPin size={16} />
            <span>{location}</span>
          </MetaItem>
        </CardMeta>
        
        <CardFooter>
          <Price>S/ {price}</Price>
          <Button size="small">Ver boletos</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default EventCard;