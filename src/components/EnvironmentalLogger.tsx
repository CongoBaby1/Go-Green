import { useState } from 'react';
import type { EnvironmentalReading } from '../data/types';

interface Props {
  readings: EnvironmentalReading[];
  onAddReading: (reading: EnvironmentalReading) => void;
  currentDay: number;
}

function getPhaseTargets(currentDay: number) {
  if (currentDay <= 7) {
    return {
      phase: 'Germination',
      temp: { min: 75, max: 80 },
      humidity: { min: 65, max: 75 },
      tension: null,
      water: { min: 50, max: 75 },
    };
  }
  if (currentDay <= 26) {
    return {
      phase: 'Vegetative',
      temp: { min: 72, max: 78 },
      humidity: { min: 50, max: 60 },
      tension: { min: 80, max: 120 },
      water: { min: 1000, max: 2000 },
    };
  }
  return {
    phase: 'Flowering',
    temp: { min: 68, max: 75 },
    humidity: { min: 45, max: 55 },
    tension: { min: 80, max: 120 },
    water: { min: 3000, max: 4000 },
  };
}

function checkRange(label: string, val: number, range: { min: number; max: number } | null): string | null {
  if (!range) return null;
  if (val < range.min) return `${label} ${val} is below target (${range.min}-${range.max})`;
  if (val > range.max) return `${label} ${val} is above target (${range.min}-${range.max})`;
  return null;
}

export function EnvironmentalLogger({ readings, onAddReading, currentDay }: Props) {
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [tension, setTension] = useState('');
  const [water, setWater] = useState('');
  const [notes, setNotes] = useState('');

  const targets = getPhaseTargets(currentDay);

  const submit = () => {
    const reading: EnvironmentalReading = {
      date: new Date().toISOString().split('T')[0],
      temperature: parseFloat(temp) || 0,
      humidity: parseFloat(humidity) || 0,
      soilTension: parseFloat(tension) || 0,
      wateringMl: parseFloat(water) || 0,
      notes,
    };
    onAddReading(reading);
    setTemp('');
    setHumidity('');
    setTension('');
    setWater('');
    setNotes('');
  };

  const avg = (key: keyof EnvironmentalReading) => {
    const vals = readings.map(r => r[key]).filter((v): v is number => typeof v === 'number');
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : '--';
  };

  const latest = readings[readings.length - 1];
  const warnings: string[] = [];
  if (latest) {
    const t = checkRange('Temp (F)', latest.temperature, targets.temp);
    if (t) warnings.push(t);
    const h = checkRange('Humidity (%)', latest.humidity, targets.humidity);
    if (h) warnings.push(h);
    const st = checkRange('Soil Tension (mbar)', latest.soilTension, targets.tension);
    if (st) warnings.push(st);
    const w = checkRange('Water (mL)', latest.wateringMl, targets.water);
    if (w) warnings.push(w);
  }

  return (
    <div className="env-logger">
      <h2>Environmental Logger</h2>
      <p className="subtext">Log daily readings. Targets shown are for {targets.phase} phase (Day {currentDay}).</p>

      <div className="phase-targets">
        <div className="target-grid">
          <div className="target-item"><span className="target-label">Target Temp</span><span className="target-val">{targets.temp ? `${targets.temp.min}-${targets.temp.max} F` : 'N/A'}</span></div>
          <div className="target-item"><span className="target-label">Target Humidity</span><span className="target-val">{targets.humidity ? `${targets.humidity.min}-${targets.humidity.max}%` : 'N/A'}</span></div>
          <div className="target-item"><span className="target-label">Target Tension</span><span className="target-val">{targets.tension ? `${targets.tension.min}-${targets.tension.max} mbar` : 'N/A'}</span></div>
          <div className="target-item"><span className="target-label">Target Water</span><span className="target-val">{targets.water ? `${targets.water.min}-${targets.water.max} mL` : 'N/A'}</span></div>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="logger-warnings">
          {warnings.map((w, i) => (
            <div key={i} className="banner guardrail-warning">{w}</div>
          ))}
        </div>
      )}

      <div className="log-form">
        <div className="form-row">
          <label>
            Temp (F)
            <input type="number" value={temp} onChange={e => setTemp(e.target.value)} placeholder="72" />
          </label>
          <label>
            Humidity (%)
            <input type="number" value={humidity} onChange={e => setHumidity(e.target.value)} placeholder="50" />
          </label>
          <label>
            Soil Tension (mbar)
            <input type="number" value={tension} onChange={e => setTension(e.target.value)} placeholder="100" />
          </label>
          <label>
            Water (mL)
            <input type="number" value={water} onChange={e => setWater(e.target.value)} placeholder="2000" />
          </label>
        </div>
        <label className="notes-label">
          Notes
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
        </label>
        <button className="btn-primary" onClick={submit}>Log Reading</button>
      </div>

      {readings.length > 0 && (
        <div className="log-stats">
          <h3>Averages (All Logged)</h3>
          <div className="stats-grid">
            <div className="stat"><span className="stat-val">{avg('temperature')}</span><span className="stat-label">Avg Temp (F)</span></div>
            <div className="stat"><span className="stat-val">{avg('humidity')}</span><span className="stat-label">Avg Humidity (%)</span></div>
            <div className="stat"><span className="stat-val">{avg('soilTension')}</span><span className="stat-label">Avg Tension (mbar)</span></div>
            <div className="stat"><span className="stat-val">{avg('wateringMl')}</span><span className="stat-label">Avg Water (mL)</span></div>
          </div>
        </div>
      )}

      {readings.length > 0 && (
        <div className="log-history">
          <h3>History</h3>
          <div className="history-table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temp</th>
                  <th>RH%</th>
                  <th>Tension</th>
                  <th>Water</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {[...readings].reverse().map((r, i) => (
                  <tr key={i}>
                    <td>{r.date}</td>
                    <td>{r.temperature}</td>
                    <td>{r.humidity}</td>
                    <td>{r.soilTension}</td>
                    <td>{r.wateringMl}</td>
                    <td>{r.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
