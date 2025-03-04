// src/components/ticketing/EventDetails.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiInfo, FiHeart, FiShare2, FiChevronDown } from 'react-icons/fi';
import Button from '../common/Button';

const EventContainer = styled.div`
  margin-bottom: 40px;
`;

const EventHero = styled.div`
  position: relative;
  height: 400px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  margin-bottom: 30px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7));
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 300px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 250px;
  }
`;

const EventHeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px;
  color: white;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 20px;
  }
`;

const EventCategory = styled.div`
  display: inline-block;
  background: ${props => props.theme.gradients.primary};
  padding: 6px 14px;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 0.8rem;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: 15px;
`;

const EventTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.8rem;
  }
`;

const EventMeta = styled.div`
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    gap: 15px;
  }
`;

const EventMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
`;

const EventActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 10px 15px;
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

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    align-items: flex-start;
  }
`;

const PriceLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 5px;
`;

const PriceValue = styled.div`
  font-size: 1.6rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
`;

const TabsContainer = styled.div`
  margin-bottom: 30px;
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 25px;
  overflow-x: auto;
  padding-bottom: 5px;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Tab = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: ${props => props.active ? props.theme.typography.fontWeight.semibold : props.theme.typography.fontWeight.medium};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textLight};
  background: none;
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  position: relative;
  white-space: nowrap;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.theme.gradients.primary};
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity ${props => props.theme.transitions.default};
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
`;

const DescriptionSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

const Description = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.textLight};
  
  p {
    margin-bottom: 15px;
  }
  
  ul, ol {
    margin-bottom: 15px;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 0;
  margin-top: 10px;
  
  svg {
    transition: transform ${props => props.theme.transitions.default};
    transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const LocationSection = styled.div`
  margin-bottom: 30px;
`;

const Map = styled.div`
  height: 300px;
  background-color: #e0e0e0;
  border-radius: ${props => props.theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.textLight};
`;

const LocationName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`;

const LocationAddress = styled.div``;

const InfoSection = styled.div`
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 10px;
  color: ${props => props.theme.colors.text};
`;

const InfoContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textLight};
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
    }
  }
`;

const EventDetails = ({
  event = {
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
  }
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  
  return (
    <EventContainer>
      <EventHero image={event.image}>
        <EventHeroContent>
          <EventCategory>{event.category}</EventCategory>
          <EventTitle>{event.title}</EventTitle>
          <EventMeta>
            <EventMetaItem>
              <FiCalendar size={18} />
              <span>{event.date}</span>
            </EventMetaItem>
            <EventMetaItem>
              <FiClock size={18} />
              <span>{event.time}</span>
            </EventMetaItem>
            <EventMetaItem>
              <FiMapPin size={18} />
              <span>{event.location}</span>
            </EventMetaItem>
          </EventMeta>
        </EventHeroContent>
      </EventHero>
      
      <EventActions>
        <ActionButtons>
          <ActionButton>
            <FiHeart size={18} />
            <span>Guardar</span>
          </ActionButton>
          <ActionButton>
            <FiShare2 size={18} />
            <span>Compartir</span>
          </ActionButton>
        </ActionButtons>
        
        <PriceInfo>
          <PriceLabel>Precio</PriceLabel>
          <PriceValue>{event.price}</PriceValue>
        </PriceInfo>
      </EventActions>
      
      <TabsContainer>
        <TabsHeader>
          <Tab 
            active={activeTab === 'details'} 
            onClick={() => setActiveTab('details')}
          >
            Detalles
          </Tab>
          <Tab 
            active={activeTab === 'location'} 
            onClick={() => setActiveTab('location')}
          >
            Ubicación
          </Tab>
          <Tab 
            active={activeTab === 'info'} 
            onClick={() => setActiveTab('info')}
          >
            Información
          </Tab>
        </TabsHeader>
        
        <TabContent active={activeTab === 'details'}>
          <DescriptionSection>
            <SectionTitle>Acerca del evento</SectionTitle>
            <Description
              dangerouslySetInnerHTML={{ 
                __html: isDescExpanded 
                  ? event.description 
                  : event.description.split('</p>')[0] + '</p>' 
              }}
            />
            {event.description.split('</p>').length > 1 && (
              <ReadMoreButton 
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                isExpanded={isDescExpanded}
              >
                {isDescExpanded ? 'Mostrar menos' : 'Leer más'}
                <FiChevronDown size={16} />
              </ReadMoreButton>
            )}
          </DescriptionSection>
        </TabContent>
        
        <TabContent active={activeTab === 'location'}>
          <LocationSection>
            <SectionTitle>Ubicación</SectionTitle>
            <Map>
              <span>Mapa de ubicación del evento</span>
            </Map>
            <LocationInfo>
              <LocationName>{event.location}</LocationName>
              <LocationAddress>{event.address}</LocationAddress>
              <Button 
                secondary 
                size="small"
                style={{ alignSelf: 'flex-start', marginTop: '10px' }}
              >
                Ver indicaciones
              </Button>
            </LocationInfo>
          </LocationSection>
        </TabContent>
        
        <TabContent active={activeTab === 'info'}>
          <InfoSection>
            <SectionTitle>Información importante</SectionTitle>
            {event.information.map((item, index) => (
              <InfoItem key={index}>
                <InfoTitle>{item.title}</InfoTitle>
                <InfoContent dangerouslySetInnerHTML={{ __html: item.content }} />
              </InfoItem>
            ))}
          </InfoSection>
        </TabContent>
      </TabsContainer>
    </EventContainer>
  );
};

export default EventDetails;