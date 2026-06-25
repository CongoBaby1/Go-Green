import { useState, useCallback } from 'react';
import { PhotoEquipmentChecklist } from './components/PhotoEquipmentChecklist';
import { PhotoGerminationSelector } from './components/PhotoGerminationSelector';
import { PhotoGrowTimeline } from './components/PhotoGrowTimeline';
import { PhotoPhaseDetail } from './components/PhotoPhaseDetail';
import { PhotoEnvironmentalLogger } from './components/PhotoEnvironmentalLogger';
import { PhotoGuardrails } from './components/PhotoGuardrails';
import type { PhotoEnvironmentalReading } from './data/types';

type Tab = 'equipment' | 'germination' | 'timeline' | 'logger' | 'guardrails';

export default function PhotoApp() {
  const [tab, setTab] = useState<Tab>('equipment');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);
  const [germPath, setGermPath] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [readings, setReadings] = useState<PhotoEnvironmentalReading[]>([]);

  const handlePhaseSelect = useCallback((index: number) => {
    setSelectedPhaseIndex(index);
    setTab('timeline');
  }, []);

  const handleFlip = useCallback(() => {
    setFlipped(true);
    setCurrentPhaseIndex(prev => Math.max(prev, 8)); // unlock flower phases
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
        <button className={tab === 'equipment' ? 'active' : ''} onClick={() => setTab('equipment')}>Equipment</button>
        <button className={tab === 'germination' ? 'active' : ''} onClick={() => setTab('germination')}>Germination</button>
        <button className={tab === 'timeline' ? 'active' : ''} onClick={() => setTab('timeline')}>Timeline</button>
        <button className={tab === 'logger' ? 'active' : ''} onClick={() => setTab('logger')}>Logger</button>
        <button className={tab === 'guardrails' ? 'active' : ''} onClick={() => setTab('guardrails')}>Guardrails</button>
      </nav>

      <main className="main">
        {tab === 'equipment' && <PhotoEquipmentChecklist />}

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
