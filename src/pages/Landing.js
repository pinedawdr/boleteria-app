// src/pages/Landing.js
import React, { useEffect, useState } from 'react';
import Hero from '../components/landing/Hero';
import FeaturedEvents from '../components/landing/FeaturedEvents';
import Categories from '../components/landing/Categories';
import UpcomingEvents from '../components/landing/UpcomingEvents';
import CallToAction from '../components/landing/CallToAction';
import Testimonials from '../components/landing/Testimonials';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import styled from 'styled-components';

// Componente para mostrar un loader mientras se cargan las imágenes
const PreLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  opacity: ${props => props.loading ? 1 : 0};
  visibility: ${props => props.loading ? 'visible' : 'hidden'};
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingLogo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  
  span {
    background: ${props => props.theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 51, 102, 0.3);
  border-radius: 50%;
  border-top-color: ${props => props.theme.colors.primary};
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Componente contenedor para cada sección con ID
const Section = styled.section`
  scroll-margin-top: 80px; // Para que el scroll se detenga con espacio para el navbar
`;

const Landing = () => {
  const [loading, setLoading] = useState(true);

  // Simular precarga de imágenes y recursos
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PreLoader loading={loading}>
        <SpinnerContainer>
          <LoadingLogo>
            <span>Boleteria</span>
          </LoadingLogo>
          <Spinner />
        </SpinnerContainer>
      </PreLoader>
      
      <Navbar transparent />
      
      <Section id="hero-section">
        <Hero />
      </Section>
      
      <Section id="events-section">
        <FeaturedEvents />
      </Section>
      
      <Section id="categories-section">
        <Categories />
      </Section>
      
      <Section id="upcoming-section">
        <UpcomingEvents />
      </Section>
      
      <Section id="testimonials-section">
        <Testimonials />
      </Section>
      
      <Section id="cta-section">
        <CallToAction />
      </Section>
      
      <Footer />
    </>
  );
};

export default Landing;