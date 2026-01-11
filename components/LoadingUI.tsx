
import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg', color?: string }> = ({ size = 'md', color = 'border-brand-primary' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
  return (
    <div className={`${sizeClasses[size]} ${color} border-t-transparent rounded-full animate-spin`}></div>
  );
};

export const ServiceSkeleton: React.FC = () => (
  <div className="flex flex-col lg:flex-row items-center gap-20 animate-pulse">
    <div className="w-full lg:w-1/2 bg-slate-200 aspect-[4/3] rounded-sm"></div>
    <div className="w-full lg:w-1/2 space-y-6">
      <div className="h-4 w-24 bg-slate-200 rounded"></div>
      <div className="h-10 w-3/4 bg-slate-200 rounded"></div>
      <div className="h-24 w-full bg-slate-200 rounded"></div>
      <div className="h-12 w-48 bg-slate-200 rounded"></div>
    </div>
  </div>
);

export const DashboardStatsSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="bg-white p-6 border border-slate-200 rounded-sm animate-pulse">
        <div className="h-3 w-20 bg-slate-100 mb-3"></div>
        <div className="h-8 w-12 bg-slate-200"></div>
      </div>
    ))}
  </div>
);
