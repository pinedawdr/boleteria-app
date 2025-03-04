// src/pages/TravelPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMap, FiNavigation, FiCalendar, FiUsers, FiFilter } from 'react-icons/fi';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import TravelSearch from '../components/travel/TravelSearch';
import TravelCard from '../components/travel/TravelCard';

const PageContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('/images/travel-background.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  text-align: center;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255, 51, 102, 0.2), transparent 60%);
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SearchContainer = styled.div`
  margin-top: -80px;
  position: relative;
  z-index: 10;
`;

const ResultsContainer = styled.div`
  margin-top: 30px;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const ResultsTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

const ResultsMeta = styled.div`
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const NoResults = styled.div`
  padding: 40px;
  text-align: center;
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const NoResultsMessage = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
`;

const NoResultsInfo = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 20px;
`;

// Datos de ejemplo para los viajes
const SAMPLE_TRIPS = [
  {
    id: 1,
    company: "Cruz del Sur",
    price: "125.00",
    departureTime: "08:30",
    departureLocation: "Terminal Plaza Norte, Lima",
    arrivalTime: "14:45",
    arrivalLocation: "Terminal Terrestre, Cusco",
    duration: "6h 15m",
    date: "15 Jul 2025",
    type: "Ejecutivo VIP",
    travelType: "bus",
    directRoute: true,
    amenities: ["wifi", "usb", "food", "entertainment"]
  },
  {
    id: 2,
    company: "Oltursa",
    price: "110.00",
    departureTime: "09:15",
    departureLocation: "Terminal Javier Prado, Lima",
    arrivalTime: "16:00",
    arrivalLocation: "Terminal Terrestre, Cusco",
    duration: "6h 45m",
    date: "15 Jul 2025",
    type: "Cama Suite",
    travelType: "bus",
    directRoute: true,
    amenities: ["wifi", "usb", "entertainment"]
  },
  {
    id: 3,
    company: "Crucero Amazónico",
    price: "185.00",
    departureTime: "07:00",
    departureLocation: "Puerto Itaya, Iquitos",
    arrivalTime: "13:30",
    arrivalLocation: "Puerto Indiana, Río Amazonas",
    duration: "6h 30m",
    date: "15 Jul 2025",
    type: "Clase Turista",
    travelType: "boat",
    directRoute: true,
    amenities: ["food", "entertainment"]
  },
  {
    id: 4,
    company: "PeruRail",
    price: "245.00",
    departureTime: "06:40",
    departureLocation: "Estación Poroy, Cusco",
    arrivalTime: "10:30",
    arrivalLocation: "Estación Aguas Calientes, Machu Picchu",
    duration: "3h 50m",
    date: "15 Jul 2025",
    type: "Vistadome",
    travelType: "train",
    directRoute: true,
    amenities: ["wifi", "food", "entertainment"]
  },
  {
    id: 5,
    company: "Movil Tours",
    price: "95.00",
    departureTime: "22:30",
    departureLocation: "Terminal Plaza Norte, Lima",
    arrivalTime: "05:45",
    arrivalLocation: "Terminal Terrestre, Cusco",
    duration: "7h 15m",
    date: "15 Jul 2025",
    type: "Bus Cama",
    travelType: "bus",
    directRoute: false,
    amenities: ["usb"]
  }
];

const TravelPage = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Simular búsqueda (normalmente esto sería una llamada a API)
  const performSearch = () => {
    setLoading(true);
    
    // Simular retraso de red
    setTimeout(() => {
      setResults(SAMPLE_TRIPS);
      setLoading(false);
      setSearchPerformed(true);
    }, 1000);
  };
  
  const handleSearch = (params) => {
    setSearchParams(params);
    performSearch();
  };
  
  const handleTravelCardSelect = (tripId) => {
    console.log("Seleccionado el viaje:", tripId);
    // Aquí normalmente navegarías a la página de selección de asientos
    // navigate(`/pasajes/seleccion-asientos/${tripId}`);
  };
  
  return (
    <PageContainer>
      <Navbar />
      
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Encuentra los mejores <span>pasajes</span> para tu viaje
          </HeroTitle>
          <HeroSubtitle>
            Compara opciones de autobuses, embarcaciones y trenes en un solo lugar
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        <SearchContainer>
          <TravelSearch onSearch={handleSearch} />
        </SearchContainer>
        
        {searchPerformed && (
          <ResultsContainer>
            <ResultsHeader>
              <div>
                <ResultsTitle>Resultados de búsqueda</ResultsTitle>
                {searchParams && (
                  <ResultsMeta>
                    {results.length} opciones encontradas • Ordenado por: Precio más bajo
                  </ResultsMeta>
                )}
              </div>
              
              <FilterButton>
                <FiFilter size={16} />
                <span>Filtros</span>
              </FilterButton>
            </ResultsHeader>
            
            {loading ? (
              <div>Cargando resultados...</div>
            ) : results.length > 0 ? (
              results.map(trip => (
                <TravelCard 
                  key={trip.id}
                  {...trip}
                  onSelect={() => handleTravelCardSelect(trip.id)}
                />
              ))
            ) : (
              <NoResults>
                <NoResultsMessage>No se encontraron viajes</NoResultsMessage>
                <NoResultsInfo>
                  Intenta ajustar tus fechas o destinos para encontrar más opciones.
                </NoResultsInfo>
              </NoResults>
            )}
          </ResultsContainer>
        )}
      </ContentSection>
      
      <Footer />
    </PageContainer>
  );
};

export default TravelPage;