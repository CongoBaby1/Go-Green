import { useState, useCallback, useEffect } from 'react';
import { EquipmentChecklist } from './components/EquipmentChecklist';
import { GerminationSelector } from './components/GerminationSelector';
import { EnvironmentalLogger } from './components/EnvironmentalLogger';
import { SubzeroProtocol } from './components/SubzeroProtocol';
import { Guardrails } from './components/Guardrails';
import { AUTO_TRACKER_PHASES } from './data/autoTracker';
import type { EnvironmentalReading } from './data/types';

type Tab = 'setup' | 'equipment' | 'germination' | 'vegetative' | 'flower' | 'logger' | 'subzero' | 'guardrails';

function getDaysSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}

const STORAGE_KEY = 'go-green-auto-state';

interface PersistedState {
  breederLifecycle: number;
  startDate: string;
  currentDay: number;
  completedCheckpoints: Record<string, boolean>;
  timestamps: Record<string, string>;
  setupComplete: boolean;
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

export default function App() {
  const saved = loadState();
  const [tab, setTab] = useState<Tab>(saved?.setupComplete ? 'germination' : 'setup');
  const [breederLifecycle, setBreederLifecycle] = useState(saved?.breederLifecycle || 80);
  const [startDate, setStartDate] = useState(saved?.startDate || '');
  const [currentDay, setCurrentDay] = useState(saved?.currentDay || 1);
  const [germPath, setGermPath] = useState<'direct' | 'transplant' | null>(null);
  const [subzeroActive, setSubzeroActive] = useState(false);
  const [readings, setReadings] = useState<EnvironmentalReading[]>([]);
  const [setupComplete, setSetupComplete] = useState(saved?.setupComplete || false);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>(
    saved?.completedCheckpoints || {}
  );
  const [timestamps, setTimestamps] = useState<Record<string, string>>(
    saved?.timestamps || {}
  );

  const persist = useCallback((updates: Partial<PersistedState>) => {
    const base: PersistedState = {
      breederLifecycle,
      startDate,
      currentDay,
      completedCheckpoints,
      timestamps,
      setupComplete,
    };
    const next = { ...base, ...updates };
    saveState(next);
  }, [breederLifecycle, startDate, currentDay, completedCheckpoints, timestamps, setupComplete]);

  const handleSetup = () => {
    const day = startDate ? getDaysSince(startDate) : 1;
    setCurrentDay(day);
    setSetupComplete(true);
    setTab('germination');
    persist({ setupComplete: true, currentDay: day });
  };

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
    if (setupComplete) {
      persist({ completedCheckpoints, timestamps });
    }
  }, [completedCheckpoints, timestamps, setupComplete, persist]);

  const addReading = useCallback((reading: EnvironmentalReading) => {
    setReadings(prev => [...prev, reading]);
  }, []);

  // Dynamic calculations
  const subzeroStart = breederLifecycle - 14;
  const drybackStart = breederLifecycle - 7;
  const iceFlushDay = breederLifecycle - 3;
  const darknessStart = breederLifecycle - 2;

  const renderPhaseChecklist = (phaseIndex: number) => {
    const phase = AUTO_TRACKER_PHASES[phaseIndex];
    if (!phase) return null;
    return (
      <div className="phase-checklist">
        <div className="checklist-header">
          <h3>{phase.phaseName}</h3>
          <span className="phase-range">
            {phase.phaseEndDay
              ? `Days ${phase.phaseStartDay}–${phase.phaseEndDay}`
              : `Days ${phase.phaseStartDay}+`}
          </span>
        </div>
        <div className="checkpoints">
          {phase.checkpoints.map(cp => {
            const checked = !!completedCheckpoints[cp.id];
            return (
              <label key={cp.id} className={`checkpoint-row ${checked ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleToggleCheckpoint(cp.id)}
                />
                <span className="checkpoint-label">{cp.label}</span>
                {timestamps[cp.id] && <span className="checkpoint-ts">{timestamps[cp.id]}</span>}
              </label>
            );
          })}
        </div>
        {phase.dynamicOutput && phase.dynamicOutput.length > 0 && (
          <div className="dynamic-output">
            <h4>Dynamic Output</h4>
            {phase.dynamicOutput.map((out, i) => (
              <p key={i} className="dynamic-line">{out}</p>
            ))}
          </div>
        )}
        {phase.guardrail && phase.guardrail.length > 0 && (
          <div className="guardrail-block">
            <h4>Automated Guardrail</h4>
            {phase.guardrail.map((g, i) => (
              <p key={i} className="guardrail-line">{g}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!setupComplete) {
    return (
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1 className="logo">Go Green</h1>
            <p className="tagline">Elite Autoflower Grow Guide</p>
          </div>
        </header>
        <main className="main">
          <div className="setup-panel">
            <h2>Grow Setup</h2>
            <p className="subtext">Configure your breeder lifecycle and start date. The app calculates all dynamic windows automatically.</p>
            <div className="setup-form">
              <label>
                Breeder Lifecycle (days)
                <input type="number" value={breederLifecycle} onChange={e => setBreederLifecycle(parseInt(e.target.value) || 80)} min={60} max={120} />
                <span className="hint">Projected days from seed to harvest. Common: 75 (fast), 80 (standard), 90 (heavy sativa).</span>
              </label>
              <label>
                Start Date
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <span className="hint">The day you planted the seed. Leave blank to start from Day 1.</span>
              </label>
            </div>
            <div className="setup-preview">
              <h3>Calculated Windows</h3>
              <div className="calc-grid">
                <div className="calc-item"><span className="calc-label">Subzero Protocol Starts</span><span className="calc-val">Day {subzeroStart}</span></div>
                <div className="calc-item"><span className="calc-label">Dryback Sequence Starts</span><span className="calc-val">Day {drybackStart}</span></div>
                <div className="calc-item"><span className="calc-label">Ice Water Flush</span><span className="calc-val">Day {iceFlushDay}</span></div>
                <div className="calc-item"><span className="calc-label">Darkness Dump Starts</span><span className="calc-val">Day {darknessStart}</span></div>
                <div className="calc-item"><span className="calc-label">Projected Harvest</span><span className="calc-val">Day {breederLifecycle}</span></div>
              </div>
            </div>
            <button className="btn-primary" onClick={handleSetup}>Start Grow</button>
          </div>
        </main>
        <footer className="footer"><p>The trichomes under the loupe always dictate the final timeline, not just the calendar day.</p></footer>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Go Green</h1>
          <p className="tagline">Elite Autoflower Grow Guide</p>
        </div>
      </header>

      <nav className="nav">
        <button className={tab === 'setup' ? 'active' : ''} onClick={() => setTab('setup')}>Setup</button>
        <button className={tab === 'equipment' ? 'active' : ''} onClick={() => setTab('equipment')}>Equipment</button>
        <button className={tab === 'germination' ? 'active' : ''} onClick={() => setTab('germination')}>Germination</button>
        <button className={tab === 'vegetative' ? 'active' : ''} onClick={() => setTab('vegetative')}>Vegetative</button>
        <button className={tab === 'flower' ? 'active' : ''} onClick={() => setTab('flower')}>Flower</button>
        <button className={tab === 'logger' ? 'active' : ''} onClick={() => setTab('logger')}>Logger</button>
        <button className={tab === 'subzero' ? 'active' : ''} onClick={() => setTab('subzero')}>Subzero</button>
        <button className={tab === 'guardrails' ? 'active' : ''} onClick={() => setTab('guardrails')}>Guardrails</button>
      </nav>

      <main className="main">
        {tab === 'setup' && (
          <div className="setup-panel">
            <h2>Grow Configuration</h2>
            <div className="setup-form">
              <label>
                Breeder Lifecycle (days)
                <input type="number" value={breederLifecycle} onChange={e => setBreederLifecycle(parseInt(e.target.value) || 80)} min={60} max={120} />
              </label>
              <label>
                Start Date
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </label>
              <button className="btn-primary" onClick={handleSetup}>Update Calculations</button>
            </div>
            <div className="setup-preview">
              <h3>Active Calculated Windows</h3>
              <div className="calc-grid">
                <div className="calc-item"><span className="calc-label">Current Day</span><span className="calc-val">Day {currentDay}</span></div>
                <div className="calc-item"><span className="calc-label">Subzero Protocol Starts</span><span className="calc-val">Day {subzeroStart}</span></div>
                <div className="calc-item"><span className="calc-label">Dryback Sequence Starts</span><span className="calc-val">Day {drybackStart}</span></div>
                <div className="calc-item"><span className="calc-label">Ice Water Flush</span><span className="calc-val">Day {iceFlushDay}</span></div>
                <div className="calc-item"><span className="calc-label">Darkness Dump Starts</span><span className="calc-val">Day {darknessStart}</span></div>
                <div className="calc-item"><span className="calc-label">Projected Harvest</span><span className="calc-val">Day {breederLifecycle}</span></div>
              </div>
            </div>
          </div>
        )}

        {tab === 'equipment' && <EquipmentChecklist />}

        {tab === 'germination' && (
          <GerminationSelector
            selectedPath={germPath}
            onSelectPath={setGermPath}
            completedCheckpoints={completedCheckpoints}
            timestamps={timestamps}
            onToggleCheckpoint={handleToggleCheckpoint}
          />
        )}

        {tab === 'vegetative' && renderPhaseChecklist(1)}
        {tab === 'flower' && renderPhaseChecklist(2)}

        {tab === 'logger' && <EnvironmentalLogger readings={readings} onAddReading={addReading} currentDay={currentDay} />}
        {tab === 'subzero' && <SubzeroProtocol active={subzeroActive} onToggle={() => setSubzeroActive(v => !v)} currentDay={currentDay} breederLifecycle={breederLifecycle} />}
        {tab === 'guardrails' && <Guardrails />}
      </main>

      <footer className="footer">
        <p>The trichomes under the loupe always dictate the final timeline, not just the calendar day.</p>
      </footer>
    </div>
  );
}
