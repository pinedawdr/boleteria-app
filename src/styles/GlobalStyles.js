// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: 16px;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: ${props => props.theme.transitions.default};
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: 'Poppins', sans-serif;
  }

  input, textarea, select {
    font-family: 'Poppins', sans-serif;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
  }

  p {
    margin-bottom: 1rem;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.25rem;
  }

  .section {
    padding: 5rem 0;
  }

  .section-title {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.typography.fontSize['2xl']};
    }
  }

  .section-subtitle {
    font-size: ${props => props.theme.typography.fontSize.lg};
    margin-bottom: 3rem;
    text-align: center;
    color: ${props => props.theme.colors.textLight};
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.typography.fontSize.md};
      margin-bottom: 2rem;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(235, 0, 75, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(235, 0, 75, 0.5);
  }

  /* Helper classes */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  .text-primary { color: ${props => props.theme.colors.primary}; }
  .text-secondary { color: ${props => props.theme.colors.secondary}; }
  .text-light { color: ${props => props.theme.colors.textLight}; }

  .bg-primary { background-color: ${props => props.theme.colors.primary}; }
  .bg-light { background-color: ${props => props.theme.colors.background}; }
  .bg-white { background-color: ${props => props.theme.colors.backgroundAlt}; }

  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 2rem; }
  .mb-5 { margin-bottom: 2.5rem; }

  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 1.5rem; }
  .mt-4 { margin-top: 2rem; }
  .mt-5 { margin-top: 2.5rem; }

  .py-1 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-2 { padding-top: 1rem; padding-bottom: 1rem; }
  .py-3 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
  .py-4 { padding-top: 2rem; padding-bottom: 2rem; }
  .py-5 { padding-top: 2.5rem; padding-bottom: 2.5rem; }

  .px-1 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .px-2 { padding-left: 1rem; padding-right: 1rem; }
  .px-3 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .px-4 { padding-left: 2rem; padding-right: 2rem; }
  .px-5 { padding-left: 2.5rem; padding-right: 2.5rem; }
`;

export default GlobalStyles;