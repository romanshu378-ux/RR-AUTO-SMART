
import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../constants';
import { LoadingSpinner } from '../components/LoadingUI';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Smart Home Automation',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(res => setTimeout(res, 1500));
    
    alert("Inquiry Sent Successfully. Our technical team will review and contact you shortly.");
    setFormData({ name: '', email: '', phone: '', service: 'Smart Home Automation', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="">
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-brand-secondary mb-4 tracking-tight">Contact Our Technical Team</h1>
          <div className="w-16 h-1 bg-brand-primary mb-6"></div>
          <p className="text-slate-500 font-medium tracking-wide">Get expert guidance on your IoT and Automation requirements.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              <a href={COMPANY_DETAILS.mapsLink} target="_blank" rel="noopener noreferrer" className="block p-8 border border-slate-100 bg-white shadow-sm flex items-start space-x-6 hover:border-brand-accent transition-all group">
                <div className="text-3xl text-brand-primary group-hover:text-brand-accent transition-colors"><i className="fa-solid fa-map-location-dot"></i></div>
                <div>
                  <h4 className="font-bold text-brand-secondary uppercase text-xs tracking-widest mb-3 group-hover:text-brand-accent">Headquarters</h4>
                  <p className="text-sm text-slate-600 leading-relaxed underline underline-offset-4 decoration-slate-200">{COMPANY_DETAILS.address}</p>
                </div>
              </a>
              
              <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="block p-8 border border-slate-100 bg-white shadow-sm flex items-start space-x-6 hover:border-brand-accent transition-all group">
                <div className="text-3xl text-brand-primary group-hover:text-brand-accent transition-colors"><i className="fa-solid fa-phone-volume"></i></div>
                <div>
                  <h4 className="font-bold text-brand-secondary uppercase text-xs tracking-widest mb-3 group-hover:text-brand-accent">Call Support</h4>
                  <p className="text-sm font-bold text-brand-secondary mb-1">{COMPANY_DETAILS.phone}</p>
                  <p className="text-xs text-slate-500">Available: 09:00 - 18:00 (IST)</p>
                </div>
              </a>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white p-10 border border-slate-100 shadow-xl">
                <h3 className="text-2xl font-bold text-brand-secondary mb-10">Service Inquiry Form</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-brand-secondary uppercase tracking-widest mb-3">Full Name</label>
                      <input type="text" required disabled={isSubmitting} className="w-full px-5 py-4 border border-slate-200 rounded-sm bg-slate-50 focus:bg-white focus:border-brand-primary outline-none transition-all disabled:opacity-50" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-secondary uppercase tracking-widest mb-3">Contact Number</label>
                      <input type="tel" required disabled={isSubmitting} className="w-full px-5 py-4 border border-slate-200 rounded-sm bg-slate-50 focus:bg-white focus:border-brand-primary outline-none transition-all disabled:opacity-50" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="bg-brand-primary text-white font-bold py-5 px-10 rounded-sm text-sm tracking-[0.2em] hover:bg-blue-800 transition-all shadow-lg flex items-center justify-center gap-4 min-w-[240px] disabled:opacity-70">
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" color="border-white" />
                        SUBMITTING...
                      </>
                    ) : (
                      <>
                        SUBMIT INQUIRY <i className="fa-solid fa-paper-plane"></i>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
