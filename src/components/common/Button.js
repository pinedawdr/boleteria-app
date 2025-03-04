// src/components/common/Button.js 
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  background: ${props => props.theme.gradients.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.round};
  padding: 12px 28px;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.md};
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};
  box-shadow: none; /* Eliminadas las sombras */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.gradients.secondary};
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  &:hover {
    box-shadow: none; /* Sin sombra en hover */
    transform: translateY(-2px);
    
    &:before {
      opacity: 1;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: translateY(0);
    
    &:before {
      opacity: 0;
    }
  }

  ${props => props.secondary && `
    background: none;
    background-color: white;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};
    box-shadow: none;
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    &:before {
      display: none;
    }

    &:hover {
      background-color: ${props.theme.colors.backgroundAlt};
      box-shadow: none;
      color: ${props.theme.colors.primary};
    }
  `}

  ${props => props.outline && `
    background: none;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};
    box-shadow: none;
    
    &:before {
      display: none;
    }

    &:hover {
      background-color: rgba(235, 0, 75, 0.1);
      box-shadow: none;
      color: ${props.theme.colors.primary};
    }
  `}

  ${props => props.fullWidth && `
    width: 100%;
  `}

  ${props => props.size === 'small' && `
    padding: 8px 20px;
    font-size: ${props.theme.typography.fontSize.sm};
  `}

  ${props => props.size === 'large' && `
    padding: 14px 32px;
    font-size: ${props.theme.typography.fontSize.lg};
  `}
  
  ${props => props.iconPosition === 'right' && `
    flex-direction: row-reverse;
  `}
`;

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = ({ 
  children, 
  onClick, 
  secondary, 
  outline,
  fullWidth, 
  size, 
  type = 'button',
  disabled,
  icon,
  iconPosition,
  ...props 
}) => {
  return (
    <StyledButton
      onClick={onClick}
      secondary={secondary}
      outline={outline}
      fullWidth={fullWidth}
      size={size}
      type={type}
      disabled={disabled}
      iconPosition={iconPosition}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && <ButtonIcon className="button-icon">{icon}</ButtonIcon>}
      {children}
    </StyledButton>
  );
};

export default Button;