import React, { useState, useEffect } from 'react';
import { HardwareManager } from './services/hardwareManager';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { SensorLabView } from './components/SensorLabView';
import { PowerLabView } from './components/PowerLabView';
import { NfcLabView } from './components/NfcLabView';
import { BluetoothLabView } from './components/BluetoothLabView';
import { MotionLabView } from './components/MotionLabView';
import { EnvironmentView } from './components/EnvironmentView';
import { DeviceHealthView } from './components/DeviceHealthView';
import { RecorderView } from './components/RecorderView';
import { EventsView } from './components/EventsView';
import { AiAssistantView } from './components/AiAssistantView';
import { PrivacyView } from './components/PrivacyView';
import { SettingsView } from './components/SettingsView';
import { BatteryTelemetry, MotionData, EnvironmentData, SensorInfo, NfcTagInfo, BleDevice, TelemetryEvent, DeviceHealth } from './types';

export default function App() {
  const hardwareMgr = HardwareManager.getInstance();

  const [activeView, setActiveView] = useState<string>('dashboard');
  const [expertMode, setExpertMode] = useState<boolean>(false);

  const [battery, setBattery] = useState<BatteryTelemetry>(hardwareMgr.getBattery());
  const [motion, setMotion] = useState<MotionData>(hardwareMgr.getMotion());
  const [environment, setEnvironment] = useState<EnvironmentData>(hardwareMgr.getEnvironment());
  const [sensors] = useState<SensorInfo[]>(hardwareMgr.getSensors());
  const [nfcTags] = useState<NfcTagInfo[]>(hardwareMgr.getNfcTags());
  const [bleDevices] = useState<BleDevice[]>(hardwareMgr.getBleDevices());
  const [events] = useState<TelemetryEvent[]>(hardwareMgr.getEvents());
  const [health] = useState<DeviceHealth>(hardwareMgr.getDeviceHealth());

  useEffect(() => {
    const handleTick = (type: string, data: any) => {
      if (type === 'tick') {
        setBattery({ ...data.battery });
        setMotion({ ...data.motion });
        setEnvironment({ ...data.environment });
      }
    };

    hardwareMgr.startStreaming(handleTick);
    return () => {
      hardwareMgr.stopStreaming(handleTick);
    };
  }, [hardwareMgr]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      <Navbar
        expertMode={expertMode}
        setExpertMode={setExpertMode}
        activeView={activeView}
        deviceHealthScore={health.overallScore}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-1 overflow-y-auto bg-slate-950/90">
          {activeView === 'dashboard' && (
            <DashboardView
              battery={battery}
              motion={motion}
              environment={environment}
              health={health}
              expertMode={expertMode}
            />
          )}
          {activeView === 'sensors' && <SensorLabView sensors={sensors} />}
          {activeView === 'power' && <PowerLabView battery={battery} />}
          {activeView === 'motion' && <MotionLabView motion={motion} />}
          {activeView === 'nfc' && <NfcLabView nfcTags={nfcTags} />}
          {activeView === 'bluetooth' && <BluetoothLabView devices={bleDevices} />}
          {activeView === 'environment' && <EnvironmentView environment={environment} />}
          {activeView === 'health' && <DeviceHealthView health={health} />}
          {activeView === 'recorder' && <RecorderView />}
          {activeView === 'events' && <EventsView events={events} />}
          {activeView === 'ai' && <AiAssistantView battery={battery} motion={motion} environment={environment} />}
          {activeView === 'privacy' && <PrivacyView />}
          {activeView === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
