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
  box-shadow: ${props => props.theme.shadows.button};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.buttonHover};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: translateY(0);
  }

  ${props => props.secondary && `
    background: white;
    color: ${props.theme.colors.primary};
    border: 2px solid ${props.theme.colors.primary};
    box-shadow: none;

    &:hover {
      background: ${props.theme.colors.backgroundAlt};
      box-shadow: ${props.theme.shadows.small};
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
`;

const Button = ({ 
  children, 
  onClick, 
  secondary, 
  fullWidth, 
  size, 
  type = 'button',
  disabled,
  icon,
  ...props 
}) => {
  return (
    <StyledButton
      onClick={onClick}
      secondary={secondary}
      fullWidth={fullWidth}
      size={size}
      type={type}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </StyledButton>
  );
};

export default Button;