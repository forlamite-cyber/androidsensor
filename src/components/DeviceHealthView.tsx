import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DeviceHealth } from '../types';

interface DeviceHealthViewProps {
  health: DeviceHealth;
}

export const DeviceHealthView: React.FC<DeviceHealthViewProps> = ({ health }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>INTELLIGENT DEVICE HEALTH DASHBOARD</span>
          </h2>
          <p className="text-xs font-mono text-slate-400">Transparent subsystem scoring based on hardware signals and telemetry</p>
        </div>
        <div className="bg-emerald-950/60 border border-emerald-800 px-4 py-2 rounded-xl text-emerald-400 font-mono text-base font-bold">
          OVERALL: {health.overallScore} / 100
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
        {health.components.map((comp, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">{comp.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                {comp.score} / {comp.maxScore}
              </span>
            </div>
            <p className="text-xs text-slate-400">{comp.details}</p>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(comp.score / comp.maxScore) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
