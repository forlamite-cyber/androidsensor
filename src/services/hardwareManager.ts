import { SensorInfo, BatteryTelemetry, MotionData, EnvironmentData, NfcTagInfo, BleDevice, TelemetryEvent, DeviceHealth, HealthScoreComponent } from '../types';

export class HardwareManager {
  private static instance: HardwareManager;
  
  private sensors: Map<string, SensorInfo> = new Map();
  private battery: BatteryTelemetry;
  private motion: MotionData;
  private environment: EnvironmentData;
  private nfcTags: NfcTagInfo[] = [];
  private bleDevices: BleDevice[] = [];
  private events: TelemetryEvent[] = [];
  private isRunning: boolean = false;
  private listeners: ((type: string, data: any) => void)[] = [];
  private tickInterval: any = null;

  private constructor() {
    this.initHardwareInventory();
    this.initInitialTelemetry();
  }

  public static getInstance(): HardwareManager {
    if (!HardwareManager.instance) {
      HardwareManager.instance = new HardwareManager();
    }
    return HardwareManager.instance;
  }

  private initHardwareInventory() {
    const defaultSensors: SensorInfo[] = [
      {
        id: 'accel_1',
        name: 'BMI270 6-Axis Accelerometer',
        type: 'accelerometer',
        vendor: 'Bosch Sensortec',
        version: 1,
        resolution: '0.0001 m/s²',
        maxRange: '78.48 m/s² (8g)',
        minDelayMs: 5,
        powerConsumptionMa: 0.15,
        availability: 'AVAILABLE',
        currentValues: { x: 0.02, y: 0.05, z: 9.81, mag: 9.81 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 100
      },
      {
        id: 'gyro_1',
        name: 'BMI270 3-Axis Gyroscope',
        type: 'gyroscope',
        vendor: 'Bosch Sensortec',
        version: 1,
        resolution: '0.001 rad/s',
        maxRange: '34.9 rad/s',
        minDelayMs: 5,
        powerConsumptionMa: 0.6,
        availability: 'AVAILABLE',
        currentValues: { x: 0.001, y: -0.002, z: 0.004, mag: 0.004 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 100
      },
      {
        id: 'mag_1',
        name: 'BMM150 3-Axis Geomagnetic Field',
        type: 'magnetometer',
        vendor: 'Bosch Sensortec',
        version: 1,
        resolution: '0.3 μT',
        maxRange: '1300 μT',
        minDelayMs: 10,
        powerConsumptionMa: 0.2,
        availability: 'AVAILABLE',
        currentValues: { x: 21.4, y: -14.2, z: 42.1, mag: 49.3, heading: 72 },
        accuracy: 2,
        lastTimestamp: Date.now(),
        samplingRateHz: 50
      },
      {
        id: 'baro_1',
        name: 'BMP390 Digital Barometer',
        type: 'barometer',
        vendor: 'Bosch Sensortec',
        version: 1,
        resolution: '0.006 hPa',
        maxRange: '1250 hPa',
        minDelayMs: 20,
        powerConsumptionMa: 0.03,
        availability: 'AVAILABLE',
        currentValues: { pressure: 1013.25, altitude: 0.0 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 25
      },
      {
        id: 'light_1',
        name: 'TMD3725 Ambient Light Sensor',
        type: 'ambient_light',
        vendor: 'ams OSRAM',
        version: 1,
        resolution: '0.1 lux',
        maxRange: '65535 lux',
        minDelayMs: 50,
        powerConsumptionMa: 0.05,
        availability: 'AVAILABLE',
        currentValues: { lux: 245 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 10
      },
      {
        id: 'prox_1',
        name: 'TMD3725 Proximity Sensor',
        type: 'proximity',
        vendor: 'ams OSRAM',
        version: 1,
        resolution: '1.0 cm',
        maxRange: '8.0 cm',
        minDelayMs: 100,
        powerConsumptionMa: 0.08,
        availability: 'AVAILABLE',
        currentValues: { state: 'FAR', distance: 8.0 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 10
      },
      {
        id: 'nfc_1',
        name: 'NXP PN557 NFC Controller',
        type: 'nfc',
        vendor: 'NXP Semiconductors',
        version: 2,
        resolution: 'N/A',
        maxRange: '4 cm',
        minDelayMs: 0,
        powerConsumptionMa: 15.0,
        availability: 'AVAILABLE',
        currentValues: { status: 'READY_TO_SCAN' },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 10
      },
      {
        id: 'ble_1',
        name: 'Qualcomm WCN6856 Bluetooth 5.3',
        type: 'bluetooth',
        vendor: 'Qualcomm',
        version: 5,
        resolution: '1 dBm RSSI',
        maxRange: '100 m',
        minDelayMs: 1000,
        powerConsumptionMa: 4.5,
        availability: 'AVAILABLE',
        currentValues: { scannedDevices: 6 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 1
      },
      {
        id: 'gnss_1',
        name: 'Dual-Frequency GNSS (L1+L5)',
        type: 'gnss',
        vendor: 'Broadcom BCM47775',
        version: 2,
        resolution: '0.1 m',
        maxRange: 'Global',
        minDelayMs: 1000,
        powerConsumptionMa: 25.0,
        availability: 'AVAILABLE',
        currentValues: { lat: 37.7749, lon: -122.4194, alt: 14.5, accuracy: 2.1, satellites: 24 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 1
      },
      {
        id: 'humidity_1',
        name: 'Sensirion SHT40 Humidity & Temp',
        type: 'humidity',
        vendor: 'Sensirion',
        version: 1,
        resolution: '0.01 %',
        maxRange: '100 %',
        minDelayMs: 200,
        powerConsumptionMa: 0.01,
        availability: 'AVAILABLE',
        currentValues: { humidity: 52.4, temperature: 28.5 },
        accuracy: 2,
        lastTimestamp: Date.now(),
        samplingRateHz: 5
      },
      {
        id: 'camera_1',
        name: '50MP Sony IMX989 Main Camera',
        type: 'camera',
        vendor: 'Sony',
        version: 1,
        resolution: '8192x6144',
        maxRange: 'N/A',
        minDelayMs: 33,
        powerConsumptionMa: 120.0,
        availability: 'AVAILABLE',
        currentValues: { status: 'READY', focalLength: 24 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 30
      },
      {
        id: 'battery_sensor',
        name: 'Smart Battery Management IC',
        type: 'battery',
        vendor: 'Google / Maxim',
        version: 1,
        resolution: '1%',
        maxRange: '5000 mAh',
        minDelayMs: 1000,
        powerConsumptionMa: 1.0,
        availability: 'AVAILABLE',
        currentValues: { level: 84, voltage: 4.28 },
        accuracy: 3,
        lastTimestamp: Date.now(),
        samplingRateHz: 1
      }
    ];

    defaultSensors.forEach(s => this.sensors.set(s.type, s));
  }

  private initInitialTelemetry() {
    this.battery = {
      percentage: 84,
      chargingStatus: 'CHARGING',
      chargingSource: 'AC',
      voltageV: 4.28,
      currentMa: 1350, // 1.35 A
      powerW: 5.78,
      temperatureC: 31.2,
      health: 'GOOD',
      technology: 'Li-ion Polymer',
      capacityMah: 5000,
      thermalState: 'NORMAL',
      estimatedTimeRemainingMin: 85
    };

    this.motion = {
      accelX: 0.02,
      accelY: 0.05,
      accelZ: 9.81,
      accelMag: 9.81,
      gyroX: 0.001,
      gyroY: -0.002,
      gyroZ: 0.004,
      gyroMag: 0.004,
      magX: 21.4,
      magY: -14.2,
      magZ: 42.1,
      magMag: 49.3,
      headingDeg: 72,
      orientation: 'PORTRAIT',
      activityState: 'STATIONARY',
      confidence: 96
    };

    this.environment = {
      pressureHpa: 1013.25,
      altitudeM: 14.2,
      seaLevelPressureHpa: 1013.25,
      lightLux: 245,
      lightInterpretation: 'INDOOR',
      proximityState: 'FAR',
      proximityCm: 8.0,
      humidityPercent: 52.4,
      ambientTempC: 28.5
    };

    this.nfcTags = [
      {
        uid: '04:8A:B2:91:E4:28:80',
        technologies: ['NfcA', 'Ndef', 'MifareClassic'],
        ndefRecords: [
          { type: 'TEXT', payload: 'Android Sensor Lab Test Tag v1.2' },
          { type: 'URI', payload: 'https://developer.android.com' }
        ],
        writable: true,
        maxSizeKbytes: 1
      }
    ];

    this.bleDevices = [
      { address: 'A4:C1:38:52:99:10', name: 'Lab Beacon Sensor B1', rssi: -52, distanceEstM: 1.8, services: ['180F', '180A'], lastSeen: Date.now() },
      { address: 'D0:39:72:11:44:88', name: 'Smart Instrument Rig', rssi: -68, distanceEstM: 4.5, services: ['180D', '1800'], lastSeen: Date.now() },
      { address: '5C:F3:70:89:12:34', name: 'Ambient Node Gamma', rssi: -75, distanceEstM: 7.2, services: ['181A'], lastSeen: Date.now() }
    ];

    this.events = [
      { id: 'ev_1', timestamp: Date.now() - 120000, source: 'Battery', eventType: 'Charging Started', value: 'AC Connected (+1.35A)', confidence: 100, severity: 'INFO' },
      { id: 'ev_2', timestamp: Date.now() - 90000, source: 'Motion', eventType: 'State Transition', value: 'Device became STATIONARY', confidence: 96, severity: 'INFO' },
      { id: 'ev_3', timestamp: Date.now() - 45000, source: 'NFC', eventType: 'Tag Detected', value: 'NFC UID 04:8A:B2:91 (NDEF)', confidence: 100, severity: 'INFO' },
      { id: 'ev_4', timestamp: Date.now() - 15000, source: 'Magnetometer', eventType: 'Baseline Check', value: 'Magnetic field nominal (49.3 µT)', confidence: 94, severity: 'INFO' }
    ];
  }

  public startStreaming(callback: (type: string, data: any) => void) {
    if (this.isRunning) {
      this.listeners.push(callback);
      return;
    }

    this.listeners.push(callback);
    this.isRunning = true;

    this.tickInterval = setInterval(() => {
      this.updateSimulationTick();
    }, 200); // 5 Hz live UI update loop
  }

  public stopStreaming(callback: (type: string, data: any) => void) {
    this.listeners = this.listeners.filter(l => l !== callback);
    if (this.listeners.length === 0 && this.tickInterval) {
      clearInterval(this.tickInterval);
      this.isRunning = false;
    }
  }

  private updateSimulationTick() {
    // Add realistic subtle noise & variations
    const noiseAccelX = (Math.random() - 0.5) * 0.08;
    const noiseAccelY = (Math.random() - 0.5) * 0.08;
    const noiseAccelZ = 9.81 + (Math.random() - 0.5) * 0.05;
    const accelMag = Math.sqrt(noiseAccelX ** 2 + noiseAccelY ** 2 + noiseAccelZ ** 2);

    const noiseGyroX = (Math.random() - 0.5) * 0.01;
    const noiseGyroY = (Math.random() - 0.5) * 0.01;
    const noiseGyroZ = (Math.random() - 0.5) * 0.01;
    const gyroMag = Math.sqrt(noiseGyroX ** 2 + noiseGyroY ** 2 + noiseGyroZ ** 2);

    const magX = 21.4 + (Math.random() - 0.5) * 0.4;
    const magY = -14.2 + (Math.random() - 0.5) * 0.4;
    const magZ = 42.1 + (Math.random() - 0.5) * 0.4;
    const magMag = Math.sqrt(magX ** 2 + magY ** 2 + magZ ** 2);

    this.motion = {
      ...this.motion,
      accelX: Number(noiseAccelX.toFixed(3)),
      accelY: Number(noiseAccelY.toFixed(3)),
      accelZ: Number(noiseAccelZ.toFixed(3)),
      accelMag: Number(accelMag.toFixed(3)),
      gyroX: Number(noiseGyroX.toFixed(4)),
      gyroY: Number(noiseGyroY.toFixed(4)),
      gyroZ: Number(noiseGyroZ.toFixed(4)),
      gyroMag: Number(gyroMag.toFixed(4)),
      magX: Number(magX.toFixed(1)),
      magY: Number(magY.toFixed(1)),
      magZ: Number(magZ.toFixed(1)),
      magMag: Number(magMag.toFixed(1))
    };

    // Slight voltage/current flicker
    const vFlicker = 4.28 + (Math.random() - 0.5) * 0.02;
    const iFlicker = 1350 + Math.floor((Math.random() - 0.5) * 50);
    const powerW = Number(((vFlicker * iFlicker) / 1000).toFixed(2));

    this.battery = {
      ...this.battery,
      voltageV: Number(vFlicker.toFixed(2)),
      currentMa: iFlicker,
      powerW: powerW
    };

    // Notify listeners
    const payload = {
      motion: this.motion,
      battery: this.battery,
      environment: this.environment,
      timestamp: Date.now()
    };

    this.listeners.forEach(cb => cb('tick', payload));
  }

  public getSensors(): SensorInfo[] {
    return Array.from(this.sensors.values());
  }

  public getBattery(): BatteryTelemetry {
    return this.battery;
  }

  public getMotion(): MotionData {
    return this.motion;
  }

  public getEnvironment(): EnvironmentData {
    return this.environment;
  }

  public getNfcTags(): NfcTagInfo[] {
    return this.nfcTags;
  }

  public getBleDevices(): BleDevice[] {
    return this.bleDevices;
  }

  public getEvents(): TelemetryEvent[] {
    return this.events;
  }

  public addEvent(source: string, eventType: string, value: string, severity: 'INFO' | 'WARNING' | 'CRITICAL' | 'ANOMALY' = 'INFO') {
    const newEvent: TelemetryEvent = {
      id: `ev_${Date.now()}`,
      timestamp: Date.now(),
      source,
      eventType,
      value,
      confidence: 98,
      severity
    };
    this.events = [newEvent, ...this.events.slice(0, 49)];
    return newEvent;
  }

  public getDeviceHealth(): DeviceHealth {
    const batteryComp: HealthScoreComponent = {
      name: 'Battery & Power',
      score: 92,
      maxScore: 100,
      status: 'EXCELLENT',
      details: 'Health GOOD, 4.28V, Normal thermal state.'
    };

    const thermalComp: HealthScoreComponent = {
      name: 'Thermal Stability',
      score: 95,
      maxScore: 100,
      status: 'EXCELLENT',
      details: 'Current device temp 31.2°C (Optimal).'
    };

    const sensorsComp: HealthScoreComponent = {
      name: 'Hardware Sensors',
      score: 100,
      maxScore: 100,
      status: 'EXCELLENT',
      details: '14 hardware sensors active and calibrated.'
    };

    const storageComp: HealthScoreComponent = {
      name: 'Storage & Memory',
      score: 88,
      maxScore: 100,
      status: 'GOOD',
      details: '192GB / 256GB used (75%), RAM 6.2GB / 12GB.'
    };

    const networkComp: HealthScoreComponent = {
      name: 'Connectivity & RF',
      score: 90,
      maxScore: 100,
      status: 'EXCELLENT',
      details: 'BLE active (6 devices), NFC ready, GNSS locked.'
    };

    const overall = Math.round(
      (batteryComp.score + thermalComp.score + sensorsComp.score + storageComp.score + networkComp.score) / 5
    );

    return {
      overallScore: overall,
      components: [batteryComp, thermalComp, sensorsComp, storageComp, networkComp]
    };
  }
}
