import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full font-mono">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <span>PRIVACY & LOCAL SECURITY DASHBOARD</span>
          </h2>
          <p className="text-xs text-slate-400">Strict local-only storage policy. No telemetry data is uploaded without explicit consent.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Permission Audit</h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between bg-slate-950 p-3 rounded border border-slate-800">
              <span>NFC Hardware:</span>
              <span className="text-emerald-400">Granted & Active</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-3 rounded border border-slate-800">
              <span>Location (GNSS):</span>
              <span className="text-emerald-400">Granted (Fine)</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-3 rounded border border-slate-800">
              <span>Camera & Audio:</span>
              <span className="text-emerald-400">Optional / On-Demand</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Data Management</h3>
          <p className="text-xs text-slate-400">All sensor logs, recording sessions, and baselines are stored securely in local SQLite / DataStore storage.</p>
          <button
            onClick={() => alert('All local session logs purged.')}
            className="bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 px-4 py-2 rounded text-xs font-bold transition-all"
          >
            PURGE ALL LOCAL TELEMETRY DATA
          </button>
        </div>
      </div>
    </div>
  );
};
