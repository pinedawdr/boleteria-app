// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/Theme';
import { AppProvider } from './context/AppContext';
import Landing from './pages/Landing';
import TicketPage from './pages/TicketPage';
import TravelPage from './pages/TravelPage';
import TravelSeatSelectionPage from './pages/TravelSeatSelectionPage';
import TravelConfirmationPage from './pages/TravelConfirmationPage';

// Otras páginas placeholder
const Events = () => <div>Página de eventos</div>;
const CategoryPage = () => <div>Página de categoría</div>;
const PromoPage = () => <div>Página de promociones</div>;
const AboutPage = () => <div>Página de nosotros</div>;
const ContactPage = () => <div>Página de contacto</div>;
const LoginPage = () => <div>Página de inicio de sesión</div>;
const NotFoundPage = () => <div>Página no encontrada</div>;

function App() {
  // Analytics y seguimiento (simulado)
  useEffect(() => {
    const trackPageView = (url) => {
      console.log('Página vista:', url);
      // Aquí iría el código real de analytics
    };
    
    // Trackear la página inicial
    trackPageView(window.location.pathname);
    
    // Configurar el trackeo de cambios de página
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppProvider>
        <Router>
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<Landing />} />
            <Route path="/eventos" element={<Events />} />
            <Route path="/evento/:id" element={<TicketPage />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
            <Route path="/promociones" element={<PromoPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/ingresar" element={<LoginPage />} />
            <Route path="/pasajes" element={<TravelPage />} />
            <Route path="/pasajes/seleccion-asientos/:tripId" element={<TravelSeatSelectionPage />} />
            <Route path="/pasajes/confirmacion" element={<TravelConfirmationPage />} />
            <Route path="/evento/:id" element={<TicketPage />} />
            
            {/* Página 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;