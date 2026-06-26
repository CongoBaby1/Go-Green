import { useState, useCallback, useEffect } from 'react';
import { PhotoEquipmentChecklist } from './components/PhotoEquipmentChecklist';
import { PhotoGerminationSelector } from './components/PhotoGerminationSelector';
import { PhotoGrowTimeline } from './components/PhotoGrowTimeline';
import { PhotoPhaseDetail } from './components/PhotoPhaseDetail';
import { PhotoEnvironmentalLogger } from './components/PhotoEnvironmentalLogger';
import { PhotoGuardrails } from './components/PhotoGuardrails';
import { PhotoTracker } from './components/PhotoTracker';
import { PHOTO_TRACKER_PHASES } from '../data/photoTracker';
import type { PhotoEnvironmentalReading, PhotoFeedingEvent, PhotoPersistedState, UserProfile } from './data/types';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { loadPhotoGrowState, savePhotoGrowState, loadUserProfile } from '../services/firestoreService';
import AuthScreen from '../components/AuthScreen';

type Tab = 'tracker' | 'equipment' | 'germination' | 'timeline' | 'logger' | 'guardrails';

const STORAGE_KEY = 'go-green-photo-state';

function loadLocalState(): PhotoPersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveLocalState(state: PhotoPersistedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function PhotoApp() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [firestoreLoading, setFirestoreLoading] = useState(false);

  const saved = loadLocalState();
  const [tab, setTab] = useState<Tab>('tracker');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);
  const [germPath, setGermPath] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(saved?.flipped || false);
  const [readings, setReadings] = useState<PhotoEnvironmentalReading[]>([]);
  const [feedings, setFeedings] = useState<PhotoFeedingEvent[]>(saved?.feedings || []);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, boolean>>(
    saved?.completedCheckpoints || {}
  );
  const [timestamps, setTimestamps] = useState<Record<string, string>>(
    saved?.timestamps || {}
  );

  // Auth listener — loads state from Firestore when user signs in
  useEffect(() => {
    console.log('[Auth] Setting up auth listener (Photo)');
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      console.log('[Auth] Photo auth state changed:', fbUser ? `uid=${fbUser.uid}` : 'null');
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

          const cloudState = await loadPhotoGrowState(fbUser.uid);
          if (cloudState) {
            setCompletedCheckpoints(cloudState.completedCheckpoints);
            setTimestamps(cloudState.timestamps);
            setFlipped(cloudState.flipped);
            setFeedings(cloudState.feedings || []);
          } else {
            // First login — migrate any localStorage data to Firestore
            const local = loadLocalState();
            if (local) {
              await savePhotoGrowState(fbUser.uid, local);
            }
          }
        } catch (e) {
          console.error('[Firestore] Failed to load photo state:', e);
        } finally {
          setFirestoreLoading(false);
        }
      } else {
        setUser(null);
      }
      console.log('[Auth] Setting authReady=true (Photo)');
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  const getFullState = useCallback((): PhotoPersistedState => ({
    completedCheckpoints,
    timestamps,
    flipped,
    feedings,
  }), [completedCheckpoints, timestamps, flipped, feedings]);

  const persist = useCallback(async (updates?: Partial<PhotoPersistedState>) => {
    const base = getFullState();
    const next = updates ? { ...base, ...updates } : base;
    saveLocalState(next);
    if (user) {
      try {
        await savePhotoGrowState(user.uid, next);
      } catch (e) {
        console.error('[Firestore] Failed to save photo state:', e);
      }
    }
  }, [getFullState, user]);

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

  const getPhotoTeaBanner = (): { text: string; action: string; type: 'info' | 'warning' | 'critical' } | null => {
    // Determine current phase based on completed checkpoints
    let phaseIndex = 0;
    for (let i = 0; i < PHOTO_TRACKER_PHASES.length; i++) {
      const phase = PHOTO_TRACKER_PHASES[i];
      const allChecked = phase.checkpoints.every(c => completedCheckpoints[c.id]);
      if (allChecked) phaseIndex = i + 1;
    }
    if (phaseIndex >= PHOTO_TRACKER_PHASES.length) phaseIndex = PHOTO_TRACKER_PHASES.length - 1;

    const phaseId = PHOTO_TRACKER_PHASES[phaseIndex]?.phaseId;

    if (phaseId === 'germination') {
      return { text: 'Skip the tea. Use plain water only. The young plant needs time to establish its first roots without being pushed by heavy biology.', action: 'Plain Water', type: 'info' };
    }
    if (phaseId === 'veg') {
      return { text: 'Apply Once a Week. Top-water with the tea mix every 7 days throughout the rest of your veg cycle. This builds a massive root network and fuels structural growth.', action: 'Tea Applied', type: 'info' };
    }
    if (phaseId === 'flip') {
      const day21Stop = completedCheckpoints['day-21-stop'];
      if (!day21Stop) {
        return { text: 'Bloom Activation Blast. Scratch dry amendments/top dressings into the top inch of the medium. Immediately water in heavily with a fresh batch of this tea to activate the biology.', action: 'Bloom Booster', type: 'critical' };
      }
      return { text: 'Peak Flower Swell. Continue top-watering with the tea mix every 7 days to maximize bud density, stack weight, and drive heavy resin production.', action: 'Tea Applied', type: 'info' };
    }
    if (phaseId === 'harvest') {
      return { text: 'STOP THE TEA. Switch entirely to plain, clean water for the final stretch as the plant finishes ripening.', action: 'Plain Water', type: 'warning' };
    }
    return null;
  };

  const handlePhaseSelect = useCallback((index: number) => {
    setSelectedPhaseIndex(index);
    setTab('timeline');
  }, []);

  const addReading = useCallback((reading: PhotoEnvironmentalReading) => {
    setReadings(prev => [...prev, reading]);
  }, []);

  const addFeeding = useCallback((feeding: PhotoFeedingEvent) => {
    setFeedings(prev => {
      const next = [...prev, feeding];
      const base = getFullState();
      const state = { ...base, feedings: next };
      saveLocalState(state);
      if (user) {
        savePhotoGrowState(user.uid, state).catch(e => console.error('[Firestore] Failed to save:', e));
      }
      return next;
    });
  }, [getFullState, user]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setTab('tracker');
    setCurrentPhaseIndex(0);
    setSelectedPhaseIndex(null);
    setGermPath(null);
    setFlipped(false);
    setReadings([]);
    setCompletedCheckpoints({});
    setTimestamps({});
    setFeedings([]);
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

  return (
    <div className="app photo-app">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">Go Green</h1>
            <p className="tagline">G7 Photoperiod Genetics Blueprint</p>
          </div>
          <div className="header-right">
            {user?.name && <span className="user-name">{user.name}</span>}
            {firestoreLoading && <span className="sync-badge syncing">Syncing...</span>}
            <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
          </div>
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
          <>
            {(() => {
              const tea = getPhotoTeaBanner();
              if (!tea) return null;
              return (
                <div className={`banner tea-banner tea-${tea.type}`}>
                  <div className="tea-text">{tea.text}</div>
                  <div className="tea-warn">Saturate top 2-3 inches only. Do not flush into bottom reservoir.</div>
                  <button className="btn-text" onClick={() => addFeeding({ date: new Date().toISOString().split('T')[0], phase: PHOTO_TRACKER_PHASES.find(p => p.checkpoints.some(c => !completedCheckpoints[c.id]))?.phaseName || 'Unknown', action: tea.action, notes: '' })}>Log {tea.action}</button>
                </div>
              );
            })()}
            <PhotoTracker
              completedCheckpoints={completedCheckpoints}
              timestamps={timestamps}
              onToggleCheckpoint={handleToggleCheckpoint}
              onFlip={handleFlip}
            />
          </>
        )}

        {tab === 'equipment' && <PhotoEquipmentChecklist completedCheckpoints={completedCheckpoints} onToggleCheckpoint={handleToggleCheckpoint} />}

        {tab === 'germination' && (
          <>
            {(() => {
              const tea = getPhotoTeaBanner();
              if (!tea) return null;
              return (
                <div className={`banner tea-banner tea-${tea.type}`}>
                  <div className="tea-text">{tea.text}</div>
                  <div className="tea-warn">Saturate top 2-3 inches only. Do not flush into bottom reservoir.</div>
                  <button className="btn-text" onClick={() => addFeeding({ date: new Date().toISOString().split('T')[0], phase: 'Germination', action: tea.action, notes: '' })}>Log {tea.action}</button>
                </div>
              );
            })()}
            <PhotoGerminationSelector
              selectedPath={germPath}
              onSelectPath={setGermPath}
            />
          </>
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
            feedings={feedings}
            onAddFeeding={addFeeding}
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
