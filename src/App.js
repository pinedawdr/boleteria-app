// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/Theme';
import Landing from './pages/Landing';
import TicketPage from './pages/TicketPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/evento/:id" element={<TicketPage />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;