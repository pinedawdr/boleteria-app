// src/context/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AppContext = createContext();

// Datos simulados para eventos
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Festival de música electrónica 2025",
    image: "/images/event1.jpg",
    category: "Concierto",
    date: "15 Jul 2025",
    time: "18:00",
    location: "Arena Lima Norte",
    price: "120.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Partido final de la Copa Nacional",
    image: "/images/event2.jpg",
    category: "Deporte",
    date: "20 Jun 2025",
    time: "15:30",
    location: "Estadio Nacional",
    price: "85.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 3,
    title: "Romeo y Julieta - Obra clásica",
    image: "/images/event3.jpg",
    category: "Teatro",
    date: "10 Ago 2025",
    time: "19:00",
    location: "Teatro Municipal",
    price: "75.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Exposición de arte contemporáneo",
    image: "/images/event4.jpg",
    category: "Exposición",
    date: "05 Sep 2025",
    time: "10:00",
    location: "Galería de Arte Moderna",
    price: "35.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Festival gastronómico internacional",
    image: "/images/event5.jpg",
    category: "Festival",
    date: "25 Jul 2025",
    time: "12:00",
    location: "Parque de la Exposición",
    price: "50.00",
    isFeatured: true,
    isFavorite: false,
  },
  {
    id: 6,
    title: "Stand-up comedy con grandes comediantes",
    image: "/images/event6.jpg",
    category: "Comedia",
    date: "18 Jun 2025",
    time: "20:00",
    location: "Centro de Convenciones",
    price: "60.00",
    isFeatured: true,
    isFavorite: false,
  },
];

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // Cargar datos guardados al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedCart = localStorage.getItem('cart');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  // Guardar datos cuando cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Función para buscar eventos
  const searchEvents = (query, filters = {}) => {
    setIsLoading(true);
    
    // Simular búsqueda con tiempo de respuesta
    setTimeout(() => {
      const results = events.filter(event => {
        // Búsqueda por texto
        const matchesQuery = query 
          ? event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.location.toLowerCase().includes(query.toLowerCase())
          : true;
          
        // Filtro por categoría
        const matchesCategory = filters.category 
          ? event.category.toLowerCase() === filters.category.toLowerCase()
          : true;
          
        // Filtro por ubicación
        const matchesLocation = filters.location
          ? event.location.toLowerCase().includes(filters.location.toLowerCase())
          : true;
          
        return matchesQuery && matchesCategory && matchesLocation;
      });
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };
  
  // Función para añadir/quitar favoritos
  const toggleFavorite = (eventId) => {
    if (favorites.includes(eventId)) {
      setFavorites(favorites.filter(id => id !== eventId));
    } else {
      setFavorites([...favorites, eventId]);
    }
    
    // Actualizar también el estado de los eventos
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, isFavorite: !event.isFavorite }
        : event
    ));
  };
  
  // Función para añadir al carrito
  const addToCart = (ticket) => {
    setCart([...cart, ticket]);
  };
  
  // Función para eliminar del carrito
  const removeFromCart = (ticketId) => {
    setCart(cart.filter(ticket => ticket.id !== ticketId));
  };
  
  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  // Valores que estarán disponibles en el contexto
  const contextValue = {
    events,
    favorites,
    cart,
    user,
    isLoading,
    searchResults,
    searchEvents,
    toggleFavorite,
    addToCart,
    removeFromCart,
    login,
    logout
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};

export default AppContext;