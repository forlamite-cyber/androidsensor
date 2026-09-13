export type SensorAvailability = 'AVAILABLE' | 'PARTIALLY_AVAILABLE' | 'UNAVAILABLE' | 'ESTIMATED' | 'DERIVED' | 'EXTERNAL_SENSOR';

export type SensorType = 
  | 'accelerometer'
  | 'gyroscope'
  | 'magnetometer'
  | 'gravity'
  | 'linear_acceleration'
  | 'rotation_vector'
  | 'barometer'
  | 'ambient_light'
  | 'proximity'
  | 'humidity'
  | 'ambient_temperature'
  | 'device_temperature'
  | 'nfc'
  | 'bluetooth'
  | 'gnss'
  | 'camera'
  | 'microphone'
  | 'battery'
  | 'cpu'
  | 'memory'
  | 'storage';

export interface SensorInfo {
  id: string;
  name: string;
  type: SensorType;
  vendor: string;
  version: number;
  resolution: string;
  maxRange: string;
  minDelayMs: number;
  powerConsumptionMa: number;
  availability: SensorAvailability;
  currentValues: Record<string, number | string>;
  accuracy: number; // 0-3 (Android standard)
  lastTimestamp: number;
  samplingRateHz: number;
}

export interface BatteryTelemetry {
  percentage: number;
  chargingStatus: 'CHARGING' | 'DISCHARGING' | 'FULL' | 'UNKNOWN';
  chargingSource: 'AC' | 'USB' | 'WIRELESS' | 'NONE';
  voltageV: number;
  currentMa: number | null; // null if unavailable
  powerW: number | null;
  temperatureC: number;
  health: 'GOOD' | 'OVERHEAT' | 'DEAD' | 'COLD' | 'UNSPECIFIED';
  technology: string;
  capacityMah: number;
  thermalState: 'NORMAL' | 'WARM' | 'HOT' | 'CRITICAL';
  estimatedTimeRemainingMin: number | null;
}

export interface MotionData {
  accelX: number;
  accelY: number;
  accelZ: number;
  accelMag: number;
  gyroX: number;
  gyroY: number;
  gyroZ: number;
  gyroMag: number;
  magX: number;
  magY: number;
  magZ: number;
  magMag: number;
  headingDeg: number;
  orientation: 'PORTRAIT' | 'LANDSCAPE' | 'FLAT_UP' | 'FLAT_DOWN' | 'UNKNOWN';
  activityState: 'STATIONARY' | 'WALKING' | 'RUNNING' | 'VEHICLE' | 'SHAKING' | 'UNKNOWN';
  confidence: number;
}

export interface EnvironmentData {
  pressureHpa: number;
  altitudeM: number;
  seaLevelPressureHpa: number;
  lightLux: number;
  lightInterpretation: 'DARK' | 'LOW_LIGHT' | 'INDOOR' | 'BRIGHT_INDOOR' | 'OUTDOOR';
  proximityState: 'NEAR' | 'FAR';
  proximityCm: number | null;
  humidityPercent: number | null;
  ambientTempC: number | null;
}

export interface NfcTagInfo {
  uid: string;
  technologies: string[];
  ndefRecords: {
    type: 'TEXT' | 'URI' | 'MIME' | 'CONTACT';
    payload: string;
    mimeType?: string;
  }[];
  writable: boolean;
  maxSizeKbytes: number;
}

export interface BleDevice {
  address: string;
  name: string;
  rssi: number;
  distanceEstM: number;
  services: string[];
  lastSeen: number;
}

export interface TelemetryEvent {
  id: string;
  timestamp: number;
  source: string;
  eventType: string;
  value: string;
  confidence: number;
  severity: 'INFO' | 'WARNING' | 'CRITICAL' | 'ANOMALY';
}

export interface HealthScoreComponent {
  name: string;
  score: number; // 0-100
  maxScore: number;
  status: 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL';
  details: string;
}

export interface DeviceHealth {
  overallScore: number;
  components: HealthScoreComponent[];
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'power' | 'motion' | 'magnetic' | 'environment' | 'nfc' | 'fusion' | 'health' | 'battery_temp' | 'barometer' | 'light' | 'activity';
  enabled: boolean;
  pinned: boolean;
  size: 'small' | 'medium' | 'large';
  order: number;
}

export interface RecordingSession {
  id: string;
  name: string;
  startTime: number;
  durationSec: number;
  sensorsRecorded: string[];
  samplingRateHz: number;
  eventsCount: number;
  dataPointsCount: number;
}
