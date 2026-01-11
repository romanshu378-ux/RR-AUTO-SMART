
import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_DETAILS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">RR</div>
              <span className="text-xl font-bold text-white uppercase">RR AUTO SMART</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              We are a technology-driven company specializing in IoT and automation solutions for smart homes and industries.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-blue-400 transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Get a Quote</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Our Solutions</h4>
            <ul className="space-y-4">
              <li className="hover:text-blue-400 cursor-pointer">Smart Home Automation</li>
              <li className="hover:text-blue-400 cursor-pointer">Industrial IoT</li>
              <li className="hover:text-blue-400 cursor-pointer">Building Automation</li>
              <li className="hover:text-blue-400 cursor-pointer">Energy Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <i className="fa-solid fa-location-dot mt-1 text-blue-500"></i>
                <a 
                  href={COMPANY_DETAILS.mapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-4"
                >
                  {COMPANY_DETAILS.address}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-phone text-blue-500"></i>
                <a 
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fa-solid fa-envelope text-blue-500"></i>
                <a 
                  href={`mailto:${COMPANY_DETAILS.email}`} 
                  className="hover:text-blue-400 transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} RR AUTO SMART. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
