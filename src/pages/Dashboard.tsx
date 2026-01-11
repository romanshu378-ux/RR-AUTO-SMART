
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserQuote } from '../types';
import { apiService } from '../services/api';
import BackButton from '../components/BackButton';
import { LoadingSpinner, DashboardStatsSkeleton } from '../components/LoadingUI';

const Dashboard: React.FC = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [quotes, setQuotes] = useState<UserQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [notifCount, setNotifCount] = useState(0);

  const fetchData = useCallback(async (isSilent = false) => {
    if (!user) return;
    if (!isSilent) setLoading(true);
    try {
      const data = user.role === 'admin' 
        ? await apiService.quotes.getAll() 
        : await apiService.quotes.getUserQuotes(user.id);
      setQuotes(data || []);
      const count = await apiService.notifications.getUnread();
      setNotifCount(count);
    } catch (e) {
      console.error("Dashboard Sync Error:", e);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
    if (user) fetchData();

    const interval = setInterval(() => fetchData(true), 15000);
    return () => clearInterval(interval);
  }, [user, authLoading, fetchData, navigate]);

  const handleUpdateStatus = async (id: string, status: any) => {
    setIsUpdatingStatus(id);
    try {
      await apiService.quotes.updateStatus(id, status);
      await fetchData(true);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-brand-secondary text-white hidden lg:flex flex-col fixed inset-y-0 shadow-2xl">
        <div className="p-6 border-b border-white/10 flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-accent flex items-center justify-center font-bold text-white text-xs">RR</div>
          <span className="font-bold tracking-widest text-[10px] uppercase">
            {isAdmin ? 'Admin Console' : 'Customer Panel'}
          </span>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('overview')} className={`w-full text-left p-3 rounded text-xs font-bold flex items-center transition-all ${activeTab === 'overview' ? 'bg-brand-primary' : 'hover:bg-white/5'}`}>
            <i className="fa-solid fa-chart-line mr-3"></i> {isAdmin ? 'GLOBAL OVERVIEW' : 'MY PROJECTS'}
          </button>
          {!isAdmin && (
            <button onClick={() => navigate('/services')} className="w-full text-left p-3 rounded text-xs font-bold flex items-center hover:bg-white/5">
              <i className="fa-solid fa-plus-circle mr-3"></i> NEW REQUEST
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="w-full text-left p-3 text-red-400 hover:text-red-300 text-xs font-bold flex items-center uppercase tracking-widest">
            <i className="fa-solid fa-power-off mr-3"></i> Terminate
          </button>
        </div>
      </aside>

      <main className="lg:ml-64 flex-grow p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-black text-brand-secondary tracking-tight">
                {user?.name}
              </h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                {user?.role === 'admin' ? 'Root Administrator' : 'Project Member'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-brand-primary flex items-center justify-center text-white font-bold rounded-sm shadow-lg">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </header>

          {loading && quotes.length === 0 ? (
            <DashboardStatsSkeleton />
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Tickets</p>
                  <p className="text-3xl font-bold text-brand-secondary">{quotes?.length || 0}</p>
                </div>
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">In Progress</p>
                  <p className="text-3xl font-bold text-brand-primary">{quotes?.filter(q => q.status === 'In Progress').length || 0}</p>
                </div>
                <div className="bg-white p-6 border border-slate-200 shadow-sm rounded-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{quotes?.filter(q => q.status === 'Completed').length || 0}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
                <div className="p-6 border-b flex justify-between items-center">
                  <h3 className="font-bold text-brand-secondary text-sm uppercase tracking-widest">Operation Ledger</h3>
                  {loading && <LoadingSpinner size="sm" />}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="p-5">ID</th>
                        <th className="p-5">Service</th>
                        <th className="p-5">Status</th>
                        <th className="p-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quotes?.map((q) => (
                        <tr key={q.id} className="text-sm hover:bg-slate-50 transition-colors">
                          <td className="p-5 font-mono text-xs text-brand-primary">{q.id}</td>
                          <td className="p-5 font-bold text-brand-secondary uppercase text-[11px]">{q.serviceType}</td>
                          <td className="p-5">
                            <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-sm border ${
                              q.status === 'Completed' ? 'bg-green-50 border-green-200 text-green-700' :
                              q.status === 'In Progress' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                              'bg-orange-50 border-orange-200 text-orange-700'
                            }`}>
                              {q.status}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            {isAdmin ? (
                              <select 
                                className="bg-slate-100 border-none text-[10px] font-bold p-2 rounded-sm"
                                value={q.status}
                                onChange={(e) => handleUpdateStatus(q.id, e.target.value)}
                              >
                                <option value="Submitted">SUBMITTED</option>
                                <option value="In Progress">IN PROGRESS</option>
                                <option value="Completed">COMPLETED</option>
                              </select>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{q.date}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {(!quotes || quotes.length === 0) && (
                        <tr>
                          <td colSpan={4} className="p-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                            No telemetry found in current sector.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
