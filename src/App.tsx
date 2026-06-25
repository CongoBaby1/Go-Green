import { useState, useCallback } from 'react';
import { EquipmentChecklist } from './components/EquipmentChecklist';
import { GerminationSelector } from './components/GerminationSelector';
import { GrowTimeline } from './components/GrowTimeline';
import { DayDetail } from './components/DayDetail';
import { EnvironmentalLogger } from './components/EnvironmentalLogger';
import { SubzeroProtocol } from './components/SubzeroProtocol';
import { Guardrails } from './components/Guardrails';
import type { EnvironmentalReading } from './data/types';

type Tab = 'equipment' | 'germination' | 'timeline' | 'logger' | 'subzero' | 'guardrails';

export default function App() {
  const [tab, setTab] = useState<Tab>('equipment');
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [germPath, setGermPath] = useState<'direct' | 'transplant' | null>(null);
  const [subzeroActive, setSubzeroActive] = useState(false);
  const [readings, setReadings] = useState<EnvironmentalReading[]>([]);

  const handleDaySelect = useCallback((day: number) => {
    setSelectedDay(day);
    setTab('timeline');
  }, []);

  const addReading = useCallback((reading: EnvironmentalReading) => {
    setReadings(prev => [...prev, reading]);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Go Green</h1>
          <p className="tagline">Elite Autoflower Grow Guide</p>
        </div>
      </header>

      <nav className="nav">
        <button className={tab === 'equipment' ? 'active' : ''} onClick={() => setTab('equipment')}>Equipment</button>
        <button className={tab === 'germination' ? 'active' : ''} onClick={() => setTab('germination')}>Germination</button>
        <button className={tab === 'timeline' ? 'active' : ''} onClick={() => setTab('timeline')}>Timeline</button>
        <button className={tab === 'logger' ? 'active' : ''} onClick={() => setTab('logger')}>Logger</button>
        <button className={tab === 'subzero' ? 'active' : ''} onClick={() => setTab('subzero')}>Subzero</button>
        <button className={tab === 'guardrails' ? 'active' : ''} onClick={() => setTab('guardrails')}>Guardrails</button>
      </nav>

      <main className="main">
        {tab === 'equipment' && <EquipmentChecklist />}

        {tab === 'germination' && (
          <GerminationSelector
            selectedPath={germPath}
            onSelectPath={setGermPath}
          />
        )}

        {tab === 'timeline' && (
          <GrowTimeline
            currentDay={currentDay}
            selectedDay={selectedDay}
            onSelectDay={handleDaySelect}
            subzeroActive={subzeroActive}
          />
        )}

        {tab === 'timeline' && selectedDay !== null && (
          <DayDetail
            day={selectedDay}
            currentDay={currentDay}
            onSetCurrentDay={setCurrentDay}
            subzeroActive={subzeroActive}
          />
        )}

        {tab === 'logger' && (
          <EnvironmentalLogger
            readings={readings}
            onAddReading={addReading}
            currentDay={currentDay}
          />
        )}

        {tab === 'subzero' && (
          <SubzeroProtocol
            active={subzeroActive}
            onToggle={() => setSubzeroActive(v => !v)}
            currentDay={currentDay}
          />
        )}

        {tab === 'guardrails' && <Guardrails />}
      </main>

      <footer className="footer">
        <p>The trichomes under the loupe always dictate the final timeline, not just the calendar day.</p>
      </footer>
    </div>
  );
}
