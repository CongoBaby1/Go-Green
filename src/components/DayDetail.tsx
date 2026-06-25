import { GROW_DAYS, SUBZERO_DAYS } from '../data/growGuide';

interface Props {
  day: number;
  currentDay: number;
  onSetCurrentDay: (day: number) => void;
  subzeroActive: boolean;
}

export function DayDetail({ day, currentDay, onSetCurrentDay, subzeroActive }: Props) {
  const dayData = subzeroActive
    ? SUBZERO_DAYS.find(d => d.day === day)
    : GROW_DAYS.find(d => d.day === day);

  if (!dayData) return null;

  return (
    <div className="day-detail">
      <div className="day-detail-header">
        <h2>Day {dayData.day}: {dayData.title}</h2>
        <span className="stage-badge">{dayData.stage}</span>
      </div>

      <div className="detail-grid">
        <section className="detail-section">
          <h3>Instructions</h3>
          <ul>
            {dayData.instructions.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ul>
        </section>

        {dayData.wateringVolume && (
          <section className="detail-section highlight">
            <h3>Watering Volume</h3>
            <p className="big">{dayData.wateringVolume}</p>
          </section>
        )}

        {dayData.envTargets && (
          <section className="detail-section highlight">
            <h3>Environmental Targets</h3>
            <p className="big">{dayData.envTargets}</p>
          </section>
        )}

        {dayData.warnings && dayData.warnings.length > 0 && (
          <section className="detail-section warning">
            <h3>Warnings</h3>
            <ul>
              {dayData.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </section>
        )}

        {dayData.milestones && dayData.milestones.length > 0 && (
          <section className="detail-section milestone">
            <h3>Milestone</h3>
            <ul>
              {dayData.milestones.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="actions">
        {day > currentDay && !subzeroActive && (
          <button className="btn-primary" onClick={() => onSetCurrentDay(day)}>
            Mark as Current Day
          </button>
        )}
        {day === currentDay && !subzeroActive && (
          <span className="current-label">This is your current grow day.</span>
        )}
      </div>
    </div>
  );
}
