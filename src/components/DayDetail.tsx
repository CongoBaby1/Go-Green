import { GROW_DAYS, SUBZERO_DAYS } from '../data/growGuide';
import type { TrackerPhase } from '../data/trackerTypes';

interface Props {
  day: number;
  currentDay: number;
  onSetCurrentDay: (day: number) => void;
  subzeroActive: boolean;
  breederLifecycle: number;
  phase?: TrackerPhase | null;
  completedCheckpoints?: Record<string, boolean>;
  onToggleCheckpoint?: (checkpointId: string) => void;
  timestamps?: Record<string, string>;
}

export function DayDetail({ day, currentDay, onSetCurrentDay, subzeroActive, breederLifecycle, phase, completedCheckpoints, onToggleCheckpoint, timestamps }: Props) {
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
      <div className="day-header">
        <h2>
          Day {day}
          {isDynamicDay(day) && <span className="day-label"> — {dayLabel(day)}</span>}
        </h2>
        <span className={`badge ${isToday ? 'current' : day < currentDay ? 'past' : 'upcoming'}`}>
          {isToday ? 'Current Day' : day < currentDay ? 'Past' : 'Upcoming'}
        </span>
      </div>

      <div className="detail-section">
        <h3>Stage: {dayData.stage}</h3>
        <p>{dayData.title}</p>
        <ul>
          {dayData.instructions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
        {dayData.warnings && (
          <div className="warning-block">
            {dayData.warnings.map((w, i) => (
              <p key={i}>{w}</p>
            ))}
          </div>
        )}
      </div>

      {/* Phase-specific checklist integrated into day detail */}
      {phase && onToggleCheckpoint && completedCheckpoints && (
        <div className="day-checklist">
          <h3>Milestones & Tasks</h3>
          <div className="checkpoints">
            {phase.checkpoints.map(cp => {
              const checked = !!completedCheckpoints[cp.id];
              return (
                <label key={cp.id} className={`checkpoint-row ${checked ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleCheckpoint(cp.id)}
                  />
                  <span className="checkpoint-label">{cp.label}</span>
                  {timestamps?.[cp.id] && <span className="checkpoint-ts">{timestamps[cp.id]}</span>}
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
      )}

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
