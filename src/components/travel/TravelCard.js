// src/components/travel/TravelCard.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiCalendar, FiChevronRight, FiWifi, FiMonitor, FiCoffee, FiPower } from 'react-icons/fi';
import Button from '../common/Button';

const Card = styled(motion.div)`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 20px;
  margin-bottom: 20px;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const CompanyLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
`;

const CompanyName = styled.h3`
  font-size: 1.1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const PriceTag = styled.div`
  text-align: right;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    text-align: left;
    align-self: flex-end;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
`;

const PriceLabel = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
`;

const CardContent = styled.div`
  margin-bottom: 20px;
`;

const RouteInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const LocationTime = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const Time = styled.div`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 5px;
`;

const Location = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 5px;
  
  svg {
    flex-shrink: 0;
  }
`;

const RouteConnector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 0;
  }
`;

const Duration = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: 10px;
  white-space: nowrap;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 0;
  }
`;

const RouteVisual = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100px;
  }
  
  &:before {
    content: '';
    height: 2px;
    background: ${props => props.theme.colors.primary};
    flex-grow: 1;
  }
  
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2px;
    color: ${props => props.theme.colors.primary};
  }
`;

const TripDetails = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-wrap: wrap;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
  
  svg {
    color: ${props => props.theme.colors.primary};
    flex-shrink: 0;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin: 15px 0;
`;

const Amenities = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Amenity = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const TravelCard = ({ 
  company = "Cruz del Sur",
  price = "125.00",
  currencySymbol = "S/",
  departureTime = "08:30",
  departureLocation = "Terminal Plaza Norte, Lima",
  arrivalTime = "14:45",
  arrivalLocation = "Terminal Terrestre, Cusco",
  duration = "6h 15m",
  date = "15 Jul 2025",
  type = "Ejecutivo VIP",
  travelType = "bus", // bus, boat, train
  directRoute = true,
  amenities = ["wifi", "usb", "food", "entertainment"],
  onSelect
}) => {
  // Mapeo de iconos para amenidades
  const amenityIcons = {
    wifi: <FiWifi />,
    usb: <FiPower />,
    food: <FiCoffee />,
    entertainment: <FiMonitor />
  };
  
  // Mapeo de nombres para amenidades
  const amenityNames = {
    wifi: "WiFi a bordo",
    usb: "Puertos USB",
    food: "Snacks incluidos",
    entertainment: "Entretenimiento"
  };
  
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardHeader>
        <CompanyLogo>
          <Logo>{company.charAt(0)}</Logo>
          <CompanyName>{company}</CompanyName>
        </CompanyLogo>
        
        <PriceTag>
          <Price>{currencySymbol} {price}</Price>
          <PriceLabel>por persona</PriceLabel>
        </PriceTag>
      </CardHeader>
      
      <CardContent>
        <RouteInfo>
          <LocationTime>
            <Time>{departureTime}</Time>
            <Location>
              <FiMapPin size={16} />
              <span>{departureLocation}</span>
            </Location>
          </LocationTime>
          
          <RouteConnector>
            <Duration>{duration}</Duration>
            <RouteVisual>
              <FiChevronRight size={20} />
            </RouteVisual>
            {!directRoute && <span>1 parada</span>}
          </RouteConnector>
          
          <LocationTime>
            <Time>{arrivalTime}</Time>
            <Location>
              <FiMapPin size={16} />
              <span>{arrivalLocation}</span>
            </Location>
          </LocationTime>
        </RouteInfo>
        
        <TripDetails>
          <DetailItem>
            <FiCalendar size={16} />
            <span>{date}</span>
          </DetailItem>
          <DetailItem>
            <FiClock size={16} />
            <span>{duration}</span>
          </DetailItem>
          <DetailItem>
            <FiChevronRight size={16} />
            <span>{travelType === 'bus' ? 'Autobús' : travelType === 'boat' ? 'Embarcación' : 'Tren'} {type}</span>
          </DetailItem>
        </TripDetails>
        
        <Divider />
        
        <Amenities>
          {amenities.map((amenity, index) => (
            <Amenity key={index}>
              {amenityIcons[amenity]}
              <span>{amenityNames[amenity]}</span>
            </Amenity>
          ))}
        </Amenities>
      </CardContent>
      
      <CardActions>
        <Button onClick={onSelect}>
          Seleccionar
        </Button>
      </CardActions>
    </Card>
  );
};

export default TravelCard;