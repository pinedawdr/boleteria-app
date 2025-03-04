// src/components/landing/Categories.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMusic, 
  FiActivity, 
  FiFilm, 
  FiUsers, 
  FiBook, 
  FiGlobe
} from 'react-icons/fi';

// Datos de ejemplo para categorías
const CATEGORIES = [
  {
    id: 1,
    title: 'Conciertos',
    icon: <FiMusic size={40} />,
    description: 'Encuentra los mejores conciertos y eventos musicales.',
    count: 245,
    color: '#FF3366'
  },
  {
    id: 2,
    title: 'Deportes',
    icon: <FiActivity size={40} />,
    description: 'Los eventos deportivos más importantes de la temporada.',
    count: 189,
    color: '#33A1FD'
  },
  {
    id: 3,
    title: 'Teatro',
    icon: <FiFilm size={40} />,
    description: 'Obras de teatro, musicales y espectáculos en vivo.',
    count: 132,
    color: '#6C5CE7'
  },
  {
    id: 4,
    title: 'Familia',
    icon: <FiUsers size={40} />,
    description: 'Eventos para disfrutar con toda la familia.',
    count: 95,
    color: '#00B894'
  },
  {
    id: 5,
    title: 'Exposiciones',
    icon: <FiBook size={40} />,
    description: 'Arte, ciencia, historia y mucho más para explorar.',
    count: 78,
    color: '#FDCB6E'
  },
  {
    id: 6,
    title: 'Festivales',
    icon: <FiGlobe size={40} />,
    description: 'Festivales culturales, gastronómicos y más.',
    count: 112,
    color: '#FF7675'
  }
];

const Section = styled.section`
  padding: 100px 0;
  background-color: ${props => props.theme.colors.backgroundAlt};
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(motion(Link))`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 30px;
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all ${props => props.theme.transitions.default};
  position: relative;
  overflow: hidden;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.large};
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${props => props.color};
  }
`;

const IconWrapper = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: ${props => `${props.color}15`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${props => props.color};
`;

const CategoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 12px;
  color: ${props => props.theme.colors.text};
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 20px;
  flex-grow: 1;
`;

const EventCount = styled.div`
  font-size: 0.85rem;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  padding: 6px 12px;
  border-radius: ${props => props.theme.borderRadius.round};
  background-color: ${props => `${props.color}15`};
  color: ${props => props.color};
`;

const Categories = () => {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Explora por Categorías</SectionTitle>
          <SectionSubtitle>
            Encuentra el tipo de evento perfecto para ti entre nuestras diversas categorías
          </SectionSubtitle>
        </SectionHeader>
        
        <CategoriesGrid>
          {CATEGORIES.map(category => (
            <CategoryCard 
              key={category.id}
              to={`/categoria/${category.title.toLowerCase()}`}
              color={category.color}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <IconWrapper color={category.color}>
                {category.icon}
              </IconWrapper>
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryDescription>{category.description}</CategoryDescription>
              <EventCount color={category.color}>
                {category.count} eventos
              </EventCount>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Container>
    </Section>
  );
};

export default Categories;