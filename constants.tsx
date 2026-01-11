
import { Service, Project } from './types';

export const SERVICES: Service[] = [
  {
    id: 'smart-home',
    title: 'Smart Home Automation',
    description: 'Complete home control from lights and curtains to security and climate control using voice and mobile apps.',
    icon: 'fa-house-signal',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'iiot',
    title: 'Industrial IoT (IIoT)',
    description: 'Harness the power of data with smart sensors, predictive maintenance, and real-time factory monitoring.',
    icon: 'fa-industry',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'building-automation',
    title: 'Building Automation',
    description: 'Centralized control for commercial buildings to optimize HVAC, lighting, and security systems.',
    icon: 'fa-building-shield',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'remote-monitoring',
    title: 'Remote Monitoring & Control',
    description: 'Secure, real-time access to your systems from anywhere in the world via cloud dashboards.',
    icon: 'fa-laptop-code',
    image: 'https://images.unsplash.com/photo-1551288049-bbda4e97669d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sensor-integration',
    title: 'Sensor & Device Integration',
    description: 'Expert integration of custom sensors and devices into unified ecosystems for seamless data flow.',
    icon: 'fa-microchip',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'energy-management',
    title: 'Energy Management Systems',
    description: 'Smart energy auditing and automation to reduce carbon footprint and operational costs.',
    icon: 'fa-leaf',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800'
  }
];

export const PROJECTS: Project[] = [
  { id: 1, title: 'Smart Villa Integration', category: 'Smart Home', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Factory Monitoring System', category: 'Industrial', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Hospitality Automation', category: 'Commercial', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Energy Audit Dashboard', category: 'IIoT', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' }
];

export const COMPANY_DETAILS = {
  name: 'Romanshu Sharma',
  phone: '+91 83023 13065',
  email: 'info@autosmart-iot.com',
  address: 'iStart Nest Bharatpur, Rajasthan, India',
  whatsapp: '918302313065',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=iStart+Nest+Bharatpur+Rajasthan+India'
};
