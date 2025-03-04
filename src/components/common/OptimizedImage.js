// src/components/common/OptimizedImage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  overflow: hidden;
  background-color: #f0f0f0; /* Placeholder color */
  border-radius: ${props => props.borderRadius || '0'};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit || 'cover'};
  object-position: ${props => props.objectPosition || 'center'};
  opacity: ${props => props.loaded ? 1 : 0};
  transition: opacity 0.5s ease;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.5s ease;
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
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

const OptimizedImage = ({ 
  src, 
  alt, 
  height, 
  borderRadius, 
  objectFit, 
  objectPosition,
  lazy = true,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Reiniciar estados si cambia la fuente
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);
  
  const handleLoad = () => {
    setLoaded(true);
  };
  
  const handleError = () => {
    setError(true);
    setLoaded(true); // Para ocultar el spinner
  };
  
  return (
    <ImageContainer height={height} borderRadius={borderRadius}>
      <StyledImage 
        src={src} 
        alt={alt || "Imagen"} 
        onLoad={handleLoad}
        onError={handleError}
        loaded={loaded}
        objectFit={objectFit}
        objectPosition={objectPosition}
        loading={lazy ? "lazy" : "eager"}
        {...props}
      />
      <Placeholder visible={!loaded}>
        <Spinner />
      </Placeholder>
    </ImageContainer>
  );
};

export default OptimizedImage;