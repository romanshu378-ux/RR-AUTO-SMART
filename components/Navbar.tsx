
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_DETAILS } from '../constants';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SERVICES', path: '/services' },
    { name: 'CONTACT US', path: '/contact' }
  ];

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className={`hidden md:block py-2 transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'bg-brand-secondary text-white border-b border-white/10'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-[11px] font-bold tracking-widest">
          <div className="flex items-center space-x-6 uppercase">
            <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="flex items-center hover:text-brand-accent transition-colors">
              <i className="fa-solid fa-phone mr-2 text-brand-accent"></i> {COMPANY_DETAILS.phone}
            </a>
            <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center hover:text-brand-accent transition-colors">
              <i className="fa-solid fa-envelope mr-2 text-brand-accent"></i> {COMPANY_DETAILS.email}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">FOLLOW US:</span>
            <a href="#" className="hover:text-brand-accent transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="hover:text-brand-accent transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-xl py-3' : 'bg-white/95 py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-brand-primary rounded-sm flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:bg-brand-accent transition-colors">RR</div>
            <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-brand-secondary leading-none uppercase">RR AUTO SMART</span>
                <span className="text-[9px] tracking-[0.3em] font-bold text-brand-accent uppercase">IoT Experts India</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[12px] font-bold tracking-widest transition-all duration-200 hover:text-brand-accent relative py-2 group ${location.pathname === link.path ? 'text-brand-accent' : 'text-brand-secondary'}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-accent transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
            
            {isAuthenticated ? (
               <Link to="/dashboard" className="bg-brand-primary text-white px-8 py-3 rounded-sm text-xs font-bold tracking-widest hover:bg-brand-accent transition-all shadow-md">
                 DASHBOARD
               </Link>
            ) : (
               <Link to="/login" className="bg-brand-accent text-white px-8 py-3 rounded-sm text-xs font-bold tracking-widest hover:bg-brand-secondary transition-all shadow-md">
                 CLIENT LOGIN
               </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-brand-secondary" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen border-t' : 'max-h-0'}`}>
          <div className="flex flex-col p-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold tracking-widest ${location.pathname === link.path ? 'text-brand-accent' : 'text-brand-secondary'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to={isAuthenticated ? "/dashboard" : "/login"} 
              onClick={() => setIsOpen(false)}
              className="bg-brand-accent text-white py-4 rounded-sm font-bold text-center tracking-widest"
            >
              {isAuthenticated ? "DASHBOARD" : "CLIENT LOGIN"}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
