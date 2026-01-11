
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', pass: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const success = await login(formData.email, formData.pass);
      if (success) navigate('/dashboard');
      else setError('Invalid email or password.');
    } else {
      const success = await register(formData.name, formData.email, formData.phone, formData.pass);
      if (success) {
        alert('Registration successful! Please login.');
        setIsLogin(true);
      } else setError('Email already exists.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-6 pt-20">
      <div className="bg-white w-full max-w-md shadow-2xl rounded-sm overflow-hidden border border-slate-200">
        <div className="bg-brand-secondary p-8 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tight uppercase">RR AUTO SMART Panel</h2>
          <p className="text-slate-400 text-xs tracking-widest uppercase mt-2">
            {isLogin ? 'Welcome Back' : 'Join our ecosystem'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-2 border border-red-100">{error}</p>}
          
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-slate-200 rounded bg-slate-50 focus:bg-white focus:border-brand-primary outline-none transition-all" placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-slate-200 rounded bg-slate-50 focus:bg-white focus:border-brand-primary outline-none transition-all" placeholder="name@company.com" />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Phone</label>
              <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-slate-200 rounded bg-slate-50 focus:bg-white focus:border-brand-primary outline-none transition-all" placeholder="+91..." />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
            <input type="password" required value={formData.pass} onChange={e => setFormData({...formData, pass: e.target.value})} className="w-full p-3 border border-slate-200 rounded bg-slate-50 focus:bg-white focus:border-brand-primary outline-none transition-all" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-brand-accent text-white font-bold py-4 rounded-sm text-xs tracking-widest shadow-lg hover:bg-brand-secondary transition-all">
            {isLogin ? 'LOGIN TO DASHBOARD' : 'CREATE ACCOUNT'}
          </button>

          <div className="text-center pt-4">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-brand-primary font-bold text-xs tracking-widest hover:underline">
              {isLogin ? "DON'T HAVE AN ACCOUNT? REGISTER" : "ALREADY REGISTERED? LOGIN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
