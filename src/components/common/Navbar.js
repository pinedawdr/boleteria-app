// src/components/common/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import Button from './Button';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.transparent ? 'transparent' : props.theme.colors.backgroundAlt};
  transition: all ${props => props.theme.transitions.default};
  box-shadow: ${props => props.scrolled ? props.theme.shadows.small : 'none'};
  padding: ${props => props.scrolled ? '12px 0' : '20px 0'};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 15px 0;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.transparent ? 'white' : props.theme.colors.primary};
  
  span {
    background: ${props => props.theme.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  margin: 0 16px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.active 
    ? props.theme.colors.primary 
    : props.transparent
      ? 'white'
      : props.theme.colors.text};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: -4px;
    left: 0;
    background: ${props => props.theme.gradients.primary};
    transition: width ${props => props.theme.transitions.default};
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.transparent ? 'white' : props.theme.colors.text};
  padding: 8px;
  border-radius: 50%;
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.transparent ? 'white' : props.theme.colors.text};
  font-size: 24px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  box-shadow: ${props => props.theme.shadows.large};
  display: flex;
  flex-direction: column;
  padding: 24px;
  z-index: 1001;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
`;

const MobileNavLink = styled(Link)`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Navbar = ({ transparent = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <NavbarContainer transparent={transparent && !scrolled} scrolled={scrolled}>
        <NavContent>
          <Logo to="/" transparent={transparent && !scrolled}>
            <span>Boleteria</span>
          </Logo>
          
          <NavLinks>
            <NavLink to="/" active={isActive('/')} transparent={transparent && !scrolled}>
              Inicio
            </NavLink>
            <NavLink to="/eventos" active={isActive('/eventos')} transparent={transparent && !scrolled}>
              Eventos
            </NavLink>
            <NavLink to="/promociones" active={isActive('/promociones')} transparent={transparent && !scrolled}>
              Promociones
            </NavLink>
            <NavLink to="/nosotros" active={isActive('/nosotros')} transparent={transparent && !scrolled}>
              Nosotros
            </NavLink>
            <NavLink to="/contacto" active={isActive('/contacto')} transparent={transparent && !scrolled}>
              Contacto
            </NavLink>
          </NavLinks>
          
          <NavActions>
            <IconButton transparent={transparent && !scrolled}>
              <FiSearch size={20} />
            </IconButton>
            <IconButton transparent={transparent && !scrolled}>
              <FiUser size={20} />
            </IconButton>
            <IconButton transparent={transparent && !scrolled}>
              <FiShoppingCart size={20} />
            </IconButton>
            <Button size="small">
              Ingresar
            </Button>
          </NavActions>
          
          <MobileMenuButton 
            transparent={transparent && !scrolled}
            onClick={() => setMobileMenuOpen(true)}
          >
            <FiMenu size={24} />
          </MobileMenuButton>
        </NavContent>
      </NavbarContainer>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <MobileMenuHeader>
                <Logo to="/">
                  <span>Boleteria</span>
                </Logo>
                <IconButton onClick={() => setMobileMenuOpen(false)}>
                  <FiX size={24} />
                </IconButton>
              </MobileMenuHeader>
              
              <MobileNavLinks>
                <MobileNavLink to="/" active={isActive('/')}>
                  Inicio
                </MobileNavLink>
                <MobileNavLink to="/eventos" active={isActive('/eventos')}>
                  Eventos
                </MobileNavLink>
                <MobileNavLink to="/promociones" active={isActive('/promociones')}>
                  Promociones
                </MobileNavLink>
                <MobileNavLink to="/nosotros" active={isActive('/nosotros')}>
                  Nosotros
                </MobileNavLink>
                <MobileNavLink to="/contacto" active={isActive('/contacto')}>
                  Contacto
                </MobileNavLink>
              </MobileNavLinks>
              
              <Button fullWidth>
                Ingresar
              </Button>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;