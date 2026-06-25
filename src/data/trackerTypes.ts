export interface TrackerCheckpoint {
  id: string;
  label: string;
  checked?: boolean;
  timestamp?: string;
}

export interface TrackerPhase {
  phaseId: string;
  phaseName: string;
  phaseStartDay: number;
  phaseEndDay: number | null;
  checkpoints: TrackerCheckpoint[];
  dynamicOutput?: string[];
  guardrail?: string[];
}

export interface GrowState {
  seedType: 'auto' | 'photo';
  breederLifecycle: number;
  startDate: string;
  currentDay: number;
  currentPhaseIndex: number;
  flipped: boolean;
  completedCheckpoints: Record<string, boolean>;
  timestamps: Record<string, string>;
}
