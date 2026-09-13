import React, { useState } from 'react';
import { 
  Zap, 
  Compass, 
  Radio, 
  CloudSun, 
  ShieldCheck, 
  Activity, 
  Thermometer, 
  Plus, 
  SlidersHorizontal,
  Lock
} from 'lucide-react';
import { BatteryTelemetry, MotionData, EnvironmentData, DeviceHealth } from '../types';

interface DashboardViewProps {
  battery: BatteryTelemetry;
  motion: MotionData;
  environment: EnvironmentData;
  health: DeviceHealth;
  expertMode: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  battery,
  motion,
  environment,
  health,
  expertMode
}) => {
  const [viewMode, setViewMode] = useState<'engineering' | 'simple'>('engineering');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div>
          <h2 className="text-lg font-mono font-bold text-slate-100">SYSTEM TELEMETRY DASHBOARD</h2>
          <p className="text-xs font-mono text-slate-400">Real-time instrumentation cockpit & sensor fusion monitor</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('engineering')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                viewMode === 'engineering' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Engineering View
            </button>
            <button
              onClick={() => setViewMode('simple')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                viewMode === 'simple' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Simple View
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Device Intelligence / Health */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Device Intelligence</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Score: {health.overallScore}%
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-mono text-slate-100 font-semibold">Google Pixel / Android Instrument</h3>
              <p className="text-xs font-mono text-slate-400">All subsystems nominal. 14 sensors operational.</p>
            </div>
          </div>
          {expertMode && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex justify-between">
              <span>UPTIME: 4h 12m</span>
              <span>HAL v2.5</span>
            </div>
          )}
        </div>

        {/* Widget 2: Power & Battery */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center space-x-1.5">
                <Zap className="w-4 h-4" />
                <span>Power & Battery</span>
              </span>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                {battery.chargingStatus} ({battery.chargingSource})
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 my-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400">VOLTAGE</div>
                <div className="text-base font-mono font-bold text-slate-100">{battery.voltageV} V</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400">CURRENT</div>
                <div className="text-base font-mono font-bold text-slate-100">+{battery.currentMa} mA</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400">POWER</div>
                <div className="text-base font-mono font-bold text-amber-400">{battery.powerW} W</div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400">LEVEL</div>
                <div className="text-base font-mono font-bold text-emerald-400">{battery.percentage}%</div>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-2">
            DIRECT HARDWARE INTERFACE (AC Connected)
          </div>
        </div>

        {/* Widget 3: Motion & Gyro */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest flex items-center space-x-1.5">
                <Compass className="w-4 h-4" />
                <span>Motion & Orientation</span>
              </span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/60 border border-blue-800 px-2 py-0.5 rounded">
                {motion.activityState}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">Total Acceleration:</span>
                <span className="text-slate-100 font-bold">{motion.accelMag} m/s²</span>
              </div>
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">Angular Velocity:</span>
                <span className="text-slate-100 font-bold">{motion.gyroMag} rad/s</span>
              </div>
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">Orientation:</span>
                <span className="text-slate-100 font-bold">{motion.orientation}</span>
              </div>
            </div>
          </div>
          {expertMode && (
            <div className="mt-3 text-[10px] font-mono text-slate-500">
              Confidence: {motion.confidence}% | Filter: Kalman/Complementary
            </div>
          )}
        </div>

        {/* Widget 4: Magnetic Field */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center space-x-1.5">
                <Activity className="w-4 h-4" />
                <span>Magnetic Field</span>
              </span>
              <span className="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded">
                {motion.magMag} µT
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 my-2 text-center">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">X</div>
                <div className="text-xs font-mono font-bold text-slate-100">{motion.magX}</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Y</div>
                <div className="text-xs font-mono font-bold text-slate-100">{motion.magY}</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Z</div>
                <div className="text-xs font-mono font-bold text-slate-100">{motion.magZ}</div>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Compass Heading: 72° (NE) • Nominal Baseline
          </div>
        </div>

        {/* Widget 5: Environment */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center space-x-1.5">
                <CloudSun className="w-4 h-4" />
                <span>Environment & Barometer</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                Stable
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">Atmospheric Pressure:</span>
                <span className="text-slate-100 font-bold">{environment.pressureHpa} hPa</span>
              </div>
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">Ambient Light:</span>
                <span className="text-slate-100 font-bold">{environment.lightLux} lux ({environment.lightInterpretation})</span>
              </div>
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">Relative Humidity:</span>
                <span className="text-slate-100 font-bold">{environment.humidityPercent}%</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-2">
            Altitude Derived: {environment.altitudeM}m above sea level
          </div>
        </div>

        {/* Widget 6: NFC / BLE / Connectivity */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center space-x-1.5">
                <Radio className="w-4 h-4" />
                <span>NFC & RF Telemetry</span>
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
                READY
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">NFC Controller:</span>
                <span className="text-emerald-400 font-bold">NXP PN557 Active</span>
              </div>
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">BLE Scanner:</span>
                <span className="text-slate-100 font-bold">6 Nearby Devices</span>
              </div>
              <div className="flex justify-between text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-400">Thermal Status:</span>
                <span className="text-emerald-400 font-bold">{battery.thermalState} ({battery.temperatureC}°C)</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-2">
            Secure Local Execution • No Cloud Uplink
          </div>
        </div>

      </div>
    </div>
  );
};
