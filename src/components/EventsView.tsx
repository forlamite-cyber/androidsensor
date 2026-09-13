import React from 'react';
import { BellRing } from 'lucide-react';
import { TelemetryEvent } from '../types';

interface EventsViewProps {
  events: TelemetryEvent[];
}

export const EventsView: React.FC<EventsViewProps> = ({ events }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full font-mono">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <BellRing className="w-5 h-5 text-cyan-400" />
            <span>REAL-TIME TELEMETRY EVENT ENGINE</span>
          </h2>
          <p className="text-xs text-slate-400">Stream of anomaly detections, state transitions, and hardware triggers</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {ev.source}
                  </span>
                  <span className="text-xs font-bold text-slate-200">{ev.eventType}</span>
                </div>
                <div className="text-xs text-slate-300">{ev.value}</div>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                <div>{new Date(ev.timestamp).toLocaleTimeString()}</div>
                <div className="text-emerald-400 mt-1">{ev.confidence}% conf</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
