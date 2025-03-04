// src/components/landing/FeaturedEvents.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import EventCard from '../common/EventCard';
import Button from '../common/Button';

// Datos de ejemplo para los eventos destacados
const FEATURED_EVENTS = [
  {
    id: 1,
    title: "Festival de música electrónica 2025",
    image: "/images/event1.jpg",
    category: "Concierto",
    date: "15 Jul 2025",
    time: "18:00",
    location: "Arena Lima Norte",
    price: "125.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Partido final de la Copa Nacional",
    image: "/images/event2.jpg",
    category: "Deporte",
    date: "20 Jun 2025",
    time: "15:30",
    location: "Estadio Nacional",
    price: "85.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 3,
    title: "Romeo y Julieta - Obra clásica",
    image: "/images/event3.jpg",
    category: "Teatro",
    date: "10 Ago 2025",
    time: "19:00",
    location: "Teatro Municipal",
    price: "75.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Exposición de arte contemporáneo",
    image: "/images/event4.jpg",
    category: "Exposición",
    date: "05 Sep 2025",
    time: "10:00",
    location: "Galería de Arte Moderna",
    price: "35.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Festival gastronómico internacional",
    image: "/images/event5.jpg",
    category: "Festival",
    date: "25 Jul 2025",
    time: "12:00",
    location: "Parque de la Exposición",
    price: "50.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 6,
    title: "Stand-up comedy con grandes comediantes",
    image: "/images/event6.jpg",
    category: "Comedia",
    date: "18 Jun 2025",
    time: "20:00",
    location: "Centro de Convenciones",
    price: "60.00",
    isFeatured: true,
    isFavorite: false,
  },
];

const Section = styled.section`
  padding: 100px 0;
  background-color: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${props => props.theme.gradients.primary};
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const MoreEventsButton = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  padding: 8px 20px;
  border-radius: ${props => props.theme.borderRadius.round};
  font-size: 0.9rem;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.transitions.default};
  border: none;
  background-color: ${props => props.active ? 'transparent' : props.theme.colors.backgroundAlt};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  cursor: pointer;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.gradients.primary};
    z-index: -1;
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity ${props => props.theme.transitions.default};
  }
  
  &:hover {
    color: ${props => props.active ? 'white' : props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const FeaturedEvents = () => {
  const [favorites, setFavorites] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleFavoriteToggle = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Filtrar eventos según la categoría seleccionada
  const filteredEvents = activeFilter === 'all'
    ? FEATURED_EVENTS
    : FEATURED_EVENTS.filter(event => event.category.toLowerCase() === activeFilter.toLowerCase());
  
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Eventos Destacados</SectionTitle>
          <SectionSubtitle>
            Descubre los eventos más populares y no te pierdas ninguna oportunidad de entretenimiento.
          </SectionSubtitle>
        </SectionHeader>
        
        <FilterTabs>
          <FilterTab 
            active={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'concierto'} 
            onClick={() => setActiveFilter('concierto')}
          >
            Conciertos
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'deporte'} 
            onClick={() => setActiveFilter('deporte')}
          >
            Deportes
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'teatro'} 
            onClick={() => setActiveFilter('teatro')}
          >
            Teatro
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'exposición'} 
            onClick={() => setActiveFilter('exposición')}
          >
            Exposiciones
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'festival'} 
            onClick={() => setActiveFilter('festival')}
          >
            Festivales
          </FilterTab>
          <FilterTab 
            active={activeFilter === 'comedia'} 
            onClick={() => setActiveFilter('comedia')}
          >
            Comedia
          </FilterTab>
        </FilterTabs>
        
        <EventsGrid>
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              {...event}
              isFavorite={!!favorites[event.id]}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </EventsGrid>
        
        <MoreEventsButton>
          <Button 
            size="large" 
            icon={<FiArrowRight />}
            iconPosition="right"
          >
            Ver todos los eventos
          </Button>
        </MoreEventsButton>
      </Container>
    </Section>
  );
};

export default FeaturedEvents;