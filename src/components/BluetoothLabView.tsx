import React from 'react';
import { Radio, Signal } from 'lucide-react';
import { BleDevice } from '../types';

interface BluetoothLabViewProps {
  devices: BleDevice[];
}

export const BluetoothLabView: React.FC<BluetoothLabViewProps> = ({ devices }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center space-x-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            <span>BLUETOOTH / BLE INSTRUMENTATION LABORATORY</span>
          </h2>
          <p className="text-xs font-mono text-slate-400">Nearby BLE advertisement scanner, RSSI telemetry, and GATT services inspector</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded border border-slate-800 font-mono text-xs text-cyan-400">
          <Signal className="w-4 h-4" />
          <span>{devices.length} Peripherals Detected</span>
        </div>
      </div>

      <div className="bg-amber-950/20 border border-amber-500/30 p-3 rounded-xl font-mono text-xs text-amber-200/90">
        <span className="font-bold">HEURISTIC NOTE:</span> RSSI-based distance estimation is highly environment dependent and subject to multipath fading.
      </div>

      {/* Device List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {devices.map((dev) => (
          <div key={dev.address} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 truncate">{dev.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                {dev.rssi} dBm
              </span>
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between bg-slate-950 p-2 rounded border border-slate-800">
                <span>Address:</span>
                <span className="text-slate-200">{dev.address}</span>
              </div>
              <div className="flex justify-between bg-slate-950 p-2 rounded border border-slate-800">
                <span>Est. Distance:</span>
                <span className="text-slate-200">~{dev.distanceEstM} m</span>
              </div>
              <div className="flex justify-between bg-slate-950 p-2 rounded border border-slate-800">
                <span>Services UUIDs:</span>
                <span className="text-slate-200">{dev.services.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
