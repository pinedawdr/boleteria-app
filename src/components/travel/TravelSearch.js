// src/components/travel/TravelSearch.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiClock, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import Button from '../common/Button';

const SearchContainer = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 30px;
  margin-bottom: 30px;
`;

const SearchTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 25px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TabButton = styled.button`
  padding: 12px 25px;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => 
    props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => 
    props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  font-weight: ${props => 
    props.active ? props.theme.typography.fontWeight.semibold : props.theme.typography.fontWeight.medium};
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const SearchField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FieldLabel = styled.label`
  font-size: 0.9rem;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: 8px;
  color: ${props => props.theme.colors.textLight};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 0 15px;
  transition: all ${props => props.theme.transitions.default};
  
  &:focus-within {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
  }
  
  svg {
    color: ${props => props.theme.colors.primary};
    margin-right: 10px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  padding: 12px 0;
  font-size: 1rem;
  background: transparent;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    opacity: 0.7;
  }
`;

const StyledSelect = styled.select`
  flex: 1;
  border: none;
  padding: 12px 0;
  font-size: 1rem;
  background: transparent;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all ${props => props.theme.transitions.default};
  z-index: 2;
  
  &:hover {
    transform: translateX(-50%) scale(1.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const SearchActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  flex: 1;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const DESTINATIONS = [
  { value: "lima", label: "Lima" },
  { value: "cusco", label: "Cusco" },
  { value: "arequipa", label: "Arequipa" },
  { value: "trujillo", label: "Trujillo" },
  { value: "puno", label: "Puno" },
  { value: "iquitos", label: "Iquitos" },
  { value: "tumbes", label: "Tumbes" },
  { value: "piura", label: "Piura" },
  { value: "huancayo", label: "Huancayo" },
  { value: "chiclayo", label: "Chiclayo" }
];

const TravelSearch = () => {
  const [travelType, setTravelType] = useState('bus');
  const [tripType, setTripType] = useState('roundtrip');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log({
      travelType,
      tripType,
      origin,
      destination,
      departDate,
      returnDate,
      passengers
    });
    // Implementar navegación a la página de resultados
  };
  
  const switchLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };
  
  return (
    <SearchContainer>
      <SearchTitle>Buscar Pasajes</SearchTitle>
      
      <TabsContainer>
        <TabButton 
          active={travelType === 'bus'} 
          onClick={() => setTravelType('bus')}
        >
          Autobuses
        </TabButton>
        <TabButton 
          active={travelType === 'boat'} 
          onClick={() => setTravelType('boat')}
        >
          Embarcaciones
        </TabButton>
        <TabButton 
          active={travelType === 'train'} 
          onClick={() => setTravelType('train')}
        >
          Trenes
        </TabButton>
      </TabsContainer>
      
      <SearchForm onSubmit={handleSearch}>
        <SearchRow>
          <SearchField style={{ flex: 0.5 }}>
            <FieldLabel>Tipo de viaje</FieldLabel>
            <InputWrapper>
              <StyledSelect 
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
              >
                <option value="roundtrip">Ida y vuelta</option>
                <option value="oneway">Solo ida</option>
              </StyledSelect>
            </InputWrapper>
          </SearchField>
          
          <SearchField style={{ flex: 0.5 }}>
            <FieldLabel>Pasajeros</FieldLabel>
            <InputWrapper>
              <FiUsers size={18} />
              <StyledSelect 
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
              >
                <option value="1">1 pasajero</option>
                <option value="2">2 pasajeros</option>
                <option value="3">3 pasajeros</option>
                <option value="4">4 pasajeros</option>
                <option value="5">5 pasajeros</option>
                <option value="6">6+ pasajeros</option>
              </StyledSelect>
            </InputWrapper>
          </SearchField>
        </SearchRow>
        
        <SearchRow>
          <RelativeContainer>
            <SearchField>
              <FieldLabel>Origen</FieldLabel>
              <InputWrapper>
                <FiMapPin size={18} />
                <StyledInput 
                  type="text" 
                  placeholder="¿Desde dónde viajas?" 
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                />
              </InputWrapper>
            </SearchField>
            
            <ToggleButton 
              type="button"
              onClick={switchLocations}
              aria-label="Intercambiar origen y destino"
            >
              <FiRefreshCw size={18} />
            </ToggleButton>
            
            <SearchField>
              <FieldLabel>Destino</FieldLabel>
              <InputWrapper>
                <FiMapPin size={18} />
                <StyledInput 
                  type="text" 
                  placeholder="¿A dónde viajas?" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </InputWrapper>
            </SearchField>
          </RelativeContainer>
        </SearchRow>
        
        <SearchRow>
          <SearchField>
            <FieldLabel>Fecha de salida</FieldLabel>
            <InputWrapper>
              <FiCalendar size={18} />
              <StyledInput 
                type="date" 
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                required
              />
            </InputWrapper>
          </SearchField>
          
          {tripType === 'roundtrip' && (
            <SearchField>
              <FieldLabel>Fecha de regreso</FieldLabel>
              <InputWrapper>
                <FiCalendar size={18} />
                <StyledInput 
                  type="date" 
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required={tripType === 'roundtrip'}
                />
              </InputWrapper>
            </SearchField>
          )}
        </SearchRow>
        
        <SearchActions>
          <Button 
            type="submit" 
            size="large"
            icon={<FiArrowRight />}
            iconPosition="right"
          >
            Buscar pasajes
          </Button>
        </SearchActions>
      </SearchForm>
    </SearchContainer>
  );
};

export default TravelSearch;



