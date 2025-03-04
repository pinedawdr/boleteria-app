// src/components/common/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart, FiHeart, FiChevronDown } from 'react-icons/fi';
import Button from './Button';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.transparent ? 'transparent' : props.theme.colors.backgroundAlt};
  transition: all 0.4s ease;
  box-shadow: ${props => props.scrolled ? props.theme.shadows.small : 'none'};
  padding: ${props => props.scrolled ? '12px 0' : '20px 0'};
  backdrop-filter: ${props => props.scrolled && !props.transparent ? 'blur(10px)' : 'none'};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.scrolled && !props.transparent ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
    z-index: -1;
  }
  
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
  z-index: 1001;
  
  span {
    background: ${props => props.transparent ? 'white' : props.theme.gradients.primary};
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

const NavLink = styled.a`
  margin: 0 16px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.active 
    ? props.theme.colors.primary 
    : props.transparent
      ? 'white'
      : props.theme.colors.text};
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    bottom: -4px;
    left: 0;
    background: ${props => props.theme.gradients.primary};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  margin: 0 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.active 
    ? props.theme.colors.primary 
    : props.transparent
      ? 'white'
      : props.theme.colors.text};
  cursor: pointer;
  
  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(-180deg)' : 'rotate(0)'};
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 10px 0;
  min-width: 180px;
  margin-top: 15px;
  
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background-color: white;
  }
`;

const DropdownItem = styled.a`
  display: block;
  padding: 8px 20px;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
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
  position: relative;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
  
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    background: ${props => props.theme.gradients.primary};
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.transparent ? 'white' : props.theme.colors.text};
  font-size: 24px;
  z-index: 1001;
  
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

const MobileNavLink = styled.a`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  cursor: pointer;
`;

const MobileDropdownContainer = styled.div`
  position: relative;
`;

const MobileDropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  cursor: pointer;
  padding: 0 0 8px 0;
`;

const MobileDropdownContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0 8px 16px;
`;

const MobileDropdownItem = styled.a`
  color: ${props => props.theme.colors.textLight};
  font-size: ${props => props.theme.typography.fontSize.md};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SearchBar = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 20px;
  z-index: 1000;
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  align-items: center;
  gap: 10px;
  
  input {
    flex: 1;
    border: none;
    background: none;
    padding: 10px;
    font-size: ${props => props.theme.typography.fontSize.md};
    outline: none;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.colors.text};
    font-size: 24px;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

// Datos de las categorías 
const CATEGORIES = [
  { title: "Conciertos", section: "events-section" },
  { title: "Deportes", section: "categories-section" },
  { title: "Teatro", section: "events-section" },
  { title: "Festivales", section: "events-section" },
  { title: "Familiar", section: "categories-section" },
  { title: "Exposiciones", section: "categories-section" }
];

// Datos de las secciones de navegación
const NAV_SECTIONS = [
  { title: "Inicio", section: "hero-section" },
  { title: "Eventos", section: "events-section" },
  { title: "Categorías", section: "categories-section" },
  { title: "Próximos", section: "upcoming-section" },
  { title: "Testimonios", section: "testimonials-section" },
];

const Navbar = ({ transparent = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("hero-section");
  const categoriesRef = useRef(null);
  
  // Detectar scroll para cambiar apariencia del navbar y detectar sección activa
  useEffect(() => {
    const handleScroll = () => {
      // Cambiar apariencia del navbar
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Detectar sección activa
      const scrollPosition = window.scrollY + 100; // Offset para mejor detección
      
      // Obtener todas las secciones
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Cerrar dropdown de categorías al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Verificar si una sección está activa
  const isActive = (sectionId) => {
    return activeSection === sectionId;
  };
  
  // Manejar el scroll a una sección
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Cerrar menús abiertos
      setMobileMenuOpen(false);
      setCategoriesOpen(false);
      
      // Desplazarse suavemente a la sección
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simular búsqueda desplazándose a la sección de eventos
      scrollToSection('events-section');
      setSearchBarOpen(false);
      setSearchQuery("");
      
      // Aquí podrías implementar una búsqueda real filtrando los eventos
      // y mostrando solo los que coinciden con la consulta
    }
  };
  
  return (
    <>
      <NavbarContainer transparent={transparent && !scrolled} scrolled={scrolled}>
        <NavContent>
          <Logo to="/" onClick={(e) => { e.preventDefault(); scrollToSection('hero-section'); }}>
            <span>Boleteria</span>
          </Logo>
          
          <NavLinks>
            {NAV_SECTIONS.map((navItem, index) => (
              <NavLink 
                key={index}
                onClick={() => scrollToSection(navItem.section)}
                active={isActive(navItem.section)} 
                transparent={transparent && !scrolled}
              >
                {navItem.title}
              </NavLink>
            ))}
          </NavLinks>
          
          <NavActions>
            <IconButton 
              transparent={transparent && !scrolled}
              onClick={() => setSearchBarOpen(true)}
            >
              <FiSearch size={20} />
            </IconButton>
            <IconButton transparent={transparent && !scrolled}>
              <FiHeart size={20} />
            </IconButton>
            <IconButton transparent={transparent && !scrolled}>
              <FiShoppingCart size={20} />
              <span className="badge">3</span>
            </IconButton>
            <Button size="small" onClick={() => scrollToSection('cta-section')}>
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
        {searchBarOpen && (
          <SearchBar
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Buscar eventos, artistas, lugares..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit">
                <FiSearch />
              </button>
              <button type="button" onClick={() => setSearchBarOpen(false)}>
                <FiX />
              </button>
            </form>
          </SearchBar>
        )}
      </AnimatePresence>
      
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
                <Logo onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('hero-section');
                  setMobileMenuOpen(false);
                }}>
                  <span>Boleteria</span>
                </Logo>
                <IconButton onClick={() => setMobileMenuOpen(false)}>
                  <FiX size={24} />
                </IconButton>
              </MobileMenuHeader>
              
              <MobileNavLinks>
                {NAV_SECTIONS.map((navItem, index) => (
                  <MobileNavLink 
                    key={index}
                    onClick={() => scrollToSection(navItem.section)}
                    active={isActive(navItem.section)}
                  >
                    {navItem.title}
                  </MobileNavLink>
                ))}
                
                <MobileDropdownContainer>
                  <MobileDropdownHeader 
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  >
                    <span>Categorías</span>
                    <FiChevronDown 
                      size={20} 
                      style={{ transform: mobileCategoriesOpen ? 'rotate(-180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}
                    />
                  </MobileDropdownHeader>
                  
                  <AnimatePresence>
                    {mobileCategoriesOpen && (
                      <MobileDropdownContent
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {CATEGORIES.map((category, index) => (
                          <MobileDropdownItem 
                            key={index} 
                            onClick={() => scrollToSection(category.section)}
                          >
                            {category.title}
                          </MobileDropdownItem>
                        ))}
                      </MobileDropdownContent>
                    )}
                  </AnimatePresence>
                </MobileDropdownContainer>
              </MobileNavLinks>
              
              <Button 
                fullWidth 
                onClick={() => {
                  scrollToSection('cta-section');
                  setMobileMenuOpen(false);
                }}
              >
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