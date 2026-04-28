import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, Cloud, Layers, Target, ArrowUpRight } from 'lucide-react';

const trendData = [
  { name: 'Jan', spend: 85000, forecast: 85000 },
  { name: 'Feb', spend: 92000, forecast: 90000 },
  { name: 'Mar', spend: 88000, forecast: 95000 },
  { name: 'Apr', spend: 105000, forecast: 100000 },
  { name: 'May', spend: 115000, forecast: 110000 },
  { name: 'Jun', spend: 124000, forecast: 120000 },
];

const allocationData = [
  { name: 'Azure', value: 45, color: '#0ea5e9' },
  { name: 'AWS', value: 35, color: '#f59e0b' },
  { name: 'GCP', value: 15, color: '#10b981' },
  { name: 'K8s', value: 5, color: '#6366f1' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Strategic Spend Control</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl">Unified multi-cloud financial intelligence and optimization for the modern enterprise.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition">View Billing</button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-indigo-900/40">Optimize Estate</button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Monthly Spend" value="$124.5k" change="+12%" icon={<Cloud className="text-indigo-400" />} />
        <StatCard title="Budget Variance" value="-5.2%" change="On-Track" icon={<Target className="text-emerald-400" />} />
        <StatCard title="Savings Identified" value="$14.2k" change="+5" icon={<ArrowUpRight className="text-yellow-400" />} />
        <StatCard title="Anomalies detected" value="2" change="Attention" icon={<AlertTriangle className="text-rose-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
              Spend Trend vs. Forecast
            </h2>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                <div className="w-3 h-3 bg-indigo-600 rounded-full"></div> Actual
              </span>
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <div className="w-3 h-3 border-2 border-slate-700 rounded-full"></div> Forecast
              </span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="spend" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSpend)" />
                <Area type="monotone" dataKey="forecast" stroke="#334155" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cloud Allocation */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-sky-500 rounded-full"></span>
            Cloud Allocation
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={allocationData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={30}>
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
             <RecommendationItem title="Rightsizing" description="12 instances in AWS us-east-1" saving="$450" />
             <RecommendationItem title="Unused Disks" description="800GB orphaned in Azure" saving="$120" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
       {React.cloneElement(icon, { size: 120 })}
    </div>
    <div className="relative z-10">
      <div className="p-3 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('+') ? 'text-rose-400' : 'text-emerald-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const RecommendationItem = ({ title, description, saving }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl hover:bg-slate-800 transition cursor-pointer group">
    <div>
      <p className="text-sm font-bold text-slate-200">{title}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-black text-emerald-400 group-hover:scale-110 transition">{saving}</p>
      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Monthly</p>
    </div>
  </div>
);

export default Dashboard;
