import React, { useState } from 'react';
import { Cpu, Activity, Play, Square, Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { SensorInfo } from '../types';

interface SensorLabViewProps {
  sensors: SensorInfo[];
}

export const SensorLabView: React.FC<SensorLabViewProps> = ({ sensors }) => {
  const [selectedSensor, setSelectedSensor] = useState<SensorInfo | null>(sensors[0] || null);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>HARDWARE SENSOR LABORATORY</span>
          </h2>
          <p className="text-xs font-mono text-slate-400">Complete inspection of Android hardware sensor abstraction layer</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-mono text-xs border ${
              isStreaming 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400' 
                : 'bg-slate-950 border-slate-700 text-slate-400'
            }`}
          >
            {isStreaming ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isStreaming ? 'PAUSE STREAM' : 'START STREAM'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Inventory List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 lg:col-span-1">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Sensor Inventory ({sensors.length})</div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {sensors.map((sensor) => {
              const isSelected = selectedSensor?.id === sensor.id;
              return (
                <div
                  key={sensor.id}
                  onClick={() => setSelectedSensor(sensor)}
                  className={`p-3 rounded-lg border font-mono cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/50 text-slate-100 shadow-sm shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200 truncate">{sensor.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{sensor.availability}</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Vendor: {sensor.vendor}</span>
                    <span>Rate: {sensor.samplingRateHz} Hz</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Sensor Deep Inspector */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 lg:col-span-2 space-y-6">
          {selectedSensor ? (
            <>
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">Active Inspector</div>
                  <h3 className="text-lg font-mono font-bold text-slate-100">{selectedSensor.name}</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">Vendor: {selectedSensor.vendor} • Version v{selectedSensor.version}</p>
                </div>
                <div className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded font-mono text-xs text-emerald-400">
                  Accuracy: Level {selectedSensor.accuracy}/3
                </div>
              </div>

              {/* Technical Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500">RESOLUTION</div>
                  <div className="text-xs font-mono font-bold text-slate-200 mt-1">{selectedSensor.resolution}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500">MAX RANGE</div>
                  <div className="text-xs font-mono font-bold text-slate-200 mt-1">{selectedSensor.maxRange}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500">MIN DELAY</div>
                  <div className="text-xs font-mono font-bold text-slate-200 mt-1">{selectedSensor.minDelayMs} ms</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-500">POWER DRAW</div>
                  <div className="text-xs font-mono font-bold text-amber-400 mt-1">{selectedSensor.powerConsumptionMa} mA</div>
                </div>
              </div>

              {/* Current Values Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Current Raw / Processed Values</span>
                  <span className="text-[10px] text-cyan-400 animate-pulse">● LIVE STREAM</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(selectedSensor.currentValues).map(([key, val]) => (
                    <div key={key} className="bg-slate-900 p-3 rounded border border-slate-800/80">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">{key}</div>
                      <div className="text-sm font-mono font-bold text-slate-100 mt-1">{String(val)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-slate-500">Provenance: DIRECT HARDWARE ABSTRACTION LAYER</span>
                <button 
                  onClick={() => alert(`Exporting raw telemetry stream for ${selectedSensor.name}...`)}
                  className="flex items-center space-x-2 bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-400 border border-cyan-800 px-4 py-2 rounded-lg font-mono text-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT CSV / JSON</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-slate-500 font-mono text-sm">Select a sensor from the inventory list</div>
          )}
        </div>
      </div>
    </div>
  );
};
