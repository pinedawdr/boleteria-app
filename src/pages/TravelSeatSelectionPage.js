// src/pages/TravelSeatSelectionPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiCheck } from 'react-icons/fi';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import SeatSelector from '../components/travel/SeatSelector';

const PageContainer = styled.div`
  padding-top: 80px;
`;

const ContentSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 30px;
  color: ${props => props.theme.colors.text};
`;

const TripInfoCard = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 25px;
  margin-bottom: 30px;
`;

const TripHeader = styled.div`
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

const TripCompany = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.h3`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 5px;
`;

const TripType = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const TripTimeline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: 20px;
  }
`;

const TimeLocationBlock = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

const Time = styled.div`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 5px;
`;

const Location = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin: 0 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    margin: 10px 0;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const TimelineBar = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  position: relative;
  margin-bottom: 10px;
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.primary};
    top: 50%;
    transform: translateY(-50%);
  }
  
  &:before {
    left: 0;
  }
  
  &:after {
    right: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 2px;
    height: 30px;
    margin-bottom: 0;
    margin-right: 10px;
    
    &:before, &:after {
      left: 50%;
      transform: translateX(-50%);
    }
    
    &:before {
      top: 0;
    }
    
    &:after {
      top: 100%;
    }
  }
`;

const Duration = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 5px;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const TripDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const DetailLabel = styled.span`
  color: ${props => props.theme.colors.textLight};
`;

const DetailValue = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`;

const StepsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const Step = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: ${props => props.active ? 'white' : props.completed ? props.theme.colors.background : '#f0f0f0'};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.completed ? props.theme.colors.border : '#e0e0e0'};
  border-right: none;
  position: relative;
  
  &:last-child {
    border-right: 1px solid ${props => props.active ? props.theme.colors.primary : props.completed ? props.theme.colors.border : '#e0e0e0'};
  }
  
  &:first-child {
    border-radius: 5px 0 0 5px;
  }
  
  &:last-child {
    border-radius: 0 5px 5px 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-color: ${props => props.active ? 'white' : props.completed ? props.theme.colors.background : '#f0f0f0'};
    border-top: 1px solid ${props => props.active ? props.theme.colors.primary : props.completed ? props.theme.colors.border : '#e0e0e0'};
    border-right: 1px solid ${props => props.active ? props.theme.colors.primary : props.completed ? props.theme.colors.border : '#e0e0e0'};
    transform: translateY(-50%) rotate(45deg);
    z-index: 1;
  }
  
  &:last-child:after {
    display: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 10px;
    border-right: 1px solid ${props => props.active ? props.theme.colors.primary : props.completed ? props.theme.colors.border : '#e0e0e0'};
    border-bottom: none;
    border-radius: 5px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &:after {
      display: none;
    }
  }
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.theme.colors.primary : props.completed ? props.theme.colors.success : '#c0c0c0'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-right: 10px;
`;

const StepText = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepTitle = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.active ? props.theme.colors.primary : props.completed ? props.theme.colors.text : props.theme.colors.textLight};
`;

const StepDescription = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textLight};
  margin-top: 3px;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div``;

const RightColumn = styled.div``;

const SummaryContainer = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 30px;
  position: sticky;
  top: 100px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: static;
  }
`;

const SummaryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const SummarySection = styled.div`
  margin-bottom: 25px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.95rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  color: ${props => props.theme.colors.textLight};
`;

const SummaryValue = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  margin-top: 15px;
  border-top: 1px solid ${props => props.theme.colors.border};
  font-size: 1.1rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
`;

const SummaryButton = styled.button`
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.button};
  }
  
  &:disabled {
    background: #c0c0c0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Datos de ejemplo para un viaje
const SAMPLE_TRIP = {
  id: 1,
  company: "Qorilazo",
  price: 125.00,
  departureTime: "08:30",
  departureLocation: "Cusco",
  arrivalTime: "14:45",
  arrivalLocation: "Terminal Qorilazo, Santo Tomás",
  duration: "6h 15m",
  date: "15 Jul 2025",
  type: "Ejecutivo VIP",
  travelType: "bus", // bus, boat, train
  features: ["Asientos reclinables 160°", "WiFi a bordo", "Snacks incluidos", "Entretenimiento a bordo"]
};

const TravelSeatSelectionPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [step, setStep] = useState(1); // 1: Selección de asientos, 2: Datos del pasajero, 3: Pago
  
  // Cargar datos del viaje
  useEffect(() => {
    // Simulamos carga desde una API
    setLoading(true);
    setTimeout(() => {
      setTrip(SAMPLE_TRIP);
      setLoading(false);
    }, 800);
  }, [tripId]);
  
  // Manejar selección de asientos
  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
    setStep(2); // Avanzar al siguiente paso
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Manejar el paso de datos de pasajero
  const handlePassengerData = () => {
    setStep(3); // Avanzar al pago
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Manejar el pago y confirmación
  const handlePayment = () => {
    // Simular procesamiento de pago
    alert("¡Pago exitoso! Tu viaje ha sido reservado.");
    navigate("/pasajes/confirmacion");
  };
  
  // Calcular total
  const calculateTotal = () => {
    if (!trip) return 0;
    
    const subtotal = selectedSeats.length * trip.price;
    const serviceFee = subtotal * 0.1; // 10% de cargo por servicio
    return subtotal + serviceFee;
  };
  
  if (loading) {
    return (
      <PageContainer>
        <Navbar />
        <ContentSection>
          <div>Cargando información del viaje...</div>
        </ContentSection>
        <Footer />
      </PageContainer>
    );
  }
  
  if (!trip) {
    return (
      <PageContainer>
        <Navbar />
        <ContentSection>
          <div>No se encontró información para este viaje</div>
        </ContentSection>
        <Footer />
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Navbar />
      
      <ContentSection>
        <BackButton to="/pasajes">
          <FiArrowLeft size={18} />
          <span>Volver a resultados</span>
        </BackButton>
        
        <PageTitle>Selección de asientos</PageTitle>
        
        <StepsContainer>
          <Step active={step === 1} completed={step > 1}>
            <StepNumber active={step === 1} completed={step > 1}>
              {step > 1 ? <FiCheck size={16} /> : 1}
            </StepNumber>
            <StepText>
              <StepTitle active={step === 1} completed={step > 1}>Selección de asientos</StepTitle>
              <StepDescription>Elige tus asientos preferidos</StepDescription>
            </StepText>
          </Step>
          
          <Step active={step === 2} completed={step > 2}>
            <StepNumber active={step === 2} completed={step > 2}>
              {step > 2 ? <FiCheck size={16} /> : 2}
            </StepNumber>
            <StepText>
              <StepTitle active={step === 2} completed={step > 2}>Datos de pasajeros</StepTitle>
              <StepDescription>Ingresa la información de cada pasajero</StepDescription>
            </StepText>
          </Step>
          
          <Step active={step === 3} completed={step > 3}>
            <StepNumber active={step === 3} completed={step > 3}>
              {step > 3 ? <FiCheck size={16} /> : 3}
            </StepNumber>
            <StepText>
              <StepTitle active={step === 3} completed={step > 3}>Pago</StepTitle>
              <StepDescription>Finaliza tu reserva</StepDescription>
            </StepText>
          </Step>
        </StepsContainer>
        
        <TripInfoCard>
          <TripHeader>
            <TripCompany>
              <Logo>{trip.company.charAt(0)}</Logo>
              <CompanyInfo>
                <CompanyName>{trip.company}</CompanyName>
                <TripType>
                  {trip.travelType === 'bus' 
                    ? 'Autobús' 
                    : trip.travelType === 'boat' 
                      ? 'Embarcación' 
                      : 'Tren'} {trip.type}
                </TripType>
              </CompanyInfo>
            </TripCompany>
          </TripHeader>
          
          <TripTimeline>
            <TimeLocationBlock>
              <Time>{trip.departureTime}</Time>
              <Location>{trip.departureLocation}</Location>
            </TimeLocationBlock>
            
            <Timeline>
              <TimelineBar />
              <Duration>
                <FiClock size={16} />
                <span>{trip.duration}</span>
              </Duration>
            </Timeline>
            
            <TimeLocationBlock>
              <Time>{trip.arrivalTime}</Time>
              <Location>{trip.arrivalLocation}</Location>
            </TimeLocationBlock>
          </TripTimeline>
          
          <TripDetails>
            {trip.features.map((feature, index) => (
              <DetailItem key={index}>
                <FiCheck size={16} />
                <DetailValue>{feature}</DetailValue>
              </DetailItem>
            ))}
          </TripDetails>
        </TripInfoCard>
        
        <TwoColumnLayout>
          <LeftColumn>
            {step === 1 && (
              <SeatSelector 
                company={trip.company}
                route={`${trip.departureLocation.split(',')[0]} - ${trip.arrivalLocation.split(',')[0]}`}
                date={trip.date}
                time={trip.departureTime}
                busType={trip.type}
                travelType={trip.travelType}
                onContinue={handleSeatSelection}
              />
            )}
            
            {step === 2 && (
              <div>
                {/* Aquí iría un componente de formulario para datos de pasajeros */}
                {/* Por simplicidad, simulamos este paso */}
                <SummaryButton onClick={handlePassengerData}>
                  Continuar al pago
                </SummaryButton>
              </div>
            )}
            
            {step === 3 && (
              <div>
                {/* Aquí iría un componente de formulario de pago */}
                {/* Por simplicidad, simulamos este paso */}
                <SummaryButton onClick={handlePayment}>
                  Confirmar y pagar
                </SummaryButton>
              </div>
            )}
          </LeftColumn>
          
          <RightColumn>
            <SummaryContainer>
              <SummaryTitle>Resumen de compra</SummaryTitle>
              
              <SummarySection>
                <SummaryItem>
                  <SummaryLabel>Viaje:</SummaryLabel>
                  <SummaryValue>{trip.departureLocation.split(',')[0]} - {trip.arrivalLocation.split(',')[0]}</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Fecha:</SummaryLabel>
                  <SummaryValue>{trip.date}</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Hora de salida:</SummaryLabel>
                  <SummaryValue>{trip.departureTime}</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Compañía:</SummaryLabel>
                  <SummaryValue>{trip.company}</SummaryValue>
                </SummaryItem>
              </SummarySection>
              
              <SummarySection>
                <SummaryItem>
                  <SummaryLabel>Asientos seleccionados:</SummaryLabel>
                  <SummaryValue>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ninguno'}</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Precio por asiento:</SummaryLabel>
                  <SummaryValue>S/ {trip.price.toFixed(2)}</SummaryValue>
                </SummaryItem>
              </SummarySection>
              
              <SummarySection>
                <SummaryItem>
                  <SummaryLabel>Subtotal:</SummaryLabel>
                  <SummaryValue>S/ {(selectedSeats.length * trip.price).toFixed(2)}</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Cargo por servicio:</SummaryLabel>
                  <SummaryValue>S/ {(selectedSeats.length * trip.price * 0.1).toFixed(2)}</SummaryValue>
                </SummaryItem>
              </SummarySection>
              
              <TotalPrice>
                <span>Total:</span>
                <span>S/ {calculateTotal().toFixed(2)}</span>
              </TotalPrice>
            </SummaryContainer>
          </RightColumn>
        </TwoColumnLayout>
      </ContentSection>
      
      <Footer />
    </PageContainer>
  );
};

export default TravelSeatSelectionPage;