import React, { useState } from 'react';
import { FileText, Play, Square, Download } from 'lucide-react';
import { RecordingSession } from '../types';

export const RecorderView: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [sessionName, setSessionName] = useState<string>('Sensor_Lab_Session_01');
  const [sessions, setSessions] = useState<RecordingSession[]>([
    { id: 'rec_1', name: 'Baseline_Calibration_Walk', startTime: Date.now() - 3600000, durationSec: 320, sensorsRecorded: ['Accelerometer', 'Gyroscope', 'Magnetometer', 'Barometer'], samplingRateHz: 50, eventsCount: 4, dataPointsCount: 16000 }
  ]);

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      const newSession: RecordingSession = {
        id: `rec_${Date.now()}`,
        name: sessionName,
        startTime: Date.now(),
        durationSec: 45,
        sensorsRecorded: ['All Active Sensors'],
        samplingRateHz: 50,
        eventsCount: 2,
        dataPointsCount: 2250
      };
      setSessions([newSession, ...sessions]);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full font-mono">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>CONTINUOUS DATA RECORDING & EXPORT</span>
          </h2>
          <p className="text-xs text-slate-400">Record high-frequency sensor streams to local storage for CSV/JSON export</p>
        </div>
        <button
          onClick={toggleRecording}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            isRecording
              ? 'bg-rose-950 border border-rose-500/50 text-rose-400 animate-pulse'
              : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950'
          }`}
        >
          {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isRecording ? 'STOP RECORDING' : 'START RECORDING SESSION'}</span>
        </button>
      </div>

      {isRecording && (
        <div className="bg-slate-900 border border-cyan-500/40 p-4 rounded-xl flex items-center justify-between text-xs text-cyan-400">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <span>Recording session "{sessionName}" in progress... (Batched local storage writes)</span>
          </div>
          <span className="font-bold">45.2 KB buffered</span>
        </div>
      )}

      {/* Sessions list */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Recorded Sessions Archive</h3>
        <div className="space-y-3">
          {sessions.map((s) => (
            <div key={s.id} className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div>
                <div className="text-cyan-400 font-bold text-sm">{s.name}</div>
                <div className="text-slate-400 mt-1">
                  Duration: {s.durationSec}s • Sampling: {s.samplingRateHz}Hz • Points: {s.dataPointsCount}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Exporting ${s.name} as CSV...`)}
                  className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => alert(`Exporting ${s.name} as JSON...`)}
                  className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1.5 rounded"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
