// src/components/landing/CallToAction.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import Button from '../common/Button';

const Section = styled.section`
  padding: 80px 0;
  background: ${props => props.theme.gradients.primary};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const CircleDecoration = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  
  &.circle-1 {
    width: 300px;
    height: 300px;
    top: -100px;
    left: -100px;
  }
  
  &.circle-2 {
    width: 200px;
    height: 200px;
    bottom: -50px;
    right: 10%;
  }
  
  &.circle-3 {
    width: 150px;
    height: 150px;
    top: 20%;
    right: -50px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  color: white;
  padding-right: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding-right: 0;
    margin-bottom: 40px;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 20px;
  line-height: 1.2;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
  max-width: 600px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const AppButtons = styled(motion.div)`
  display: flex;
  gap: 15px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const AppButton = styled.a`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};
  box-shadow: ${props => props.theme.shadows.medium};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const AppIcon = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppText = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppSmallText = styled.span`
  font-size: 0.8rem;
  opacity: 0.7;
`;

const AppBigText = styled.span`
  font-size: 1.1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const ImageContent = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  max-width: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
    max-width: 100%;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.large};
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const CallToAction = () => {
  return (
    <Section>
      <CircleDecoration className="circle-1" />
      <CircleDecoration className="circle-2" />
      <CircleDecoration className="circle-3" />
      
      <Container>
        <Content>
          <TextContent>
            <Title
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Descarga nuestra app y lleva tus eventos a todas partes
            </Title>
            
            <Subtitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Compra tus entradas, recibe notificaciones de tus eventos favoritos y accede a promociones exclusivas desde tu dispositivo móvil.
            </Subtitle>
            
            <AppButtons
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AppButton href="#" target="_blank" rel="noopener noreferrer">
                <AppIcon>
                  <svg width="25" height="30" viewBox="0 0 25 30" fill="none">
                    <path d="M20.5 15.5C20.5 12.6 22.7 10.1 25 9C23.8 7.1 21.6 5.9 19.4 5.9C17.2 5.8 16 6.9 14.2 6.9C12.4 6.9 11.2 5.9 9.2 5.9C7 5.9 4.6 7.3 3.3 9.5C1.4 13.1 1.9 18.9 5.5 23.1C7 25 8.6 27.1 10.7 27C12.7 26.9 13.4 25.8 15.7 25.8C18 25.8 18.6 27 20.7 26.9C22.8 26.8 24.2 24.9 25.7 23C26.7 21.7 27.5 20.4 28 19C24.5 17.6 22.3 15 20.5 15.5Z" fill="black"/>
                    <path d="M17.4 3.5C18.2 2.5 18.7 1.3 18.6 0C17.4 0.1 16 0.7 15.1 1.7C14.2 2.6 13.6 3.9 13.7 5.1C15 5.1 16.5 4.5 17.4 3.5Z" fill="black"/>
                  </svg>
                </AppIcon>
                <AppText>
                  <AppSmallText>Descárgala en</AppSmallText>
                  <AppBigText>App Store</AppBigText>
                </AppText>
              </AppButton>
              
              <AppButton href="#" target="_blank" rel="noopener noreferrer">
                <AppIcon>
                  <svg width="25" height="28" viewBox="0 0 25 28" fill="none">
                    <path d="M1.5 1.3C1.2 1.7 1 2.3 1 3V25C1 25.7 1.2 26.3 1.5 26.7L1.6 26.8L14.5 14V13.9L1.6 1.2L1.5 1.3Z" fill="#2196F3"/>
                    <path d="M19.3 18.7L14.5 14V13.9L19.3 9.2L19.4 9.3L25 12.5C26.7 13.4 26.7 14.8 25 15.7L19.4 18.6L19.3 18.7Z" fill="#FFC107"/>
                    <path d="M19.4 18.6L14.5 13.9L1.5 26.7C2.1 27.3 3 27.4 4.1 26.8L19.4 18.6" fill="#F44336"/>
                    <path d="M19.4 9.3L4.1 1.1C3 0.5 2.1 0.6 1.5 1.2L14.5 13.9L19.4 9.3Z" fill="#00C853"/>
                  </svg>
                </AppIcon>
                <AppText>
                  <AppSmallText>Disponible en</AppSmallText>
                  <AppBigText>Google Play</AppBigText>
                </AppText>
              </AppButton>
            </AppButtons>
          </TextContent>
          
          <ImageContent
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img src="/images/app-mockup.png" alt="Aplicación móvil Boleteria" />
          </ImageContent>
        </Content>
      </Container>
    </Section>
  );
};

export default CallToAction;