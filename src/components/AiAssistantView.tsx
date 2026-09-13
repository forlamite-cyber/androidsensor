import React, { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { BatteryTelemetry, MotionData, EnvironmentData } from '../types';

interface AiAssistantViewProps {
  battery: BatteryTelemetry;
  motion: MotionData;
  environment: EnvironmentData;
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ battery, motion, environment }) => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: 'Greetings engineer. I am your local/AI telemetry assistant. Ask me anything about sensor states, battery health, magnetic anomalies, or recent telemetry trends.'
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const snapshot = { battery, motion, environment };
      const res = await fetch('/api/ai-telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, telemetrySnapshot: snapshot })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.response || 'No response.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Error connecting to AI backend service.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto w-full font-mono flex flex-col h-[calc(100vh-100px)]">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>INTELLIGENT TELEMETRY ASSISTANT (GEMINI AI)</span>
          </h2>
          <p className="text-xs text-slate-400">Contextual telemetry diagnostics based on real-time sensor measurements</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex-1 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl p-4 rounded-xl text-xs space-y-1 ${
              m.sender === 'user'
                ? 'bg-cyan-950/80 border border-cyan-800 text-cyan-100'
                : 'bg-slate-950 border border-slate-800 text-slate-200'
            }`}>
              <div className="font-bold text-[10px] text-slate-400 uppercase">{m.sender === 'user' ? 'Engineer' : 'Telemetry AI'}</div>
              <div className="leading-relaxed">{m.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-cyan-400 animate-pulse">
              Analyzing telemetry snapshot...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex space-x-3 shrink-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Why is my phone getting warm? What changed in the last 10 minutes?"
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 focus:border-cyan-500 outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-all flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>QUERY</span>
        </button>
      </form>
    </div>
  );
};
