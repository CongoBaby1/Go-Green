export interface GrowSetup {
  breederLifecycle: number;
  startDate: string;
  currentDay: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export interface GrowDay {
  day: number;
  stage: string;
  title: string;
  instructions: string[];
  wateringVolume?: string;
  envTargets?: string;
  warnings?: string[];
  milestones?: string[];
}

export interface Milestone {
  day: number;
  label: string;
  description: string;
  technicalTarget: string;
}

export interface GerminationPath {
  id: 'direct' | 'transplant';
  name: string;
  steps: { step: number; title: string; instructions: string[] }[];
}

export interface EnvironmentalReading {
  date: string;
  temperature: number;
  humidity: number;
  soilTension: number;
  wateringMl: number;
  notes: string;
}

export interface PersistedState {
  breederLifecycle: number;
  startDate: string;
  currentDay: number;
  completedCheckpoints: Record<string, boolean>;
  timestamps: Record<string, string>;
  setupComplete: boolean;
  germPath: 'direct' | 'transplant' | null;
  subzeroActive: boolean;
  readings: EnvironmentalReading[];
}

export interface UserProfile {
  uid: string;
  email: string;
  name?: string;
}
