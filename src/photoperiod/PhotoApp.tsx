import { useState, useCallback, useEffect } from 'react';
import { PhotoEquipmentChecklist } from './components/PhotoEquipmentChecklist';
import { PhotoGerminationSelector } from './components/PhotoGerminationSelector';
import { PhotoGrowTimeline } from './components/PhotoGrowTimeline';
import { PhotoPhaseDetail } from './components/PhotoPhaseDetail';
import { PhotoEnvironmentalLogger } from './components/PhotoEnvironmentalLogger';
import { PhotoGuardrails } from './components/PhotoGuardrails';
import { PhotoTracker } from './components/PhotoTracker';
import type { PhotoEnvironmentalReading } from './data/types';

type Tab = 'tracker' | 'equipment' | 'germination' | 'timeline' | 'logger' | 'guardrails';

const STORAGE_KEY = 'go-green-photo-state';

interface PersistedState {
  completedCheckpoints: Record<string, boolean>;
  timestamps: Record<string, string>;
  flipped: boolean;
}

function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function PhotoApp() {
  const saved = loadState();
  const [tab, setTab] = useState<Tab>('tracker');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);
  const [germPath, setGermPath] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(saved?.flipped || false);
  const [readings, setReadings] = useState<PhotoEnvironmentalReading[]>([]);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>(
    saved?.completedCheckpoints || {}
  );
  const [timestamps, setTimestamps] = useState<Record<string, string>>(
    saved?.timestamps || {}
  );

  const persist = useCallback(() => {
    const state: PersistedState = {
      completedCheckpoints,
      timestamps,
      flipped,
    };
    saveState(state);
  }, [completedCheckpoints, timestamps, flipped]);

  const handleToggleCheckpoint = useCallback((checkpointId: string) => {
    setCompletedCheckpoints(prev => {
      const next = { ...prev, [checkpointId]: !prev[checkpointId] };
      return next;
    });
    setTimestamps(prev => {
      const next = { ...prev };
      if (!next[checkpointId]) {
        next[checkpointId] = new Date().toISOString().split('T')[0];
      } else {
        delete next[checkpointId];
      }
      return next;
    });
  }, []);

  useEffect(() => {
    persist();
  }, [completedCheckpoints, timestamps, flipped, persist]);

  const handleFlip = useCallback(() => {
    setFlipped(true);
    setCurrentPhaseIndex(prev => Math.max(prev, 8));
    // Auto-check the flip checkpoint
    setCompletedCheckpoints(prev => ({ ...prev, 'light-12-12': true }));
    setTimestamps(prev => ({ ...prev, 'light-12-12': new Date().toISOString().split('T')[0] }));
  }, []);

  const handlePhaseSelect = useCallback((index: number) => {
    setSelectedPhaseIndex(index);
    setTab('timeline');
  }, []);

  const addReading = useCallback((reading: PhotoEnvironmentalReading) => {
    setReadings(prev => [...prev, reading]);
  }, []);

  return (
    <div className="app photo-app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Go Green</h1>
          <p className="tagline">G7 Photoperiod Genetics Blueprint</p>
        </div>
      </header>

      <nav className="nav">
        <button className={tab === 'tracker' ? 'active' : ''} onClick={() => setTab('tracker')}>Tracker</button>
        <button className={tab === 'equipment' ? 'active' : ''} onClick={() => setTab('equipment')}>Equipment</button>
        <button className={tab === 'germination' ? 'active' : ''} onClick={() => setTab('germination')}>Germination</button>
        <button className={tab === 'timeline' ? 'active' : ''} onClick={() => setTab('timeline')}>Timeline</button>
        <button className={tab === 'logger' ? 'active' : ''} onClick={() => setTab('logger')}>Logger</button>
        <button className={tab === 'guardrails' ? 'active' : ''} onClick={() => setTab('guardrails')}>Guardrails</button>
      </nav>

      <main className="main">
        {tab === 'tracker' && (
          <PhotoTracker
            completedCheckpoints={completedCheckpoints}
            timestamps={timestamps}
            onToggleCheckpoint={handleToggleCheckpoint}
            onFlip={handleFlip}
          />
        )}

        {tab === 'equipment' && <PhotoEquipmentChecklist completedCheckpoints={completedCheckpoints} onToggleCheckpoint={handleToggleCheckpoint} />}

        {tab === 'germination' && (
          <PhotoGerminationSelector
            selectedPath={germPath}
            onSelectPath={setGermPath}
          />
        )}

        {tab === 'timeline' && (
          <PhotoGrowTimeline
            currentPhaseIndex={currentPhaseIndex}
            selectedPhaseIndex={selectedPhaseIndex}
            onSelectPhase={handlePhaseSelect}
            flipped={flipped}
          />
        )}

        {tab === 'timeline' && selectedPhaseIndex !== null && (
          <PhotoPhaseDetail
            phaseIndex={selectedPhaseIndex}
            currentPhaseIndex={currentPhaseIndex}
            onSetCurrentPhase={setCurrentPhaseIndex}
            flipped={flipped}
            onFlip={handleFlip}
          />
        )}

        {tab === 'logger' && (
          <PhotoEnvironmentalLogger
            readings={readings}
            onAddReading={addReading}
          />
        )}

        {tab === 'guardrails' && <PhotoGuardrails />}
      </main>

      <footer className="footer">
        <p>The loupe dictates the final timeline, not the calendar.</p>
      </footer>
    </div>
  );
}
