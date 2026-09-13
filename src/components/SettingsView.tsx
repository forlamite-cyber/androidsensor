import React, { useState } from 'react';
import { Settings, Sliders } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [samplingRate, setSamplingRate] = useState<string>('50 Hz (High Precision)');
  const [units, setUnits] = useState<string>('Metric (SI)');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full font-mono">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <span>PLATFORM SETTINGS & SAMPLING RATES</span>
          </h2>
          <p className="text-xs text-slate-400">Configure global sensor polling frequencies, engineering units, and display profiles</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 max-w-2xl">
        <div className="space-y-2">
          <label className="text-xs text-slate-300 font-bold uppercase">Default Sensor Sampling Frequency</label>
          <select
            value={samplingRate}
            onChange={(e) => setSamplingRate(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-500"
          >
            <option>10 Hz (Power Saving)</option>
            <option>50 Hz (High Precision)</option>
            <option>100 Hz (Maximum Instrumentation)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-300 font-bold uppercase">Engineering Units System</label>
          <select
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-500"
          >
            <option>Metric (SI) — m/s², hPa, °C, µT</option>
            <option>Imperial / Custom — g, inHg, °F, Gauss</option>
          </select>
        </div>
      </div>
    </div>
  );
};
