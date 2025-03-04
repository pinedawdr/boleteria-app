// src/pages/TicketPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import EventDetails from '../components/ticketing/EventDetails';
import SeatMap from '../components/ticketing/SeatMap';
import CheckoutSummary from '../components/ticketing/CheckoutSummary';

const PageContainer = styled.div`
  padding-top: 80px;
`;

const ContentContainer = styled.div`
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

// Datos de ejemplo del evento
const EVENT_DATA = {
  id: 1,
  title: "Bruno Mars - World Tour 2025",
  image: "/images/event1.jpg",
  category: "Concierto",
  date: "15 Ago 2025",
  time: "20:00",
  location: "Estadio Nacional, Lima",
  address: "Av. José Díaz s/n, Cercado de Lima 15046",
  price: "Desde S/ 120.00",
  description: `
    <p>¡Bruno Mars regresa a Lima como parte de su gira mundial 2025! El ganador de múltiples premios Grammy presentará todos sus éxitos en un show imperdible en el Estadio Nacional.</p>
    
    <p>Con una producción de primer nivel, efectos visuales impresionantes y su increíble banda, Bruno Mars promete una noche llena de música, baile y diversión. No te pierdas la oportunidad de disfrutar en vivo de éxitos como "Uptown Funk", "Just The Way You Are", "24K Magic" y muchos más.</p>
    
    <p>La gira "World Tour 2025" ha sido aclamada por la crítica internacional como uno de los mejores espectáculos del año. Las entradas para fechas anteriores se agotaron en tiempo récord, ¡así que asegura la tuya ahora!</p>
  `,
  information: [
    {
      title: "Acceso al evento",
      content: `
        <ul>
          <li>Las puertas se abrirán 2 horas antes del inicio del show.</li>
          <li>Se recomienda llegar con anticipación para evitar congestiones.</li>
          <li>Será necesario presentar tu entrada (física o digital) y un documento de identidad válido.</li>
        </ul>
      `
    },
    {
      title: "Restricciones",
      content: `
        <ul>
          <li>No se permitirá el ingreso con cámaras profesionales o semiprofesionales.</li>
          <li>No se permitirá el ingreso con alimentos o bebidas.</li>
          <li>No se permitirá el ingreso con objetos punzocortantes, armas o cualquier elemento que pueda representar un peligro.</li>
          <li>El evento es para todas las edades. Menores de 15 años deben estar acompañados por un adulto.</li>
        </ul>
      `
    },
    {
      title: "Política de entradas",
      content: `
        <ul>
          <li>Todas las ventas son finales, no se aceptan devoluciones ni cambios.</li>
          <li>En caso de cancelación del evento, se procederá con el reembolso según los términos y condiciones establecidos.</li>
          <li>La reventa de entradas está prohibida y puede resultar en la invalidación de las mismas.</li>
        </ul>
      `
    }
  ]
};

const TicketPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([
    { id: "A1", price: 200 },
    { id: "A2", price: 200 },
  ]);
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleCheckout = () => {
    // Implementar lógica de checkout
    console.log("Proceeding to checkout with seats:", selectedSeats);
    alert("¡Checkout exitoso! Gracias por tu compra.");
  };
  
  return (
    <PageContainer>
      <Navbar />
      
      <ContentContainer>
        <BackButton to="/eventos">
          <FiArrowLeft size={18} />
          <span>Volver a eventos</span>
        </BackButton>
        
        <TwoColumnLayout>
          <LeftColumn>
            <EventDetails event={EVENT_DATA} />
            <SeatMap />
          </LeftColumn>
          
          <RightColumn>
            <CheckoutSummary 
              event={EVENT_DATA}
              selectedSeats={selectedSeats}
              onCheckout={handleCheckout}
            />
          </RightColumn>
        </TwoColumnLayout>
      </ContentContainer>
      
      <Footer />
    </PageContainer>
  );
};

export default TicketPage;