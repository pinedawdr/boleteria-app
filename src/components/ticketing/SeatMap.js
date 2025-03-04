// src/components/ticketing/SeatMap.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlusCircle, FiMinusCircle, FiInfo } from 'react-icons/fi';

const SeatMapContainer = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 30px;
  margin-bottom: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 20px;
  }
`;

const SeatMapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const SeatMapTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const ZoomControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ZoomButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &:disabled {
    color: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const ZoomLevel = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  min-width: 40px;
  text-align: center;
`;

const SeatMapContent = styled.div`
  overflow: auto;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  max-height: 500px;
  position: relative;
`;

const Stage = styled.div`
  background: ${props => props.theme.gradients.primary};
  height: 40px;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: 0.9rem;
  box-shadow: ${props => props.theme.shadows.small};
`;

const SeatGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
  margin: 0 auto;
  transform: scale(${props => props.zoom});
  transform-origin: center top;
  transition: transform 0.3s ease;
`;

const SeatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RowLabel = styled.div`
  width: 30px;
  text-align: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const Seats = styled.div`
  display: flex;
  gap: 5px;
`;

const SeatContainer = styled.div`
  width: 25px;
  height: 25px;
  cursor: ${props => props.isAvailable ? 'pointer' : 'default'};
  opacity: ${props => props.isAvailable ? 1 : props.isSelected ? 1 : 0.5};
`;

const Seat = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${props => 
    props.isSelected ? props.theme.colors.primary : 
    props.isAvailable ? '#e0e0e0' : '#a0a0a0'};
  transition: all ${props => props.theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: ${props => props.isSelected ? 'white' : '#555'};
  
  &:hover {
    background-color: ${props => 
      props.isSelected ? props.theme.colors.primary : 
      props.isAvailable ? props.theme.colors.primary : '#a0a0a0'};
    transform: ${props => props.isAvailable ? 'scale(1.1)' : 'none'};
    color: ${props => props.isAvailable ? 'white' : '#555'};
  }
`;

const SeatLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 2px;
  background-color: ${props => props.color};
`;

// Datos simulados para el mapa de asientos
const generateSeatData = () => {
  const rows = 10;
  const seatsPerRow = 20;
  const seatMap = [];
  
  for (let i = 0; i < rows; i++) {
    const rowLabel = String.fromCharCode(65 + i); // A, B, C, ...
    const seats = [];
    
    for (let j = 0; j < seatsPerRow; j++) {
      // Asignar aleatoriamente si un asiento está disponible o no
      const isAvailable = Math.random() > 0.3;
      
      seats.push({
        id: `${rowLabel}${j + 1}`,
        isAvailable,
        price: 100 + (rows - i) * 10, // Los asientos más cercanos al escenario son más caros
      });
    }
    
    seatMap.push({
      rowLabel,
      seats,
    });
  }
  
  return seatMap;
};

const SEAT_DATA = generateSeatData();

const SeatMap = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const handleZoomIn = () => {
    if (zoom < 1.5) {
      setZoom(prev => prev + 0.1);
    }
  };
  
  const handleZoomOut = () => {
    if (zoom > 0.6) {
      setZoom(prev => prev - 0.1);
    }
  };
  
  const toggleSeatSelection = (seatId, isAvailable, price) => {
    if (!isAvailable) return;
    
    setSelectedSeats(prev => {
      const seatIndex = prev.findIndex(seat => seat.id === seatId);
      
      if (seatIndex !== -1) {
        // Si el asiento ya está seleccionado, quitarlo
        return prev.filter(seat => seat.id !== seatId);
      } else {
        // Si no está seleccionado, añadirlo
        return [...prev, { id: seatId, price }];
      }
    });
  };
  
  const isSeatSelected = (seatId) => {
    return selectedSeats.some(seat => seat.id === seatId);
  };
  
  return (
    <SeatMapContainer>
      <SeatMapHeader>
        <SeatMapTitle>Selecciona tus asientos</SeatMapTitle>
        
        <ZoomControls>
          <ZoomButton 
            onClick={handleZoomOut}
            disabled={zoom <= 0.6}
            aria-label="Alejar"
          >
            <FiMinusCircle size={20} />
          </ZoomButton>
          
          <ZoomLevel>{Math.round(zoom * 100)}%</ZoomLevel>
          
          <ZoomButton 
            onClick={handleZoomIn}
            disabled={zoom >= 1.5}
            aria-label="Acercar"
          >
            <FiPlusCircle size={20} />
          </ZoomButton>
        </ZoomControls>
      </SeatMapHeader>
      
      <SeatMapContent>
        <Stage>ESCENARIO</Stage>
        
        <SeatGrid zoom={zoom}>
          {SEAT_DATA.map((row, rowIndex) => (
            <SeatRow key={rowIndex}>
              <RowLabel>{row.rowLabel}</RowLabel>
              
              <Seats>
                {row.seats.map((seat, seatIndex) => {
                  const isSelected = isSeatSelected(seat.id);
                  
                  return (
                    <SeatContainer 
                      key={seatIndex}
                      isAvailable={seat.isAvailable}
                      isSelected={isSelected}
                      onClick={() => toggleSeatSelection(seat.id, seat.isAvailable, seat.price)}
                    >
                      <Seat 
                        isAvailable={seat.isAvailable}
                        isSelected={isSelected}
                      >
                        {seatIndex + 1}
                      </Seat>
                    </SeatContainer>
                  );
                })}
              </Seats>
              
              <RowLabel>{row.rowLabel}</RowLabel>
            </SeatRow>
          ))}
        </SeatGrid>
      </SeatMapContent>
      
      <SeatLegend>
        <LegendItem>
          <LegendColor color="#e0e0e0" />
          <span>Disponible</span>
        </LegendItem>
        
        <LegendItem>
          <LegendColor color={`${props => props.theme.colors.primary}`} />
          <span>Seleccionado</span>
        </LegendItem>
        
        <LegendItem>
          <LegendColor color="#a0a0a0" />
          <span>No disponible</span>
        </LegendItem>
        
        <LegendItem>
          <FiInfo size={15} />
          <span>Puedes seleccionar hasta 6 boletos por compra</span>
        </LegendItem>
      </SeatLegend>
    </SeatMapContainer>
  );
};

export default SeatMap;