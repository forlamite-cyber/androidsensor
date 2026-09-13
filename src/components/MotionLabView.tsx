import React from 'react';
import { Compass, Activity } from 'lucide-react';
import { MotionData } from '../types';

interface MotionLabViewProps {
  motion: MotionData;
}

export const MotionLabView: React.FC<MotionLabViewProps> = ({ motion }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center space-x-2">
            <Compass className="w-5 h-5 text-blue-400" />
            <span>MOTION, GYROSCOPE & VIBRATION LABORATORY</span>
          </h2>
          <p className="text-xs font-mono text-slate-400">Inertial measurement unit (IMU) telemetry, vibration analysis, and activity heuristics</p>
        </div>
        <div className="bg-slate-950 px-3 py-1.5 rounded border border-slate-800 font-mono text-xs text-blue-400">
          State: {motion.activityState} ({motion.confidence}% conf)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {/* Accelerometer */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Accelerometer (BMI270)</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">X-Axis:</span>
              <span className="text-slate-100 font-bold">{motion.accelX} m/s²</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">Y-Axis:</span>
              <span className="text-slate-100 font-bold">{motion.accelY} m/s²</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">Z-Axis:</span>
              <span className="text-slate-100 font-bold">{motion.accelZ} m/s²</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-cyan-800/60 bg-cyan-950/20">
              <span className="text-cyan-400">Magnitude:</span>
              <span className="text-cyan-400 font-bold">{motion.accelMag} m/s²</span>
            </div>
          </div>
        </div>

        {/* Gyroscope */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Gyroscope (Angular Velocity)</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">X-Omega:</span>
              <span className="text-slate-100 font-bold">{motion.gyroX} rad/s</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">Y-Omega:</span>
              <span className="text-slate-100 font-bold">{motion.gyroY} rad/s</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">Z-Omega:</span>
              <span className="text-slate-100 font-bold">{motion.gyroZ} rad/s</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-blue-800/60 bg-blue-950/20">
              <span className="text-blue-400">Magnitude:</span>
              <span className="text-blue-400 font-bold">{motion.gyroMag} rad/s</span>
            </div>
          </div>
        </div>

        {/* Vibration / Frequency Domain */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Vibration & RMS Spectrum</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">RMS Acceleration:</span>
              <span className="text-slate-100 font-bold">0.042 m/s²</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">Dominant Freq:</span>
              <span className="text-slate-100 font-bold">0.0 Hz (Stationary)</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
              <span className="text-slate-400">Vibration Intensity:</span>
              <span className="text-emerald-400 font-bold">Low / Stable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
