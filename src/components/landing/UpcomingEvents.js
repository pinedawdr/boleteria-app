// src/components/landing/UpcomingEvents.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';
import Button from '../common/Button';

// Datos de ejemplo para los próximos eventos
const UPCOMING_EVENTS = [
  {
    id: 101,
    title: "Bruno Mars - World Tour 2025",
    image: "/images/upcoming1.jpg",
    date: "15 Ago 2025",
    time: "20:00",
    location: "Estadio Nacional, Lima",
    description: "No te pierdas la presentación del aclamado artista internacional Bruno Mars en su gira mundial. ¡Será una noche inolvidable!",
  },
  {
    id: 102,
    title: "Semifinales Torneo Nacional de Tenis",
    image: "/images/upcoming2.jpg",
    date: "25 Jul 2025",
    time: "13:00",
    location: "Club Tenis Las Terrazas",
    description: "Las semifinales del torneo más importante de tenis a nivel nacional. Los mejores tenistas del país se enfrentan por un lugar en la final.",
  },
  {
    id: 103,
    title: "Festival Internacional de Cine",
    image: "/images/upcoming3.jpg",
    date: "10 Sep 2025",
    time: "10:00",
    location: "Centro Cultural de la Nación",
    description: "El festival de cine más prestigioso del país regresa con las mejores producciones nacionales e internacionales. Premieres exclusivas y charlas con directores.",
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

const EventCard = styled(motion.div)`
  display: flex;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const EventImage = styled.div`
  width: 35%;
  min-height: 250px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    height: 200px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0));
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0));
    }
  }
`;

const EventDate = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 70px;
  height: 70px;
  background: ${props => props.theme.gradients.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 1;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const Day = styled.div`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  line-height: 1;
`;

const Month = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const EventContent = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const EventMeta = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const EventDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
`;

const MoreEventsButton = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const UpcomingEvents = () => {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Próximos Eventos</SectionTitle>
          <SectionSubtitle>
            Agenda estos eventos destacados que están por venir y no te pierdas ninguna oportunidad
          </SectionSubtitle>
        </SectionHeader>
        
        {UPCOMING_EVENTS.map((event, index) => {
          // Extraer día y mes de la fecha
          const dateParts = event.date.split(' ');
          const day = dateParts[0];
          const month = dateParts[1].substring(0, 3);
          
          return (
            <EventCard
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EventImage image={event.image}>
                <EventDate>
                  <Day>{day}</Day>
                  <Month>{month}</Month>
                </EventDate>
              </EventImage>
              
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                
                <EventMeta>
                  <MetaItem>
                    <FiClock size={16} />
                    <span>{event.time}</span>
                  </MetaItem>
                  <MetaItem>
                    <FiMapPin size={16} />
                    <span>{event.location}</span>
                  </MetaItem>
                </EventMeta>
                
                <EventDescription>{event.description}</EventDescription>
                
                <Button>Ver detalles</Button>
              </EventContent>
            </EventCard>
          );
        })}
        
        <MoreEventsButton>
          <Button 
            size="large" 
            icon={<FiArrowRight />}
            iconPosition="right"
          >
            Ver calendario completo
          </Button>
        </MoreEventsButton>
      </Container>
    </Section>
  );
};

export default UpcomingEvents;