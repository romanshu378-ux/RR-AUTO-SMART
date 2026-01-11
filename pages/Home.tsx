
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COMPANY_DETAILS, PROJECTS } from '../constants';
import { apiService } from '../services/api';
import { Service } from '../types';

const Home: React.FC = () => {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      const data = await apiService.services.getAll();
      setFeaturedServices(data.slice(0, 3));
    };
    fetchHomeData();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2070" 
            alt="Infrastructure" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="max-w-4xl">
            <h5 className="text-brand-accent text-sm font-black tracking-[0.5em] uppercase mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
              NEXT-GEN CONNECTIVITY
            </h5>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-10 tracking-tighter animate-in fade-in slide-in-from-left-6 duration-1000">
              RR AUTO <br/>
              <span className="text-brand-accent">SMART</span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl font-light opacity-80 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Pioneering Industrial IoT and Smart Automation architectures in India. We engineer the hardware and software bridge for an autonomous future.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <Link to="/contact" className="bg-brand-accent text-white px-12 py-5 rounded-sm font-black text-xs tracking-[0.2em] hover:bg-white hover:text-brand-accent transition-all shadow-2xl text-center">
                INITIALIZE PROJECT
              </Link>
              <Link to="/services" className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-sm font-black text-xs tracking-[0.2em] hover:bg-white hover:text-brand-secondary transition-all text-center">
                EXPLORE STACK
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Services Overview */}
      <section className="py-32 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h6 className="text-brand-accent font-black text-[10px] tracking-[0.4em] uppercase mb-4">DEPLOYED SOLUTIONS</h6>
              <h2 className="text-4xl font-black text-brand-secondary tracking-tight">Our Enterprise Specializations</h2>
            </div>
            <Link to="/services" className="text-xs font-black tracking-[0.2em] text-brand-primary flex items-center group">
              VIEW COMPLETE ECOSYSTEM <i className="fa-solid fa-arrow-right-long ml-3 transition-transform group-hover:translate-x-2"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredServices.map((s) => (
              <div key={s.id} className="bg-white p-12 shadow-sm border border-slate-100 group hover:border-brand-accent transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-8xl -rotate-12 group-hover:opacity-10 transition-all">
                  <i className={`fa-solid ${s.icon}`}></i>
                </div>
                <div className="w-16 h-1 bg-brand-primary mb-10 group-hover:w-full transition-all duration-500"></div>
                <h4 className="text-xl font-black text-brand-secondary mb-6 tracking-wide">{s.title.toUpperCase()}</h4>
                <p className="text-sm text-slate-500 leading-relaxed mb-10 font-medium">{s.description}</p>
                <Link to="/services" className="inline-block text-[10px] font-black text-brand-primary tracking-[0.25em] border-b-2 border-transparent hover:border-brand-primary pb-1">
                  CORE SPECS
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <h6 className="text-brand-accent font-black text-[10px] tracking-[0.4em] uppercase mb-4">PORTFOLIO EXCELLENCE</h6>
              <h2 className="text-4xl font-black text-brand-secondary tracking-tight">Featured Projects</h2>
            </div>
            <p className="text-slate-500 max-w-md text-sm font-medium leading-relaxed">
              Real-world implementations of our autonomous architectures across India's growing infrastructure.
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

      {/* Floating CTA */}
      <a 
        href={`https://wa.me/${COMPANY_DETAILS.whatsapp}`} 
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-2xl z-50 hover:scale-110 transition-transform active:scale-95"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default Home;
