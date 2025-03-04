// src/components/landing/Hero.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCalendar, FiSearch } from 'react-icons/fi';
import Button from '../common/Button';

const HeroContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('/images/hero-background.jpg') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  padding: 0 20px;
`;

const HeroContent = styled.div`
  max-width: 900px;
  text-align: center;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 24px;
  line-height: 1.2;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 3rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.5rem;
  }
  
  span {
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 5px;
      height: 15px;
      background: ${props => props.theme.gradients.primary};
      z-index: -1;
      opacity: 0.6;
    }
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const SearchBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 10px;
  display: flex;
  max-width: 700px;
  margin: 0 auto 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 10px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: 15px 20px;
  font-size: 1rem;
  outline: none;
  color: ${props => props.theme.colors.text};
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
  }
`;

const SearchSelect = styled.select`
  border: none;
  background: none;
  padding: 15px 20px;
  font-size: 1rem;
  outline: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  min-width: 180px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    border-top: 1px solid ${props => props.theme.colors.border};
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

const SearchButton = styled(Button)`
  min-width: 120px;
  border-radius: ${props => props.theme.borderRadius.round};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

const EventsCounter = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;

const CounterItem = styled(motion.div)`
  text-align: center;
`;

const CounterNumber = styled.div`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 8px;
  background: ${props => props.theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CounterLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Descubre <span>eventos increíbles</span> cerca de ti
        </HeroTitle>
        
        <HeroSubtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          La plataforma más completa para encontrar y comprar entradas a los mejores conciertos, teatro, deportes y más.
        </HeroSubtitle>
        
        <SearchBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SearchInput placeholder="¿Qué evento estás buscando?" />
          <SearchSelect>
            <option value="">Todas las categorías</option>
            <option value="conciertos">Conciertos</option>
            <option value="deportes">Deportes</option>
            <option value="teatro">Teatro</option>
            <option value="festivales">Festivales</option>
            <option value="familia">Familiar</option>
          </SearchSelect>
          <SearchButton icon={<FiSearch size={18} />}>
            Buscar
          </SearchButton>
        </SearchBox>
        
        <Button
          icon={<FiCalendar size={18} />}
          size="large"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Ver todos los eventos
        </Button>
        
        <EventsCounter>
          <CounterItem
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CounterNumber>1,500+</CounterNumber>
            <CounterLabel>Eventos disponibles</CounterLabel>
          </CounterItem>
          
          <CounterItem
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <CounterNumber>150K+</CounterNumber>
            <CounterLabel>Usuarios activos</CounterLabel>
          </CounterItem>
          
          <CounterItem
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <CounterNumber>98%</CounterNumber>
            <CounterLabel>Clientes satisfechos</CounterLabel>
          </CounterItem>
        </EventsCounter>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;