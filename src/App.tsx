import { useState, useCallback } from 'react';
import { EquipmentChecklist } from './components/EquipmentChecklist';
import { GerminationSelector } from './components/GerminationSelector';
import { GrowTimeline } from './components/GrowTimeline';
import { DayDetail } from './components/DayDetail';
import { EnvironmentalLogger } from './components/EnvironmentalLogger';
import { SubzeroProtocol } from './components/SubzeroProtocol';
import { Guardrails } from './components/Guardrails';
import type { EnvironmentalReading } from './data/types';

type Tab = 'setup' | 'equipment' | 'germination' | 'timeline' | 'logger' | 'subzero' | 'guardrails';

function getDaysSince(dateStr: string): number {
  const start = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}

export default function App() {
  const [tab, setTab] = useState<Tab>('setup');
  const [breederLifecycle, setBreederLifecycle] = useState(80);
  const [startDate, setStartDate] = useState('');
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [germPath, setGermPath] = useState<'direct' | 'transplant' | null>(null);
  const [subzeroActive, setSubzeroActive] = useState(false);
  const [readings, setReadings] = useState<EnvironmentalReading[]>([]);
  const [setupComplete, setSetupComplete] = useState(false);

  const handleSetup = () => {
    const day = startDate ? getDaysSince(startDate) : 1;
    setCurrentDay(day);
    setSetupComplete(true);
    setTab('timeline');
  };

  const handleDaySelect = useCallback((day: number) => {
    setSelectedDay(day);
    setTab('timeline');
  }, []);

  const addReading = useCallback((reading: EnvironmentalReading) => {
    setReadings(prev => [...prev, reading]);
  }, []);

  // Dynamic calculations
  const subzeroStart = breederLifecycle - 14;
  const drybackStart = breederLifecycle - 7;
  const iceFlushDay = breederLifecycle - 3;
  const darknessStart = breederLifecycle - 2;

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
            <p className="subtext">Configure your breeder lifecycle and start date. The app will calculate all dynamic windows automatically.</p>

            <div className="setup-form">
              <label>
                Breeder Lifecycle (days)
                <input
                  type="number"
                  value={breederLifecycle}
                  onChange={e => setBreederLifecycle(parseInt(e.target.value) || 80)}
                  min={60}
                  max={120}
                />
                <span className="hint">Projected days from seed to harvest. Common: 75 (fast), 80 (standard), 90 (heavy sativa).</span>
              </label>

              <label>
                Start Date
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
                <span className="hint">The day you planted the seed. Leave blank to start from Day 1.</span>
              </label>
            </div>

            <div className="setup-preview">
              <h3>Calculated Windows</h3>
              <div className="calc-grid">
                <div className="calc-item">
                  <span className="calc-label">Subzero Protocol Starts</span>
                  <span className="calc-val">Day {subzeroStart}</span>
                </div>
                <div className="calc-item">
                  <span className="calc-label">Dryback Sequence Starts</span>
                  <span className="calc-val">Day {drybackStart}</span>
                </div>
                <div className="calc-item">
                  <span className="calc-label">Ice Water Flush</span>
                  <span className="calc-val">Day {iceFlushDay}</span>
                </div>
                <div className="calc-item">
                  <span className="calc-label">Darkness Dump Starts</span>
                  <span className="calc-val">Day {darknessStart}</span>
                </div>
                <div className="calc-item">
                  <span className="calc-label">Projected Harvest</span>
                  <span className="calc-val">Day {breederLifecycle}</span>
                </div>
              </div>
            </div>

            <button className="btn-primary" onClick={handleSetup}>Start Grow</button>
          </div>
        </main>
        <footer className="footer">
          <p>The trichomes under the loupe always dictate the final timeline, not just the calendar day.</p>
        </footer>
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
        <button className={tab === 'timeline' ? 'active' : ''} onClick={() => setTab('timeline')}>Timeline</button>
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
                <input
                  type="number"
                  value={breederLifecycle}
                  onChange={e => setBreederLifecycle(parseInt(e.target.value) || 80)}
                  min={60}
                  max={120}
                />
              </label>
              <label>
                Start Date
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
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
          />
        )}

        {tab === 'timeline' && (
          <GrowTimeline
            currentDay={currentDay}
            selectedDay={selectedDay}
            onSelectDay={handleDaySelect}
            subzeroActive={subzeroActive}
            breederLifecycle={breederLifecycle}
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
            breederLifecycle={breederLifecycle}
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
