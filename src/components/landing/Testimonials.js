// src/components/landing/Testimonials.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

// Datos de ejemplo para los testimonios
const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Ramírez",
    role: "Usuario frecuente",
    avatar: "/images/avatar1.jpg",
    quote: "Boleteria ha cambiado completamente la forma en que compro entradas. La interfaz es intuitiva y el proceso de compra es rápido y seguro. ¡Ya no tengo que hacer filas interminables!",
    rating: 5,
  },
  {
    id: 2,
    name: "Lucía Mendoza",
    role: "Aficionada a conciertos",
    avatar: "/images/avatar2.jpg",
    quote: "He probado varias plataformas de venta de boletos, pero ninguna se compara con Boleteria. Sus notificaciones personalizadas me mantienen al día con los eventos que me interesan.",
    rating: 5,
  },
  {
    id: 3,
    name: "Miguel Ángel Torres",
    role: "Fanático del teatro",
    avatar: "/images/avatar3.jpg",
    quote: "Como amante del teatro, valoro mucho la sección especializada que tiene Boleteria. Puedo encontrar desde obras clásicas hasta las más vanguardistas, ¡excelente variedad!",
    rating: 4,
  },
  {
    id: 4,
    name: "Ana Paula Vega",
    role: "Deportista",
    avatar: "/images/avatar4.jpg",
    quote: "Gracias a Boleteria nunca me pierdo un partido importante. La aplicación es muy rápida y el sistema de selección de asientos es el mejor que he utilizado hasta ahora.",
    rating: 5,
  },
  {
    id: 5,
    name: "Javier Sánchez",
    role: "Padre de familia",
    avatar: "/images/avatar5.jpg",
    quote: "Buscaba una plataforma confiable para comprar entradas para actividades familiares y encontré Boleteria. La sección de eventos familiares es perfecta para planear los fines de semana.",
    rating: 4,
  },
];

const Section = styled.section`
  padding: 100px 0;
  background-color: ${props => props.theme.colors.backgroundAlt};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${props => props.theme.gradients.primary};
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto;
`;

const TestimonialsWrapper = styled.div`
  position: relative;
  padding: 0 50px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const TestimonialSlide = styled.div`
  display: flex;
  overflow: hidden;
`;

const TestimonialCard = styled(motion.div)`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 40px;
  box-shadow: ${props => props.theme.shadows.medium};
  flex: 0 0 100%;
  transition: all ${props => props.theme.transitions.default};
  display: flex;
  flex-direction: column;
  min-height: 250px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 30px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 20px;
  }
`;

const QuoteContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Quote = styled.blockquote`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.text};
  flex-grow: 1;
  font-style: italic;
  position: relative;
  
  &:before {
    content: '"';
    font-size: 4rem;
    position: absolute;
    left: -20px;
    top: -30px;
    color: ${props => props.theme.colors.primary};
    opacity: 0.2;
  }
`;

const Rating = styled.div`
  display: flex;
  color: #FFD700;
  margin-bottom: 20px;
`;

const TestimonialFooter = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  border: 3px solid ${props => props.theme.colors.primary};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h4`
  font-size: 1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 5px;
  color: ${props => props.theme.colors.text};
`;

const Role = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all ${props => props.theme.transitions.default};
  color: ${props => props.theme.colors.text};
  z-index: 2;
  
  &:hover {
    background: ${props => props.theme.gradients.primary};
    color: white;
    transform: translateY(-50%) scale(1.1);
  }
  
  &.prev {
    left: 0;
  }
  
  &.next {
    right: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

const Indicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? props.theme.colors.primary : '#e0e0e0'};
  transition: all ${props => props.theme.transitions.default};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : '#c0c0c0'};
  }
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Lo que opinan nuestros usuarios</SectionTitle>
          <SectionSubtitle>
            Miles de personas confían en Boleteria para encontrar y comprar entradas a sus eventos favoritos
          </SectionSubtitle>
        </SectionHeader>
        
        <TestimonialsWrapper>
          <TestimonialSlide>
            <TestimonialCard
              key={TESTIMONIALS[currentIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuoteContent>
                <Quote>{TESTIMONIALS[currentIndex].quote}</Quote>
                <Rating>
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i}
                      size={18}
                      fill={i < TESTIMONIALS[currentIndex].rating ? "#FFD700" : "none"}
                    />
                  ))}
                </Rating>
              </QuoteContent>
              
              <TestimonialFooter>
                <Avatar>
                  <img 
                    src={TESTIMONIALS[currentIndex].avatar} 
                    alt={TESTIMONIALS[currentIndex].name} 
                  />
                </Avatar>
                <PersonInfo>
                  <Name>{TESTIMONIALS[currentIndex].name}</Name>
                  <Role>{TESTIMONIALS[currentIndex].role}</Role>
                </PersonInfo>
              </TestimonialFooter>
            </TestimonialCard>
          </TestimonialSlide>
          
          <NavigationButton 
            className="prev" 
            onClick={prevSlide}
            aria-label="Testimonio anterior"
          >
            <FiChevronLeft size={24} />
          </NavigationButton>
          
          <NavigationButton 
            className="next" 
            onClick={nextSlide}
            aria-label="Testimonio siguiente"
          >
            <FiChevronRight size={24} />
          </NavigationButton>
          
          <Indicators>
            {TESTIMONIALS.map((_, index) => (
              <Indicator 
                key={index}
                active={currentIndex === index}
                onClick={() => goToSlide(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </Indicators>
        </TestimonialsWrapper>
      </Container>
    </Section>
  );
};

export default Testimonials;