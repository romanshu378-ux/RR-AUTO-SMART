
import React, { useState, useEffect } from 'react';
import { Service, Project } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { PROJECTS } from '../constants';
import { ServiceSkeleton, LoadingSpinner } from '../components/LoadingUI';

const Services: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await apiService.services.getAll();
        setServices(data);
      } catch (e) {
        console.error("API Failure: Could not load services");
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleRequestQuote = async (serviceName: string) => {
    if (!isAuthenticated) {
      alert("Authentication Required: Access denied. Redirecting to terminal login.");
      navigate('/login');
      return;
    }

    setSubmittingId(serviceName);
    try {
      await apiService.quotes.create({
        userId: user?.id,
        serviceType: serviceName,
        description: `API Generated request for ${serviceName}`
      });
      navigate('/dashboard');
    } catch (e) {
      alert("Critical Error: Synchronous failure in API request.");
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <section className="py-20 bg-brand-secondary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" className="object-cover w-full h-full" alt="Grid" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-black mb-6 tracking-tight">Our Core Ecosystem</h1>
          <div className="w-24 h-1 bg-brand-accent mb-8"></div>
          <p className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed">
            Scalable, secure, and future-proof automation solutions built on enterprise-grade IoT architectures.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-32">
            {loading ? (
              <>
                <ServiceSkeleton />
                <ServiceSkeleton />
              </>
            ) : (
              services.map((service, idx) => (
                <div key={service.id} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20`}>
                  <div className="w-full lg:w-1/2 group">
                    <div className="relative overflow-hidden shadow-2xl rounded-sm">
                      <img src={service.image} alt={service.title} className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-all"></div>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="inline-block px-4 py-2 bg-slate-100 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] mb-6 rounded-sm">
                      {service.id.replace('-', ' ')}
                    </div>
                    <h2 className="text-4xl font-bold text-brand-secondary mb-6 tracking-tight">{service.title}</h2>
                    <p className="text-lg text-slate-500 leading-relaxed mb-10 font-light">
                      {service.description} Our implementation ensures zero-latency performance and bank-grade encryption across all localized nodes.
                    </p>
                    <button 
                      onClick={() => handleRequestQuote(service.title)}
                      disabled={!!submittingId}
                      className="bg-brand-primary text-white min-w-[280px] px-10 py-4 font-bold text-xs tracking-[0.2em] hover:bg-brand-accent transition-all shadow-xl rounded-sm flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {submittingId === service.title ? (
                        <>
                          <LoadingSpinner size="sm" color="border-white" />
                          ESTABLISHING LINK...
                        </>
                      ) : (
                        'DEPLOY SYSTEM INTEGRATION'
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Section Placeholder - Logical Anchor */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <h6 className="text-brand-accent font-black text-[10px] tracking-[0.4em] uppercase mb-4">INTEGRATION ADVANTAGE</h6>
          <h2 className="text-4xl font-black text-brand-secondary mb-16 tracking-tight">Why Choose Our Solutions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { title: 'End-to-End Security', desc: 'Hardware-level encryption and secure cloud tunneling for all data streams.' },
              { title: 'Extreme Scalability', desc: 'Modular architecture designed to grow from local nodes to global networks.' },
              { title: 'Real-time Intelligence', desc: 'Edge computing capabilities for instantaneous decision making and control.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                  <i className={`fa-solid ${['fa-shield-halved', 'fa-up-right-and-down-left-from-center', 'fa-bolt'][i]}`}></i>
                </div>
                <h4 className="font-bold text-brand-secondary mb-4">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h6 className="text-brand-accent font-black text-[10px] tracking-[0.4em] uppercase mb-4">PORTFOLIO EXCELLENCE</h6>
              <h2 className="text-4xl font-black text-brand-secondary tracking-tight">Featured Projects</h2>
            </div>
            <p className="text-slate-500 max-w-md text-sm font-medium leading-relaxed">
              Explore our most recent successful deployments across residential, commercial, and industrial sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                onClick={() => navigate('/services')}
                className="group relative cursor-pointer overflow-hidden rounded-sm bg-brand-secondary aspect-[3/4]"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-transparent to-transparent opacity-90"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="text-[10px] font-black text-brand-accent tracking-[0.3em] uppercase mb-2 block">
                    {project.category}
                  </span>
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    {project.title}
                  </h4>
                  <div className="mt-4 h-1 w-0 bg-brand-accent transition-all duration-500 group-hover:w-16"></div>
                </div>

                <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
