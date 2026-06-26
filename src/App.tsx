import { useState, useCallback, useEffect } from 'react';
import { EquipmentChecklist } from './components/EquipmentChecklist';
import { GerminationSelector } from './components/GerminationSelector';
import { EnvironmentalLogger } from './components/EnvironmentalLogger';
import { SubzeroProtocol } from './components/SubzeroProtocol';
import { Guardrails } from './components/Guardrails';
import { AUTO_TRACKER_PHASES } from './data/autoTracker';
import type { EnvironmentalReading, PersistedState, UserProfile } from './data/types';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { loadGrowState, saveGrowState, loadUserProfile } from './services/firestoreService';
import AuthScreen from './components/AuthScreen';

type Tab = 'equipment' | 'setup' | 'germination' | 'vegetative' | 'flower' | 'logger' | 'guardrails';

function getDaysSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}

const STORAGE_KEY = 'go-green-auto-state';

function loadLocalState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLocalState(state: PersistedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authReady, setAuthReady] = useState(false);

  const saved = loadLocalState();
  const [tab, setTab] = useState<Tab>('equipment');
  const [breederLifecycle, setBreederLifecycle] = useState(saved?.breederLifecycle || 80);
  const [startDate, setStartDate] = useState(saved?.startDate || '');
  const [currentDay, setCurrentDay] = useState(saved?.currentDay || 1);
  const [germPath, setGermPath] = useState<'direct' | 'transplant' | null>(saved?.germPath || null);
  const [subzeroActive, setSubzeroActive] = useState(saved?.subzeroActive || false);
  const [readings, setReadings] = useState<EnvironmentalReading[]>(saved?.readings || []);
  const [setupComplete, setSetupComplete] = useState(saved?.setupComplete || false);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>(
    saved?.completedCheckpoints || {}
  );
  const [timestamps, setTimestamps] = useState<Record<string, string>>(
    saved?.timestamps || {}
  );
  const [firestoreLoading, setFirestoreLoading] = useState(false);

  // Auth listener — loads state from Firestore when user signs in
  useEffect(() => {
    console.log('[Auth] Setting up auth listener');
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      console.log('[Auth] Auth state changed:', fbUser ? `uid=${fbUser.uid}` : 'null');
      if (fbUser) {
        let profile: UserProfile = {
          uid: fbUser.uid,
          email: fbUser.email || '',
        };
        setUser(profile);
        setFirestoreLoading(true);
        try {
          // Load name from profile document
          const existingProfile = await loadUserProfile(fbUser.uid);
          if (existingProfile?.name) {
            profile = { ...profile, name: existingProfile.name };
            setUser(profile);
          }

          const cloudState = await loadGrowState(fbUser.uid);
          if (cloudState) {
            setBreederLifecycle(cloudState.breederLifecycle);
            setStartDate(cloudState.startDate);
            setCurrentDay(cloudState.currentDay);
            setCompletedCheckpoints(cloudState.completedCheckpoints);
            setTimestamps(cloudState.timestamps);
            setSetupComplete(cloudState.setupComplete);
            setGermPath(cloudState.germPath);
            setSubzeroActive(cloudState.subzeroActive);
            setReadings(cloudState.readings);
          } else {
            // First login — migrate any localStorage data to Firestore
            const local = loadLocalState();
            if (local) {
              await saveGrowState(fbUser.uid, local);
            }
          }
        } catch (e) {
          console.error('[Firestore] Failed to load state:', e);
        } finally {
          setFirestoreLoading(false);
        }
      } else {
        setUser(null);
      }
      console.log('[Auth] Setting authReady=true');
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  const getFullState = useCallback((): PersistedState => ({
    breederLifecycle,
    startDate,
    currentDay,
    completedCheckpoints,
    timestamps,
    setupComplete,
    germPath,
    subzeroActive,
    readings,
  }), [breederLifecycle, startDate, currentDay, completedCheckpoints, timestamps, setupComplete, germPath, subzeroActive, readings]);

  // Persist to Firestore + localStorage fallback
  const persist = useCallback(async (updates: Partial<PersistedState>) => {
    const base = getFullState();
    const next = { ...base, ...updates };
    saveLocalState(next);
    if (user) {
      try {
        await saveGrowState(user.uid, next);
      } catch (e) {
        console.error('[Firestore] Failed to save state:', e);
      }
    }
  }, [getFullState, user]);

  const handleStartGrow = () => {
    const day = startDate ? getDaysSince(startDate) : 1;
    setCurrentDay(day);
    setSetupComplete(true);
    setTab('germination');
    persist({ setupComplete: true, currentDay: day });
  };

  const handleUpdateCalculations = () => {
    const day = startDate ? getDaysSince(startDate) : 1;
    setCurrentDay(day);
    persist({ currentDay: day });
  };

  const handleToggleCheckpoint = useCallback((checkpointId: string) => {
    setCompletedCheckpoints(prev => {
      const nextCp = { ...prev, [checkpointId]: !prev[checkpointId] };
      return nextCp;
    });
    setTimestamps(prev => {
      const nextTs = { ...prev };
      if (!nextTs[checkpointId]) {
        nextTs[checkpointId] = new Date().toISOString().split('T')[0];
      } else {
        delete nextTs[checkpointId];
      }
      return nextTs;
    });
  }, []);

  useEffect(() => {
    if (setupComplete) {
      persist({ completedCheckpoints, timestamps });
    }
  }, [completedCheckpoints, timestamps, setupComplete, persist]);

  const addReading = useCallback((reading: EnvironmentalReading) => {
    setReadings(prev => {
      const next = [...prev, reading];
      persist({ readings: next });
      return next;
    });
  }, [persist]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setTab('equipment');
    setBreederLifecycle(80);
    setStartDate('');
    setCurrentDay(1);
    setGermPath(null);
    setSubzeroActive(false);
    setReadings([]);
    setSetupComplete(false);
    setCompletedCheckpoints({});
    setTimestamps({});
  };

  // Show auth screen until Firebase auth initializes
  if (!authReady) {
    return (
      <div className="app">
        <div className="loading-wrap">
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuth={(profile) => setUser(profile)} />;
  }

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
              ? `Days ${phase.phaseStartDay}&ndash;${phase.phaseEndDay}`
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

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">Go Green</h1>
            <p className="tagline">Elite Autoflower Grow Guide</p>
          </div>
          <div className="header-right">
            {user?.name && <span className="user-name">{user.name}</span>}
            {firestoreLoading && <span className="sync-badge syncing">Syncing...</span>}
            <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
      </header>

      <nav className="nav">
        <button className={tab === 'equipment' ? 'active' : ''} onClick={() => setTab('equipment')}>Equipment</button>
        <button className={tab === 'setup' ? 'active' : ''} onClick={() => setTab('setup')}>Setup</button>
        <button className={tab === 'germination' ? 'active' : ''} onClick={() => setTab('germination')}>Germination</button>
        <button className={tab === 'vegetative' ? 'active' : ''} onClick={() => setTab('vegetative')}>Vegetative</button>
        <button className={tab === 'flower' ? 'active' : ''} onClick={() => setTab('flower')}>Flower</button>
        <button className={tab === 'logger' ? 'active' : ''} onClick={() => setTab('logger')}>Logger</button>
        <button className={tab === 'guardrails' ? 'active' : ''} onClick={() => setTab('guardrails')}>Guardrails</button>
      </nav>

      <main className="main">
        {tab === 'equipment' && <EquipmentChecklist completedCheckpoints={completedCheckpoints} onToggleCheckpoint={handleToggleCheckpoint} />}

        {tab === 'setup' && (
          <div className="setup-panel">
            <h2>Grow Configuration</h2>
            <p className="subtext">Configure your breeder lifecycle and start date. The app calculates all dynamic windows automatically.</p>
            <div className="setup-form">
              <label>
                Breeder Lifecycle (days)
                <input type="number" value={breederLifecycle} onChange={e => { setBreederLifecycle(parseInt(e.target.value) || 80); persist({ breederLifecycle: parseInt(e.target.value) || 80 }); }} min={60} max={120} />
                <span className="hint">Projected days from seed to harvest. Common: 75 (fast), 80 (standard), 90 (heavy sativa).</span>
              </label>
              <label>
                Start Date
                <input type="date" value={startDate} onChange={e => { setStartDate(e.target.value); persist({ startDate: e.target.value }); }} />
                <span className="hint">The day you planted the seed. Leave blank to start from Day 1.</span>
              </label>
            </div>

            <div className="setup-preview">
              <h3>Calculated Windows</h3>
              <div className="calc-grid">
                <div className="calc-item"><span className="calc-label">Current Day</span><span className="calc-val">Day {currentDay}</span></div>
                <div className="calc-item"><span className="calc-label">Subzero Protocol Starts</span><span className="calc-val">Day {subzeroStart}</span></div>
                <div className="calc-item"><span className="calc-label">Dryback Sequence Starts</span><span className="calc-val">Day {drybackStart}</span></div>
                <div className="calc-item"><span className="calc-label">Ice Water Flush</span><span className="calc-val">Day {iceFlushDay}</span></div>
                <div className="calc-item"><span className="calc-label">Darkness Dump Starts</span><span className="calc-val">Day {darknessStart}</span></div>
                <div className="calc-item"><span className="calc-label">Projected Harvest</span><span className="calc-val">Day {breederLifecycle}</span></div>
              </div>
            </div>

            {!setupComplete ? (
              <button className="btn-primary" onClick={handleStartGrow}>Start Grow</button>
            ) : (
              <button className="btn-primary" onClick={handleUpdateCalculations}>Update Calculations</button>
            )}
          </div>
        )}

        {tab === 'germination' && (
          <GerminationSelector
            selectedPath={germPath}
            onSelectPath={(path) => { setGermPath(path); persist({ germPath: path }); }}
            completedCheckpoints={completedCheckpoints}
            timestamps={timestamps}
            onToggleCheckpoint={handleToggleCheckpoint}
          />
        )}

        {tab === 'vegetative' && renderPhaseChecklist(1)}
        {tab === 'flower' && (
          <>
            {renderPhaseChecklist(2)}
            <SubzeroProtocol active={subzeroActive} onToggle={() => { setSubzeroActive(v => !v); persist({ subzeroActive: !subzeroActive }); }} currentDay={currentDay} breederLifecycle={breederLifecycle} />
          </>
        )}

        {tab === 'logger' && <EnvironmentalLogger readings={readings} onAddReading={addReading} currentDay={currentDay} />}
        {tab === 'guardrails' && <Guardrails />}
      </main>

      <footer className="footer">
        <p>The trichomes under the loupe always dictate the final timeline, not just the calendar day.</p>
      </footer>
    </div>
  );
}
