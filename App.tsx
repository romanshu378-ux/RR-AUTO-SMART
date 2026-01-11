
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Chatbot from './components/Chatbot';
import BackButton from './components/BackButton';
import { apiService } from './services/api';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  useEffect(() => {
    // Initialize Mock DB
    apiService.initDB();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      
      {/* Universal Navigation Spacer for Fixed Navbar */}
      {!isDashboard && <div className="h-[100px] md:h-[130px]"></div>}
      
      <main className="flex-grow">
        {!isDashboard && <BackButton />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      
      <Chatbot />
      {!isDashboard && <Footer />}
    </div>
  );
};

export default App;
