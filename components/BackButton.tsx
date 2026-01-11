
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [settings, setSettings] = useState({ enabled: true, text: 'Back' });

  useEffect(() => {
    // Simulated global settings check
    const savedSettings = localStorage.getItem('autosmart_global_settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings({
        enabled: parsed.backButtonEnabled ?? true,
        text: parsed.backButtonText ?? 'Back'
      });
    }
  }, []);

  // Don't show on the root home page
  if (!settings.enabled || location.pathname === '/' ) return null;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback logic
      if (location.pathname.includes('/dashboard')) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="container mx-auto px-6 pt-4 pb-2">
      <button
        onClick={handleBack}
        className="group flex items-center space-x-2 text-slate-500 hover:text-brand-primary transition-colors duration-200 py-2 px-4 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md text-xs font-bold tracking-widest"
        aria-label="Go back"
      >
        <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
        <span>{settings.text.toUpperCase()}</span>
      </button>
    </div>
  );
};

export default BackButton;
