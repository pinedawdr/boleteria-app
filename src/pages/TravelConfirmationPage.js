// src/pages/TravelConfirmationPage.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiDownload, FiSend, FiHome, FiCalendar, FiMapPin, FiClock, FiUsers, FiCreditCard } from 'react-icons/fi';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const PageContainer = styled.div`
  padding-top: 80px;
`;

const ContentSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const ConfirmationCard = styled(motion.div)`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.large};
  padding: 40px;
  margin-bottom: 30px;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 30px 20px;
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.gradients.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 2rem;
`;

const ConfirmationTitle = styled.h1`
  font-size: 2rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const ConfirmationMessage = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 30px;
`;

const ReservationCode = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 20px;
  margin-bottom: 30px;
  
  h3 {
    font-size: 1rem;
    color: ${props => props.theme.colors.textLight};
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1.8rem;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    letter-spacing: 2px;
    color: ${props => props.theme.colors.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const TripInfoCard = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 30px;
  margin-bottom: 30px;
`;

const TripHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 25px;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const TripDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  
  svg {
    color: ${props => props.theme.colors.primary};
    margin-top: 3px;
  }
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 3px;
`;

const DetailValue = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`;

const PassengerSection = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const PassengerTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
`;

const PassengerList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const PassengerCard = styled.div`
  padding: 15px;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const PassengerName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: 5px;
  color: ${props => props.theme.colors.text};
`;

const PassengerDetail = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 5px;
  
  span {
    font-weight: ${props => props.theme.typography.fontWeight.medium};
  }
`;

const ImportantInfo = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #FFF4E5;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 0.95rem;
  color: #B54708;
  
  h4 {
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    margin-bottom: 10px;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
    }
  }
`;

const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 30px auto 0;
  background: ${props => props.theme.gradients.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 15px 30px;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  max-width: 250px;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.button};
  }
`;

// Datos de ejemplo para la confirmación
const CONFIRMATION_DATA = {
  reservationCode: "BT-293847",
  tripInfo: {
    company: "Qorilazo",
    type: "Ejecutivo VIP",
    travelType: "bus",
    from: "Cusco",
    to: "Chumbivilcas",
    date: "15 Jul 2025",
    departureTime: "08:30",
    arrivalTime: "14:45",
    duration: "6h 15m",
    departureLocation: "Cusco",
    arrivalLocation: "Santo Tomás - Chumbivilcas"
  },
  price: {
    subtotal: 250.00,
    serviceFee: 25.00,
    total: 275.00
  },
  payment: {
    method: "Tarjeta de crédito",
    cardType: "Visa",
    lastDigits: "4567"
  },
  passengers: [
    { name: "Juan Pérez", document: "DNI: 12345678", seat: "L5" },
    { name: "Ana López", document: "DNI: 87654321", seat: "L6" }
  ]
};

const TravelConfirmationPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const { reservationCode, tripInfo, price, payment, passengers } = CONFIRMATION_DATA;
  
  return (
    <PageContainer>
      <Navbar />
      
      <ContentSection>
        <ConfirmationCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessIcon>
            <FiCheck size={40} />
          </SuccessIcon>
          
          <ConfirmationTitle>¡Reserva confirmada!</ConfirmationTitle>
          <ConfirmationMessage>
            Tu reserva ha sido procesada exitosamente. A continuación encontrarás todos los detalles de tu viaje.
          </ConfirmationMessage>
          
          <ReservationCode>
            <h3>Código de reserva</h3>
            <p>{reservationCode}</p>
          </ReservationCode>
          
          <ActionButtons>
            <Button icon={<FiDownload />}>
              Descargar boleto
            </Button>
            <Button 
              icon={<FiSend />}
              secondary
            >
              Enviar por email
            </Button>
          </ActionButtons>
        </ConfirmationCard>
        
        <TripInfoCard>
          <TripHeader>Detalles del viaje</TripHeader>
          
          <TripDetails>
            <DetailSection>
              <DetailItem>
                <FiMapPin size={18} />
                <DetailContent>
                  <DetailLabel>Ruta</DetailLabel>
                  <DetailValue>{tripInfo.from} → {tripInfo.to}</DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <FiCalendar size={18} />
                <DetailContent>
                  <DetailLabel>Fecha de viaje</DetailLabel>
                  <DetailValue>{tripInfo.date}</DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <FiClock size={18} />
                <DetailContent>
                  <DetailLabel>Horario</DetailLabel>
                  <DetailValue>
                    {tripInfo.departureTime} - {tripInfo.arrivalTime} ({tripInfo.duration})
                  </DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailSection>
            
            <DetailSection>
              <DetailItem>
                <FiMapPin size={18} />
                <DetailContent>
                  <DetailLabel>Terminal de salida</DetailLabel>
                  <DetailValue>{tripInfo.departureLocation}</DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <FiMapPin size={18} />
                <DetailContent>
                  <DetailLabel>Terminal de llegada</DetailLabel>
                  <DetailValue>{tripInfo.arrivalLocation}</DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <FiUsers size={18} />
                <DetailContent>
                  <DetailLabel>Servicio</DetailLabel>
                  <DetailValue>
                    {tripInfo.company} - {tripInfo.travelType === 'bus' 
                      ? 'Autobús' 
                      : tripInfo.travelType === 'boat' 
                        ? 'Embarcación' 
                        : 'Tren'} {tripInfo.type}
                  </DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailSection>
            
            <DetailSection>
              <DetailItem>
                <FiCreditCard size={18} />
                <DetailContent>
                  <DetailLabel>Método de pago</DetailLabel>
                  <DetailValue>
                    {payment.method} ({payment.cardType} terminada en {payment.lastDigits})
                  </DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <FiUsers size={18} />
                <DetailContent>
                  <DetailLabel>Pasajeros</DetailLabel>
                  <DetailValue>{passengers.length}</DetailValue>
                </DetailContent>
              </DetailItem>
              
              <DetailItem>
                <FiCreditCard size={18} />
                <DetailContent>
                  <DetailLabel>Total pagado</DetailLabel>
                  <DetailValue>S/ {price.total.toFixed(2)}</DetailValue>
                </DetailContent>
              </DetailItem>
            </DetailSection>
          </TripDetails>
          
          <PassengerSection>
            <PassengerTitle>Información de pasajeros</PassengerTitle>
            
            <PassengerList>
              {passengers.map((passenger, index) => (
                <PassengerCard key={index}>
                  <PassengerName>{passenger.name}</PassengerName>
                  <PassengerDetail>{passenger.document}</PassengerDetail>
                  <PassengerDetail>
                    Asiento: <span>{passenger.seat}</span>
                  </PassengerDetail>
                </PassengerCard>
              ))}
            </PassengerList>
          </PassengerSection>
          
          <ImportantInfo>
            <h4>Información importante</h4>
            <ul>
              <li>Preséntate en el terminal con al menos 30 minutos de anticipación.</li>
              <li>Es necesario presentar un documento de identidad válido para abordar.</li>
              <li>Cada pasajero puede llevar una maleta de hasta 20kg y un equipaje de mano.</li>
              <li>Si necesitas modificar o cancelar tu reserva, debes hacerlo con al menos 24 horas de anticipación.</li>
            </ul>
          </ImportantInfo>
        </TripInfoCard>
        
        <HomeButton to="/">
          <FiHome size={18} />
          <span>Volver al inicio</span>
        </HomeButton>
      </ContentSection>
      
      <Footer />
    </PageContainer>
  );
};

export default TravelConfirmationPage;