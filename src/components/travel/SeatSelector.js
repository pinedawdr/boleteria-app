// src/components/travel/SeatSelector.js
// Este componente permite seleccionar asientos en diferentes tipos de vehículos (autobús, barco, tren)
// src/components/travel/SeatSelector.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiInfo, FiCheck, FiX, FiUser, FiAlertCircle, FiMapPin, FiCalendar } from 'react-icons/fi';
import Button from '../common/Button';

const SelectorContainer = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 30px;
  margin-bottom: 30px;
`;

const SelectorTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const TravelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const CompanyInfo = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const SeatMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const VehicleLayout = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  max-width: 100%;
  overflow-x: auto;
`;

const VehicleLayoutTabs = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const VehicleTab = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.textLight};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.active ? 'white' : props.theme.colors.primary};
  }
`;

const BusShape = styled.div`
  position: relative;
  width: 300px;
  padding: 40px 20px 20px;
  margin: 0 auto;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: ${props => props.theme.gradients.primary};
    border-radius: 20px 20px 0 0;
  }
  
  &:after {
    content: 'FRENTE';
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 0.8rem;
    font-weight: ${props => props.theme.typography.fontWeight.medium};
  }
`;

const SeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Seat = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.isAvailable ? 'pointer' : 'default'};
  background-color: ${props => 
    props.isSelected ? props.theme.colors.primary : 
    props.isAvailable ? '#e0e0e0' : '#a0a0a0'};
  color: ${props => props.isSelected ? 'white' : '#555'};
  transition: all ${props => props.theme.transitions.default};
  font-size: 0.8rem;
  
  &:hover {
    transform: ${props => props.isAvailable ? 'scale(1.1)' : 'none'};
    background-color: ${props => 
      props.isSelected ? props.theme.colors.primary : 
      props.isAvailable ? props.theme.colors.primary : '#a0a0a0'};
    color: ${props => (props.isSelected || props.isAvailable) ? 'white' : '#555'};
  }
`;

const Aisle = styled.div`
  grid-column: 2 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight};
`;

const Legend = styled.div`
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

const SelectedSeats = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const SelectedTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const SeatsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const SeatTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 0.9rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
  }
`;

const Note = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 15px;
  
  svg {
    color: ${props => props.theme.colors.warning};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

// Generar datos de asientos para un autobús
const generateBusSeats = () => {
  const totalRows = 10;
  const seats = [];
  
  for (let row = 1; row <= totalRows; row++) {
    // Lado izquierdo
    seats.push({
      id: `L${row}`,
      row,
      position: 'left',
      isAvailable: Math.random() > 0.3
    });
    
    // Lado derecho
    seats.push({
      id: `R${row}`,
      row,
      position: 'right',
      isAvailable: Math.random() > 0.3
    });
    
    // Solo agregar asientos en el pasillo para las últimas 7 filas (autobús de 2 pisos)
    if (row > 3) {
      // Pasillo izquierdo
      seats.push({
        id: `IL${row}`,
        row,
        position: 'inner-left',
        isAvailable: Math.random() > 0.3
      });
      
      // Pasillo derecho
      seats.push({
        id: `IR${row}`,
        row,
        position: 'inner-right',
        isAvailable: Math.random() > 0.3
      });
    }
  }
  
  return seats;
};

const SeatSelector = ({ 
  company = "Cruz del Sur", 
  route = "Lima - Cusco", 
  date = "15 Jul 2025", 
  time = "08:30", 
  busType = "Ejecutivo VIP",
  travelType = "bus", // bus, boat, train
  onContinue
}) => {
  const [seats, setSeats] = useState(generateBusSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrice, setSeatPrice] = useState(75);
  
  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    
    if (!seat || !seat.isAvailable) return;
    
    if (selectedSeats.includes(seatId)) {
      // Deseleccionar asiento
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      // Seleccionar asiento (máximo 6)
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        alert("Puedes seleccionar un máximo de 6 asientos por compra");
      }
    }
  };
  
  // Función para renderizar un asiento
  const renderSeat = (seatId, row) => {
    const seat = seats.find(s => s.id === seatId) || { 
      id: seatId, 
      row, 
      isAvailable: false 
    };
    
    const isSelected = selectedSeats.includes(seatId);
    
    return (
      <Seat 
        key={seatId}
        isAvailable={seat.isAvailable}
        isSelected={isSelected}
        onClick={() => handleSeatClick(seatId)}
      >
        {row}
      </Seat>
    );
  };
  
  // Función para quitar un asiento seleccionado
  const removeSeat = (seatId) => {
    setSelectedSeats(selectedSeats.filter(id => id !== seatId));
  };
  
  return (
    <SelectorContainer>
      <SelectorTitle>Selecciona tus asientos</SelectorTitle>
      
      <TravelInfo>
        <InfoRow>
          <FiCheck size={16} />
          <span><CompanyInfo>{company}</CompanyInfo> - {busType}</span>
        </InfoRow>
        <InfoRow>
          <FiMapPin size={16} />
          <span>{route}</span>
        </InfoRow>
        <InfoRow>
          <FiCalendar size={16} />
          <span>{date} • {time}</span>
        </InfoRow>
      </TravelInfo>
      
      <SeatMapContainer>
        <VehicleLayout>
          <BusShape>
            <SeatGrid>
              {Array.from({ length: 10 }).map((_, rowIndex) => {
                const row = rowIndex + 1;
                
                return (
                  <React.Fragment key={`row-${row}`}>
                    {/* Asiento izquierdo */}
                    {renderSeat(`L${row}`, row)}
                    
                    {/* Pasillo (sólo columnas interiores para filas > 3) */}
                    {row > 3 ? (
                      <>
                        {renderSeat(`IL${row}`, row)}
                        {renderSeat(`IR${row}`, row)}
                      </>
                    ) : (
                      <Aisle>Pasillo</Aisle>
                    )}
                    
                    {/* Asiento derecho */}
                    {renderSeat(`R${row}`, row)}
                  </React.Fragment>
                );
              })}
            </SeatGrid>
          </BusShape>
        </VehicleLayout>
        
        <Legend>
          <LegendItem>
            <LegendColor color="#e0e0e0" />
            <span>Disponible</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color="#ff3366" />
            <span>Seleccionado</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color="#a0a0a0" />
            <span>No disponible</span>
          </LegendItem>
        </Legend>
      </SeatMapContainer>
      
      <SelectedSeats>
        <SelectedTitle>Asientos seleccionados ({selectedSeats.length})</SelectedTitle>
        
        {selectedSeats.length === 0 ? (
          <Note>
            <FiInfo size={16} />
            <span>No has seleccionado ningún asiento todavía. Selecciona hasta 6 asientos para continuar.</span>
          </Note>
        ) : (
          <>
            <SeatsList>
              {selectedSeats.map(seatId => (
                <SeatTag key={seatId}>
                  <FiUser size={14} />
                  <span>Asiento {seatId}</span>
                  <FiX size={14} onClick={() => removeSeat(seatId)} style={{ cursor: 'pointer' }} />
                </SeatTag>
              ))}
            </SeatsList>
            
            <Note>
              <FiAlertCircle size={16} />
              <span>Precio por asiento: S/ 75.00 - Total: S/ {(selectedSeats.length * 75).toFixed(2)}</span>
            </Note>
          </>
        )}
        
        <Actions>
          <Button 
            size="large" 
            disabled={selectedSeats.length === 0}
            onClick={() => onContinue && onContinue(selectedSeats)}
          >
            Continuar
          </Button>
        </Actions>
      </SelectedSeats>
    </SelectorContainer>
  );
};

export default SeatSelector;
