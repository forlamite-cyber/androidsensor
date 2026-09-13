import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  Zap, 
  Radio, 
  Compass, 
  CloudSun, 
  ShieldCheck, 
  FileText, 
  BellRing, 
  Bot, 
  Lock, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sensors', label: 'Sensor Lab', icon: Cpu },
    { id: 'power', label: 'Power & Battery', icon: Zap },
    { id: 'motion', label: 'Motion & Gyro', icon: Compass },
    { id: 'nfc', label: 'NFC Laboratory', icon: Radio },
    { id: 'bluetooth', label: 'BLE & RF Lab', icon: Radio },
    { id: 'environment', label: 'Environment', icon: CloudSun },
    { id: 'health', label: 'Device Health', icon: ShieldCheck },
    { id: 'recorder', label: 'Data Recorder', icon: FileText },
    { id: 'events', label: 'Event Engine', icon: BellRing },
    { id: 'ai', label: 'AI Assistant', icon: Bot },
    { id: 'privacy', label: 'Privacy & Permissions', icon: Lock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 select-none overflow-y-auto">
      <div className="p-4 border-b border-slate-800/80">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Navigation Hub</span>
      </div>
      <nav className="p-3 space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-mono transition-all ${
                isActive
                  ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800/80">
        <div className="bg-slate-900/80 rounded p-2.5 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>CORE ARCH:</span>
            <span className="text-cyan-400">Compose / M3</span>
          </div>
          <div className="flex justify-between">
            <span>PIPELINE:</span>
            <span className="text-emerald-400">Active (5Hz)</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
