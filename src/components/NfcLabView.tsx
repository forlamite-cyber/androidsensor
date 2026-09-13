import React, { useState } from 'react';
import { Radio, ShieldAlert, Cpu, CheckCircle2, FileText } from 'lucide-react';
import { NfcTagInfo } from '../types';

interface NfcLabViewProps {
  nfcTags: NfcTagInfo[];
}

export const NfcLabView: React.FC<NfcLabViewProps> = ({ nfcTags }) => {
  const [selectedMode, setSelectedMode] = useState<'inspect' | 'write' | 'history'>('inspect');
  const [writeText, setWriteText] = useState('Android Sensor Lab NDEF Payload');
  const [writeStatus, setWriteStatus] = useState<string | null>(null);

  const handleWriteTag = () => {
    setWriteStatus('Approaching tag... simulating NDEF write...');
    setTimeout(() => {
      setWriteStatus('Successfully wrote NDEF Text record to tag!');
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center space-x-2">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>NXP PN557 NFC / RFID LABORATORY</span>
          </h2>
          <p className="text-xs font-mono text-slate-400">Professional tag inspection, NDEF parser, and safe record writer</p>
        </div>
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setSelectedMode('inspect')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              selectedMode === 'inspect' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'
            }`}
          >
            Inspector
          </button>
          <button
            onClick={() => setSelectedMode('write')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              selectedMode === 'write' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'
            }`}
          >
            Writer
          </button>
          <button
            onClick={() => setSelectedMode('history')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              selectedMode === 'history' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {/* Warning banner */}
      <div className="bg-amber-950/30 border border-amber-500/40 p-4 rounded-xl flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs font-mono text-amber-200/90 space-y-1">
          <span className="font-bold">SAFETY NOTICE:</span> Do not use this tool to modify tags you do not own or have permission to modify. Only standard NDEF records exposed by Android APIs are accessed.
        </div>
      </div>

      {selectedMode === 'inspect' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">Detected NFC Tag</h3>
            {nfcTags.length > 0 ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Tag UID:</span>
                  <span className="text-cyan-400 font-bold">{nfcTags[0].uid}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Technologies:</span>
                  <span className="text-slate-200">{nfcTags[0].technologies.join(', ')}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Writable:</span>
                  <span className="text-emerald-400">{nfcTags[0].writable ? 'Yes (1 KB capacity)' : 'No'}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 font-mono text-xs">No NFC tag currently in proximity field.</div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">NDEF Payload Records</h3>
            {nfcTags[0]?.ndefRecords.map((rec, idx) => (
              <div key={idx} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1 font-mono text-xs">
                <div className="text-cyan-400 font-bold">Record #{idx + 1} ({rec.type})</div>
                <div className="text-slate-300 break-all">{rec.payload}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMode === 'write' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto space-y-4 font-mono">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Write NDEF Text Record</h3>
          <div className="space-y-2">
            <label className="text-xs text-slate-400">Payload Content:</label>
            <input
              type="text"
              value={writeText}
              onChange={(e) => setWriteText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-100 focus:border-cyan-500 outline-none"
            />
          </div>
          <button
            onClick={handleWriteTag}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold py-2.5 rounded text-xs transition-all"
          >
            INITIATE TAG WRITE SEQUENCE
          </button>
          {writeStatus && (
            <div className="bg-slate-950 border border-emerald-500/40 p-3 rounded text-xs text-emerald-400 text-center animate-pulse">
              {writeStatus}
            </div>
          )}
        </div>
      )}

      {selectedMode === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 font-mono text-xs">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">NFC Event History</h3>
          <div className="bg-slate-950 p-3 rounded border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-cyan-400 font-bold">UID: 04:8A:B2:91:E4:28:80</span>
              <div className="text-[10px] text-slate-500 mt-0.5">Scanned via NfcA / Ndef Dispatch</div>
            </div>
            <span className="text-emerald-400">SUCCESS</span>
          </div>
        </div>
      )}
    </div>
  );
};
