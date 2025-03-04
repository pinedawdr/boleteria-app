// src/components/common/Footer.js - Actualizado con nuevo esquema de colores
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: ${props => props.theme.gradients.footer};
  color: ${props => props.theme.colors.footerText};
  padding: 70px 0 30px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled(Link)`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: 20px;
  display: block;

  span {
    background: ${props => props.theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterDescription = styled.p`
  margin-bottom: 25px;
  opacity: 0.8;
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.6;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background: ${props => props.theme.gradients.primary};
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 25px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 40px;
    height: 2px;
    background: ${props => props.theme.gradients.primary};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.footerText};
  opacity: 0.8;
  transition: all ${props => props.theme.transitions.default};
  font-size: ${props => props.theme.typography.fontSize.sm};
  
  &:hover {
    opacity: 1;
    color: ${props => props.theme.colors.primary};
    padding-left: 5px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 15px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  opacity: 0.8;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  opacity: 0.8;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterBottomLink = styled(Link)`
  color: ${props => props.theme.colors.footerText};
  opacity: 0.8;
  font-size: ${props => props.theme.typography.fontSize.sm};
  
  &:hover {
    opacity: 1;
    color: ${props => props.theme.colors.primary};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo to="/">
            <span>Boleteria</span>
          </FooterLogo>
          <FooterDescription>
            La plataforma de venta de boletos más completa del país. Encuentra todos los eventos y pasajes que buscas en un solo lugar.
          </FooterDescription>
          <SocialIcons>
            <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
              <FiFacebook size={18} />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
              <FiTwitter size={18} />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
              <FiInstagram size={18} />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" target="_blank" aria-label="Youtube">
              <FiYoutube size={18} />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </SocialIcon>
          </SocialIcons>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Enlaces rápidos</FooterTitle>
          <FooterLinks>
            <FooterLink to="/eventos">Eventos</FooterLink>
            <FooterLink to="/pasajes">Pasajes</FooterLink>
            <FooterLink to="/promociones">Promociones</FooterLink>
            <FooterLink to="/calendario">Calendario</FooterLink>
            <FooterLink to="/nosotros">Sobre nosotros</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Categorías</FooterTitle>
          <FooterLinks>
            <FooterLink to="/categoria/conciertos">Conciertos</FooterLink>
            <FooterLink to="/categoria/deportes">Deportes</FooterLink>
            <FooterLink to="/categoria/teatro">Teatro</FooterLink>
            <FooterLink to="/categoria/festivales">Festivales</FooterLink>
            <FooterLink to="/categoria/familia">Familiar</FooterLink>
            <FooterLink to="/pasajes/bus">Buses</FooterLink>
            <FooterLink to="/pasajes/barco">Embarcaciones</FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Contacto</FooterTitle>
          <ContactItem>
            <strong>Dirección:</strong> Cusco - Perú
          </ContactItem>
          <ContactItem>
            <strong>Teléfono:</strong> +51 (01) 123-4567
          </ContactItem>
          <ContactItem>
            <strong>Email:</strong> info@boleteria.com
          </ContactItem>
          <ContactItem>
            <strong>Horario:</strong> Lun - Vie, 9:00 - 18:00
          </ContactItem>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          © {new Date().getFullYear()} Boleteria. Todos los derechos reservados.
        </Copyright>
        <FooterBottomLinks>
          <FooterBottomLink to="/terminos">Términos de servicio</FooterBottomLink>
          <FooterBottomLink to="/privacidad">Política de privacidad</FooterBottomLink>
        </FooterBottomLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;