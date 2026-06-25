import { GROW_DAYS, SUBZERO_DAYS } from '../data/growGuide';

interface Props {
  day: number;
  currentDay: number;
  onSetCurrentDay: (day: number) => void;
  subzeroActive: boolean;
  breederLifecycle: number;
}

export function DayDetail({ day, currentDay, onSetCurrentDay, subzeroActive, breederLifecycle }: Props) {
  const timelineDays = subzeroActive ? SUBZERO_DAYS : GROW_DAYS;
  const dayData = timelineDays.find(d => d.day === day);

  if (!dayData) return null;

  const subzeroStart = breederLifecycle - 14;
  const drybackStart = breederLifecycle - 7;
  const iceFlushDay = breederLifecycle - 3;
  const darknessStart = breederLifecycle - 2;

  const isToday = day === currentDay;

  const isDynamicDay = (d: number) => d === 30 || d === 35 || d === subzeroStart || d === drybackStart || d === iceFlushDay || d === darknessStart || d === breederLifecycle;

  const dayLabel = (d: number) => {
    if (d === 30) return 'Bloom Shift';
    if (d === 35) return 'Bloom Dressing';
    if (d === subzeroStart) return 'Subzero Protocol Start';
    if (d === drybackStart) return 'Dryback Start';
    if (d === iceFlushDay) return 'Ice Water Flush';
    if (d === darknessStart) return 'Darkness Dump';
    if (d === breederLifecycle) return 'Projected Harvest';
    return null;
  };

  return (
    <div className="day-detail">
      <div className="day-detail-header">
        <h2>
          Day {day}
          {isDynamicDay(day) && <span className="day-label"> — {dayLabel(day)}</span>}
        </h2>
        <span className={`stage-badge ${isToday ? 'current' : day < currentDay ? 'past' : 'upcoming'}`}>
          {isToday ? 'Current Day' : day < currentDay ? 'Past' : 'Upcoming'}
        </span>
      </div>

      <div className="detail-section">
        <h3>{dayData.title}</h3>
        <p className="stage-name">Stage: {dayData.stage}</p>
        <ul>
          {dayData.instructions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
        {dayData.warnings && (
          <div className="detail-section warning">
            <h3>Critical Warning</h3>
            {dayData.warnings.map((w, i) => (
              <p key={i}>{w}</p>
            ))}
          </div>
        )}
      </div>

      {isToday && (
        <div className="actions">
          <button
            className="btn-large"
            onClick={() => onSetCurrentDay(currentDay + 1)}
          >
            Advance to Day {currentDay + 1}
          </button>
        </div>
      )}
    </div>
  );
}
