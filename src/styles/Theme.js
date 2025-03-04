// src/styles/Theme.js 
const theme = {
  colors: {
    // Color principal
    primary: '#eb004b',
    // Colores secundarios - paleta moderna
    secondary: '#f5487f',
    tertiary: '#fd8c94',
    // Fondos
    background: '#f9fafb',
    backgroundAlt: '#ffffff',
    // Fondo moderno
    darkBg: '#1a202c',
    accentBg: '#eb004b',
    neutralBg: '#f1f5f9',
    // Textos
    text: '#1e293b',
    textLight: '#64748b',
    // Otros colores
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    
    // Color para footer
    footerBg: '#1a202c',
    footerText: '#f1f5f9',
  },
  gradients: {
    // Gradiente principal - más suave y moderno
    primary: 'linear-gradient(135deg, #eb004b, #f5487f)',
    // Gradiente secundario - variación del principal
    secondary: 'linear-gradient(135deg, #f5487f, #fd8c94)',
    // Fondos con degradado
    modern: 'linear-gradient(135deg, #1a202c, #334155)',
    subtle: 'linear-gradient(135deg, #f1f5f9, #f9fafb)',
    vibrant: 'linear-gradient(135deg, #eb004b, #f5487f, #fd8c94)',
    // Efectos de vidrio
    glass: 'linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
    // Gradiente para footer
    footer: 'linear-gradient(to right, #1a202c, #334155)',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    button: '0 4px 6px -1px rgba(235, 0, 75, 0.15), 0 2px 4px -1px rgba(235, 0, 75, 0.1)',
    buttonHover: '0 10px 15px -3px rgba(235, 0, 75, 0.2), 0 4px 6px -2px rgba(235, 0, 75, 0.15)',
    card: '0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.03)',
    nav: '0 4px 10px rgba(0, 0, 0, 0.08)',
    glow: '0 0 20px rgba(235, 0, 75, 0.25)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '9999px',
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
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
    fast: '0.15s ease',
    default: '0.3s ease',
    slow: '0.5s ease',
  },
  effects: {
    glassmorphism: `
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.12);
    `,
    glow: `
      box-shadow: 0 0 15px rgba(235, 0, 75, 0.3);
    `,
    softShadow: `
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.03), 0 4px 6px rgba(0, 0, 0, 0.02);
    `,
    frostedGlass: `
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    `,
  }
};

export default theme;