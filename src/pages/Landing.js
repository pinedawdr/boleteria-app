// src/pages/Landing.js
import React, { useEffect } from 'react';
import Hero from '../components/landing/Hero';
import FeaturedEvents from '../components/landing/FeaturedEvents';
import Categories from '../components/landing/Categories';
import UpcomingEvents from '../components/landing/UpcomingEvents';
import CallToAction from '../components/landing/CallToAction';
import Testimonials from '../components/landing/Testimonials';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Landing = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar transparent />
      <Hero />
      <FeaturedEvents />
      <Categories />
      <UpcomingEvents />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Landing;