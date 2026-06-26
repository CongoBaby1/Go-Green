import { useState } from 'react';
import type { PhotoEnvironmentalReading, PhotoFeedingEvent } from '../data/types';

interface Props {
  readings: PhotoEnvironmentalReading[];
  onAddReading: (reading: PhotoEnvironmentalReading) => void;
  feedings: PhotoFeedingEvent[];
  onAddFeeding: (feeding: PhotoFeedingEvent) => void;
}

export function PhotoEnvironmentalLogger({ readings, onAddReading, feedings, onAddFeeding }: Props) {
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [ppm, setPpm] = useState('');
  const [ph, setPh] = useState('');
  const [water, setWater] = useState('');
  const [notes, setNotes] = useState('');

  const [feedAction, setFeedAction] = useState('');
  const [feedNotes, setFeedNotes] = useState('');

  const submitReading = () => {
    const reading: PhotoEnvironmentalReading = {
      date: new Date().toISOString().split('T')[0],
      temperature: parseFloat(temp) || 0,
      humidity: parseFloat(humidity) || 0,
      ppm: parseFloat(ppm) || 0,
      ph: parseFloat(ph) || 0,
      wateringMl: parseFloat(water) || 0,
      notes,
    };
    onAddReading(reading);
    setTemp('');
    setHumidity('');
    setPpm('');
    setPh('');
    setWater('');
    setNotes('');
  };

  const submitFeeding = () => {
    if (!feedAction.trim()) return;
    const feeding: PhotoFeedingEvent = {
      date: new Date().toISOString().split('T')[0],
      phase: 'Logged',
      action: feedAction.trim(),
      notes: feedNotes.trim(),
    };
    onAddFeeding(feeding);
    setFeedAction('');
    setFeedNotes('');
  };

  const avg = (key: keyof PhotoEnvironmentalReading) => {
    const vals = readings.map(r => r[key]).filter((v): v is number => typeof v === 'number');
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : '--';
  };

  const lastFeeding = feedings[feedings.length - 1];

  return (
    <div className="env-logger">
      <h2>G7 Environmental Logger</h2>
      <p className="subtext">Track temperature, humidity, PPM, pH, and watering per day.</p>

      <div className="log-form">
        <div className="form-row">
          <label>
            Temp (F)
            <input type="number" value={temp} onChange={e => setTemp(e.target.value)} placeholder="75" />
          </label>
          <label>
            Humidity (%)
            <input type="number" value={humidity} onChange={e => setHumidity(e.target.value)} placeholder="55" />
          </label>
          <label>
            PPM
            <input type="number" value={ppm} onChange={e => setPpm(e.target.value)} placeholder="600" />
          </label>
          <label>
            pH
            <input type="number" value={ph} onChange={e => setPh(e.target.value)} placeholder="5.8" />
          </label>
          <label>
            Water (mL)
            <input type="number" value={water} onChange={e => setWater(e.target.value)} placeholder="3000" />
          </label>
        </div>
        <label className="notes-label">
          Notes
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
        </label>
        <button className="btn-primary" onClick={submitReading}>Log Reading</button>
      </div>

      {readings.length > 0 && (
        <div className="log-stats">
          <h3>Averages (All Logged)</h3>
          <div className="stats-grid">
            <div className="stat"><span className="stat-val">{avg('temperature')}</span><span className="stat-label">Avg Temp (F)</span></div>
            <div className="stat"><span className="stat-val">{avg('humidity')}</span><span className="stat-label">Avg Humidity (%)</span></div>
            <div className="stat"><span className="stat-val">{avg('ppm')}</span><span className="stat-label">Avg PPM</span></div>
            <div className="stat"><span className="stat-val">{avg('ph')}</span><span className="stat-label">Avg pH</span></div>
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
                  <th>PPM</th>
                  <th>pH</th>
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
                    <td>{r.ppm}</td>
                    <td>{r.ph}</td>
                    <td>{r.wateringMl}</td>
                    <td>{r.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="feeding-log">
        <h2>Feeding Log</h2>
        <p className="subtext">Record each tea application, bloom booster, or plain water event.</p>

        {lastFeeding && (
          <div className="last-feeding">
            <span className="last-label">Last Feeding:</span>
            <span className="last-val">{lastFeeding.action} on {lastFeeding.date}</span>
          </div>
        )}

        <div className="feed-form">
          <label>
            Action
            <select value={feedAction} onChange={e => setFeedAction(e.target.value)}>
              <option value="">Select...</option>
              <option value="Tea Applied">Tea Applied</option>
              <option value="Bloom Booster">Bloom Booster</option>
              <option value="Plain Water">Plain Water</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="notes-label">
            Notes
            <textarea value={feedNotes} onChange={e => setFeedNotes(e.target.value)} rows={2} placeholder="Optional details..." />
          </label>
          <button className="btn-primary" onClick={submitFeeding}>Log Feeding</button>
        </div>

        {feedings.length > 0 && (
          <div className="feed-history">
            <h3>Feeding History</h3>
            <div className="history-table-wrap">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Phase</th>
                    <th>Action</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[...feedings].reverse().map((f, i) => (
                    <tr key={i}>
                      <td>{f.date}</td>
                      <td>{f.phase}</td>
                      <td>{f.action}</td>
                      <td>{f.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
