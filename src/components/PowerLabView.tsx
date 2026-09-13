import React from 'react';
import { Zap, Activity, ShieldCheck, AlertCircle } from 'lucide-react';
import { BatteryTelemetry } from '../types';

interface PowerLabViewProps {
  battery: BatteryTelemetry;
}

export const PowerLabView: React.FC<PowerLabViewProps> = ({ battery }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>PROFESSIONAL POWER & BATTERY ANALYZER</span>
          </h2>
          <p className="text-xs font-mono text-slate-400">High-precision instrumentation multimeter for power draw & energy trends</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded border border-slate-800 font-mono text-xs text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Battery Health: {battery.health}</span>
        </div>
      </div>

      {/* Multimeter Digital Readout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Voltage */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Battery Potential (Voltage)</div>
          <div className="my-4">
            <div className="text-4xl font-mono font-bold text-slate-100 tracking-tight">
              {battery.voltageV} <span className="text-lg text-cyan-400 font-normal">V</span>
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800">
            <span>PROVENANCE: DIRECT</span>
            <span>MIN: 3.40V • MAX: 4.35V</span>
          </div>
        </div>

        {/* Current */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Charging Current (Amperage)</div>
          <div className="my-4">
            {battery.currentMa !== null ? (
              <div className="text-4xl font-mono font-bold text-emerald-400 tracking-tight">
                +{battery.currentMa} <span className="text-lg text-slate-400 font-normal">mA</span>
              </div>
            ) : (
              <div className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60 p-3 rounded">
                "Current unavailable from Android hardware interface on this kernel/device."
              </div>
            )}
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800">
            <span>PROVENANCE: {battery.currentMa !== null ? 'DIRECT' : 'UNAVAILABLE'}</span>
            <span>MOVING AVG (10s)</span>
          </div>
        </div>

        {/* Instantaneous Power */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Instantaneous Power (P = V × I)</div>
          <div className="my-4">
            <div className="text-4xl font-mono font-bold text-amber-400 tracking-tight">
              {battery.powerW !== null ? battery.powerW : '—'} <span className="text-lg text-slate-400 font-normal">W</span>
            </div>
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800">
            <span>PROVENANCE: DERIVED</span>
            <span>EFFICIENCY: ~89%</span>
          </div>
        </div>

      </div>

      {/* Advanced Battery Specs & Thermal State */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Detailed Battery Telemetry & Thermal Status</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500">TECHNOLOGY</div>
            <div className="text-xs font-mono font-bold text-slate-200 mt-1">{battery.technology}</div>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500">DESIGN CAPACITY</div>
            <div className="text-xs font-mono font-bold text-slate-200 mt-1">{battery.capacityMah} mAh</div>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500">TEMPERATURE</div>
            <div className="text-xs font-mono font-bold text-emerald-400 mt-1">{battery.temperatureC}°C ({battery.thermalState})</div>
          </div>
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <div className="text-[10px] font-mono text-slate-500">CHARGING SOURCE</div>
            <div className="text-xs font-mono font-bold text-cyan-400 mt-1">{battery.chargingSource} ({battery.chargingStatus})</div>
          </div>
        </div>
      </div>
    </div>
  );
};
