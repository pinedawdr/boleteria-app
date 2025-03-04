// src/components/ticketing/CheckoutSummary.js
import React from 'react';
import styled from 'styled-components';
import { FiCalendar, FiMapPin, FiClock, FiTag, FiCreditCard, FiShield, FiAlertCircle } from 'react-icons/fi';
import Button from '../common/Button';

const SummaryContainer = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 30px;
  position: sticky;
  top: 100px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: static;
    margin-top: 30px;
  }
`;

const SummaryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 25px;
  color: ${props => props.theme.colors.text};
`;

const EventInfo = styled.div`
  margin-bottom: 25px;
`;

const EventTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EventDetail = styled.div`
  display: flex;
  gap: 10px;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.9rem;
  align-items: flex-start;
  
  svg {
    margin-top: 3px;
    flex-shrink: 0;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin: 20px 0;
`;

const TicketsSection = styled.div`
  margin-bottom: 25px;
`;

const TicketsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TicketItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px dashed ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TicketName = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: 0.95rem;
`;

const TicketSection = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
`;

const TicketPrice = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const PriceSection = styled.div`
  margin-bottom: 25px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.textLight};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PriceLabel = styled.span``;

const PriceValue = styled.span``;

const TotalRow = styled(PriceRow)`
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  padding-top: 10px;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 10px;
`;

const PromoCodeSection = styled.div`
  margin-bottom: 25px;
`;

const PromoCodeForm = styled.form`
  display: flex;
  gap: 10px;
`;

const PromoCodeInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ApplyButton = styled.button`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 10px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.theme.colors.border};
  }
`;

const SecureInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: 25px;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textLight};
  
  svg {
    color: ${props => props.theme.colors.success};
  }
`;

const TimeLimit = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background-color: #FFF4E5;
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: 25px;
  font-size: 0.85rem;
  color: #B54708;
  
  svg {
    color: #B54708;
  }
`;

const CheckoutSummary = ({ 
  event = {
    title: "Bruno Mars - World Tour 2025",
    date: "15 Ago 2025",
    time: "20:00",
    location: "Estadio Nacional, Lima",
    category: "Concierto"
  },
  selectedSeats = [
    { id: "A1", price: 200 },
    { id: "A2", price: 200 },
  ],
  onCheckout
}) => {
  // Calcular subtotal
  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  // Cargo por servicio (asumimos un 10% del subtotal)
  const serviceFee = subtotal * 0.1;
  
  // Total
  const total = subtotal + serviceFee;
  
  return (
    <SummaryContainer>
      <SummaryTitle>Resumen de compra</SummaryTitle>
      
      <EventInfo>
        <EventTitle>{event.title}</EventTitle>
        <EventDetails>
          <EventDetail>
            <FiCalendar size={16} />
            <span>{event.date}</span>
          </EventDetail>
          <EventDetail>
            <FiClock size={16} />
            <span>{event.time}</span>
          </EventDetail>
          <EventDetail>
            <FiMapPin size={16} />
            <span>{event.location}</span>
          </EventDetail>
          <EventDetail>
            <FiTag size={16} />
            <span>{event.category}</span>
          </EventDetail>
        </EventDetails>
      </EventInfo>
      
      <Divider />
      
      <TicketsSection>
        <SummaryTitle>Boletos seleccionados ({selectedSeats.length})</SummaryTitle>
        <TicketsList>
          {selectedSeats.map((seat, index) => (
            <TicketItem key={index}>
              <TicketInfo>
                <TicketName>Boleto General</TicketName>
                <TicketSection>Asiento {seat.id}</TicketSection>
              </TicketInfo>
              <TicketPrice>S/ {seat.price.toFixed(2)}</TicketPrice>
            </TicketItem>
          ))}
        </TicketsList>
      </TicketsSection>
      
      <Divider />
      
      <PriceSection>
        <SummaryTitle>Precio</SummaryTitle>
        <PriceRow>
          <PriceLabel>Subtotal</PriceLabel>
          <PriceValue>S/ {subtotal.toFixed(2)}</PriceValue>
        </PriceRow>
        <PriceRow>
          <PriceLabel>Cargo por servicio</PriceLabel>
          <PriceValue>S/ {serviceFee.toFixed(2)}</PriceValue>
        </PriceRow>
        <TotalRow>
          <PriceLabel>Total</PriceLabel>
          <PriceValue>S/ {total.toFixed(2)}</PriceValue>
        </TotalRow>
      </PriceSection>
      
      <Divider />
      
      <PromoCodeSection>
        <SummaryTitle>¿Tienes un código promocional?</SummaryTitle>
        <PromoCodeForm>
          <PromoCodeInput 
            type="text" 
            placeholder="Ingresa tu código" 
          />
          <ApplyButton type="button">Aplicar</ApplyButton>
        </PromoCodeForm>
      </PromoCodeSection>
      
      <TimeLimit>
        <FiAlertCircle size={18} />
        <span>Tienes 10:00 minutos para completar tu compra</span>
      </TimeLimit>
      
      <SecureInfo>
        <FiShield size={18} />
        <span>Pago 100% seguro. Tus datos están protegidos.</span>
      </SecureInfo>
      
      <Button 
        fullWidth 
        size="large"
        icon={<FiCreditCard size={18} />}
        onClick={onCheckout}
      >
        Proceder al pago
      </Button>
    </SummaryContainer>
  );
};

export default CheckoutSummary;