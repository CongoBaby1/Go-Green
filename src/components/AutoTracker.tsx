import { useState } from 'react';
import { AUTO_TRACKER_PHASES } from '../data/autoTracker';

interface Props {
  currentDay: number;
  completedCheckpoints: Record<string, boolean>;
  timestamps: Record<string, string>;
  onToggleCheckpoint: (checkpointId: string) => void;
}

export function AutoTracker({ currentDay, completedCheckpoints, timestamps, onToggleCheckpoint }: Props) {
  const [showCompleted, setShowCompleted] = useState(false);

  const currentPhase = AUTO_TRACKER_PHASES.find(
    p => currentDay >= p.phaseStartDay && (p.phaseEndDay === null || currentDay <= p.phaseEndDay)
  ) || AUTO_TRACKER_PHASES[AUTO_TRACKER_PHASES.length - 1];

  const phaseIndex = AUTO_TRACKER_PHASES.findIndex(p => p.phaseId === currentPhase.phaseId);

  return (
    <div className="tracker">
      <div className="tracker-header">
        <h2>Grow Tracker</h2>
        <p className="subtext">
          Current Phase: <strong>{currentPhase.phaseName}</strong>
          {' '}(Day {currentPhase.phaseStartDay}
          {currentPhase.phaseEndDay ? `–${currentPhase.phaseEndDay}` : '+'}
          )
        </p>
      </div>

      {AUTO_TRACKER_PHASES.map((phase, idx) => {
        const isCurrent = idx === phaseIndex;
        const isPast = idx < phaseIndex;
        const isFuture = idx > phaseIndex;

        // Show current phase always; past phases collapsed; future phases hidden
        if (isFuture) return null;
        if (isPast && !showCompleted) {
          const anyUnchecked = phase.checkpoints.some(c => !completedCheckpoints[c.id]);
          if (anyUnchecked) return null; // show past phases if they have unchecked items
        }

        return (
          <div
            key={phase.phaseId}
            className={`tracker-phase ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''}`}
          >
            <h3 className="phase-title">{phase.phaseName}</h3>
            <div className="phase-range">
              Days {phase.phaseStartDay}
              {phase.phaseEndDay ? `–${phase.phaseEndDay}` : '+'}
            </div>

            <div className="checkpoints">
              {phase.checkpoints.map(cp => {
                const checked = !!completedCheckpoints[cp.id];
                const ts = timestamps[cp.id];
                return (
                  <label key={cp.id} className={`checkpoint-row ${checked ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleCheckpoint(cp.id)}
                    />
                    <span className="checkpoint-label">{cp.label}</span>
                    {ts && <span className="checkpoint-ts">{ts}</span>}
                  </label>
                );
              })}
            </div>

            {/* Dynamic outputs for current phase */}
            {isCurrent && phase.dynamicOutput && phase.dynamicOutput.length > 0 && (
              <div className="dynamic-output">
                <h4>Dynamic Output</h4>
                {phase.dynamicOutput.map((out, i) => (
                  <p key={i} className="dynamic-line">{out}</p>
                ))}
              </div>
            )}

            {/* Guardrails */}
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
      })}

      <button
        className="btn-text"
        onClick={() => setShowCompleted(v => !v)}
      >
        {showCompleted ? 'Hide Completed Steps' : 'Show Completed Steps'}
      </button>
    </div>
  );
}
