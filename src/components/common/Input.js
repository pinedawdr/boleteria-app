// src/components/common/Input.js
import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: 8px;
  color: ${props => props.theme.colors.text};
`;

const StyledInput = styled.input`
  border: 2px solid transparent;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 12px 16px;
  font-size: ${props => props.theme.typography.fontSize.md};
  background-image: linear-gradient(white, white), 
                    ${props => props.theme.gradients.primary};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  transition: all ${props => props.theme.transitions.default};
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.2);
    outline: none;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textLight};
    opacity: 0.7;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  ${props => props.error && `
    background-image: linear-gradient(white, white), 
                      linear-gradient(45deg, ${props.theme.colors.error}, ${props.theme.colors.error});
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.2);
    }
  `}
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-top: 5px;
`;

const Input = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  disabled,
  error,
  ...props 
}) => {
  return (
    <InputContainer>
      {label && <Label htmlFor={name}>{label}</Label>}
      <StyledInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        error={!!error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;