import React from 'react';
import { CloudSun, Activity } from 'lucide-react';
import { EnvironmentData } from '../types';

interface EnvironmentViewProps {
  environment: EnvironmentData;
}

export const EnvironmentView: React.FC<EnvironmentViewProps> = ({ environment }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-emerald-400" />
            <span>ATMOSPHERIC & ENVIRONMENTAL LABORATORY</span>
          </h2>
          <p className="text-xs font-mono text-slate-400">Barometric pressure, altitude modeling, ambient light photometry, and humidity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Atmospheric Pressure</div>
          <div className="text-3xl font-bold text-slate-100">{environment.pressureHpa} <span className="text-sm text-cyan-400 font-normal">hPa</span></div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            Derived Altitude: ~{environment.altitudeM} m
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Ambient Light</div>
          <div className="text-3xl font-bold text-slate-100">{environment.lightLux} <span className="text-sm text-emerald-400 font-normal">lux</span></div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            Interpretation: {environment.lightInterpretation}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Relative Humidity</div>
          <div className="text-3xl font-bold text-slate-100">{environment.humidityPercent}%</div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
            Sensirion SHT40 Sensor Module
          </div>
        </div>
      </div>
    </div>
  );
};
