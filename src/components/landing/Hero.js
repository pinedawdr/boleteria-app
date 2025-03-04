// src/components/landing/Hero.js 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCalendar, FiSearch, FiMapPin, FiMusic, FiActivity, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

// Contenedor principal con efecto de parallax
const HeroContainer = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
`;

// Fondo con efecto de parallax - Actualizado con overlay más moderno
const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(22, 34, 42, 0.7), rgba(22, 34, 42, 0.85)), 
              url('/images/hero-background.jpg') no-repeat center center/cover;
  z-index: -2;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(233, 64, 87, 0.3), transparent 70%);
    z-index: -1;
  }
`;

// Elementos decorativos - Actualizado con nuevos colores
const HeroDecoration = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  z-index: -1;
  
  &.decoration-1 {
    background: ${props => props.theme.colors.primary};
    width: 300px;
    height: 300px;
    top: 10%;
    right: 15%;
  }
  
  &.decoration-2 {
    background: ${props => props.theme.colors.secondary};
    width: 200px;
    height: 200px;
    bottom: 15%;
    left: 10%;
  }
`;

const HeroContent = styled.div`
  max-width: 1000px;
  text-align: center;
  z-index: 1;
  padding: 0 20px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 24px;
  line-height: 1.1;
  background: linear-gradient(120deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 3.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.5rem;
  }
  
  span {
    position: relative;
    display: inline-block;
    background: linear-gradient(120deg, #e94057, #f27121);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 5px;
      height: 8px;
      background: ${props => props.theme.gradients.primary};
      z-index: -1;
      opacity: 0.3;
      border-radius: 4px;
    }
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.4rem;
  margin-bottom: 40px;
  opacity: 0.95;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

const SearchBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 8px;
  display: flex;
  max-width: 800px;
  margin: 0 auto 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 8px;
  }
`;

const SearchField = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  flex: 1;
  gap: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  svg {
    color: ${props => props.theme.colors.primary};
    min-width: 20px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 12px 15px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: 10px 0;
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
  padding: 10px 0;
  font-size: 1rem;
  outline: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  width: 100%;
  
  option {
    color: ${props => props.theme.colors.text};
  }
`;

const LocationField = styled(SearchField)`
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 240px;
  }
`;

const SearchButton = styled(Button)`
  min-width: 120px;
  margin: 6px;
  border-radius: ${props => props.theme.borderRadius.round};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: calc(100% - 12px);
    margin: 8px 6px;
  }
`;

// Actualizado con estilo más moderno para las etiquetas
const PopularSearches = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
`;

const PopularTag = styled.button`
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: ${props => props.theme.borderRadius.round};
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  backdrop-filter: blur(5px);
  
  &:hover {
    background-color: rgba(233, 64, 87, 0.25);
    transform: translateY(-2px);
    border-color: ${props => props.theme.colors.primary};
  }
`;

// Actualizado con estilo más moderno para los contadores
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
  background: rgba(22, 34, 42, 0.4);
  padding: 20px 30px;
  border-radius: ${props => props.theme.borderRadius.medium};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
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
  opacity: 0.9;
`;

const ScrollDownIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  cursor: pointer;
  
  svg {
    font-size: 2rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

// Palabras populares para búsqueda
const POPULAR_SEARCHES = ["Conciertos", "Festivales", "Teatro", "Deportes", "Familia", "Pasajes"];

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  
  // Función para manejar la búsqueda
  const handleSearch = () => {
    // Navegar a la página de resultados con los parámetros de búsqueda
    navigate(`/eventos?search=${searchTerm}&category=${category}&location=${location}`);
  };
  
  // Función para usar una búsqueda popular
  const handlePopularSearch = (term) => {
    if (term === "Pasajes") {
      navigate('/pasajes');
      return;
    }
    
    setSearchTerm(term);
    // También podríamos navegar directamente
    // navigate(`/eventos?search=${term}`);
  };
  
  // Función para desplazarse hacia abajo
  const scrollToEvents = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <HeroContainer>
      <HeroBackground />
      <HeroDecoration className="decoration-1" />
      <HeroDecoration className="decoration-2" />
      
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
          <SearchField>
            <FiSearch size={20} />
            <SearchInput 
              placeholder="¿Qué evento estás buscando?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchField>
          
          <SearchField>
            <FiMusic size={20} />
            <SearchSelect 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="conciertos">Conciertos</option>
              <option value="deportes">Deportes</option>
              <option value="teatro">Teatro</option>
              <option value="festivales">Festivales</option>
              <option value="familia">Familiar</option>
            </SearchSelect>
          </SearchField>
          
          <LocationField>
            <FiMapPin size={20} />
            <SearchInput 
              placeholder="¿Dónde?" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </LocationField>
          
          <SearchButton onClick={handleSearch}>
            Buscar
          </SearchButton>
        </SearchBox>
        
        <PopularSearches
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span>Popular:</span>
          {POPULAR_SEARCHES.map((term, index) => (
            <PopularTag 
              key={index}
              onClick={() => handlePopularSearch(term)}
            >
              {term}
            </PopularTag>
          ))}
        </PopularSearches>
        
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
            <CounterNumber>500+</CounterNumber>
            <CounterLabel>Rutas de viaje</CounterLabel>
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
      
      <ScrollDownIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToEvents}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ScrollDownIndicator>
    </HeroContainer>
  );
};

export default Hero;