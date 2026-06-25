export interface PhotoEquipmentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export interface PhotoPhase {
  phase: string;
  stage: string;
  title: string;
  instructions: string[];
  wateringVolume?: string;
  envTargets?: string;
  warnings?: string[];
  milestones?: string[];
  manualTrigger?: boolean;
  triggerLabel?: string;
}

export interface PhotoMilestone {
  phase: string;
  label: string;
  description: string;
  technicalTarget: string;
}

export interface PhotoGerminationPath {
  id: 'solo-cup';
  name: string;
  steps: { step: number; title: string; instructions: string[] }[];
}

export interface PhotoEnvironmentalReading {
  date: string;
  temperature: number;
  humidity: number;
  ppm: number;
  ph: number;
  wateringMl: number;
  notes: string;
}
