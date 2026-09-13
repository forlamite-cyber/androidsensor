import React from 'react';
import { Activity, ShieldCheck, Sliders, Cpu, Zap, Wifi } from 'lucide-react';

interface NavbarProps {
  expertMode: boolean;
  setExpertMode: (val: boolean) => void;
  activeView: string;
  deviceHealthScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  expertMode,
  setExpertMode,
  activeView,
  deviceHealthScore
}) => {
  return (
    <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/10">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-mono text-slate-100 font-bold tracking-wider text-base">ANDROID SENSOR INTELLIGENCE</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
              v2.5 PRO
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Mobile Instrumentation & Sensor Fusion Laboratory
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Health Score Pill */}
        <div className="hidden sm:flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div className="text-xs font-mono">
            <span className="text-slate-400 mr-1">HEALTH:</span>
            <span className="text-emerald-400 font-bold">{deviceHealthScore}%</span>
          </div>
        </div>

        {/* Hardware Status Indicator */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono text-slate-300">14 Sensors Active</span>
        </div>

        {/* Expert Mode Toggle */}
        <button
          onClick={() => setExpertMode(!expertMode)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-mono text-xs transition-all border ${
            expertMode 
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/10' 
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>EXPERT MODE</span>
        </button>
      </div>
    </header>
  );
};
