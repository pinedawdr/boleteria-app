// src/styles/Theme.js
const theme = {
  colors: {
    // Color principal - rojo moderno con toque rosado
    primary: '#ff3366',
    // Colores secundarios complementarios
    secondary: '#ff6b8b',
    tertiary: '#fd8c9e',
    // Fondos
    background: '#f8f9fa',
    backgroundAlt: '#ffffff',
    // Fondo moderno - reemplazo del azul oscuro
    darkBg: '#2d3436',
    accentBg: '#fd79a8',
    neutralBg: '#dfe6e9',
    // Textos
    text: '#2d3436',
    textLight: '#636e72',
    // Otros colores
    border: '#e9ecef',
    success: '#00b894',
    warning: '#fdcb6e',
    error: '#ff5252',
  },
  gradients: {
    // Gradiente principal - rojo a rosa moderno
    primary: 'linear-gradient(45deg, #ff3366, #fd79a8)',
    // Gradiente secundario - variación del principal
    secondary: 'linear-gradient(45deg, #fd79a8, #ff6b8b, #ff3366)',
    // Fondos con degradado
    modern: 'linear-gradient(135deg, #2d3436, #636e72, #81ecec)',
    subtle: 'linear-gradient(135deg, #dfe6e9, #f8f9fa)',
    vibrant: 'linear-gradient(135deg, #ff3366, #fd79a8, #ff6b8b)',
    // Efectos de vidrio
    glass: 'linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0))',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)',
    button: '0 10px 25px rgba(255, 51, 102, 0.4)',
    buttonHover: '0 15px 30px rgba(255, 51, 102, 0.6)',
    card: '0 10px 30px rgba(0, 0, 0, 0.1)',
    nav: '0 10px 30px rgba(0, 0, 0, 0.15)',
    glow: '0 0 20px rgba(255, 51, 102, 0.5)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '30px',
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
    '5xl': '128px',
  },
  transitions: {
    fast: '0.2s ease',
    default: '0.3s ease',
    slow: '0.5s ease',
  },
  effects: {
    glassmorphism: `
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `,
    glow: `
      box-shadow: 0 0 25px rgba(255, 51, 102, 0.5);
    `,
    softShadow: `
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    `,
    frostedGlass: `
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    `,
  }
};

export default theme;