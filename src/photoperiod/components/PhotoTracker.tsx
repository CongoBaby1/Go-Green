import { useState } from 'react';
import { PHOTO_TRACKER_PHASES } from '../../data/photoTracker';

interface Props {
  completedCheckpoints: Record<string, boolean>;
  timestamps: Record<string, string>;
  onToggleCheckpoint: (checkpointId: string) => void;
  onFlip: () => void;
}

export function PhotoTracker({ completedCheckpoints, timestamps, onToggleCheckpoint, onFlip }: Props) {
  const [showCompleted, setShowCompleted] = useState(false);

  const spaceChecked = completedCheckpoints['space-check'] || false;
  const flipChecked = completedCheckpoints['light-12-12'] || false;

  // Determine current phase based on completed checkpoints
  let currentPhaseIndex = 0;
  for (let i = 0; i < PHOTO_TRACKER_PHASES.length; i++) {
    const phase = PHOTO_TRACKER_PHASES[i];
    const allChecked = phase.checkpoints.every(c => completedCheckpoints[c.id]);
    if (allChecked) {
      currentPhaseIndex = i + 1;
    }
  }
  if (currentPhaseIndex >= PHOTO_TRACKER_PHASES.length) {
    currentPhaseIndex = PHOTO_TRACKER_PHASES.length - 1;
  }

  return (
    <div className="tracker">
      <div className="tracker-header">
        <h2>G7 Grow Tracker</h2>
        <p className="subtext">
          Current Phase: <strong>{PHOTO_TRACKER_PHASES[currentPhaseIndex].phaseName}</strong>
        </p>
      </div>

      {!flipChecked && currentPhaseIndex <= 1 && (
        <div className="banner photo-banner">
          {spaceChecked
            ? 'Space Check complete. Press "Flip to 12/12" button below to unlock flower phase.'
            : 'Complete all Veg milestones before unlocking The Strip & Flip phase.'}
        </div>
      )}

      {PHOTO_TRACKER_PHASES.map((phase, idx) => {
        const isCurrent = idx === currentPhaseIndex;
        const isPast = idx < currentPhaseIndex;
        const isFuture = idx > currentPhaseIndex;

        // Future phases hidden except flip phase if space check done
        if (isFuture) {
          if (phase.phaseId === 'flip' && spaceChecked) {
            // show flip phase
          } else {
            return null;
          }
        }

        if (isPast && !showCompleted) return null;

        return (
          <div
            key={phase.phaseId}
            className={`tracker-phase ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''}`}
          >
            <h3 className="phase-title">{phase.phaseName}</h3>

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

            {/* Flip trigger for veg phase when space-check complete */}
            {phase.phaseId === 'veg' && spaceChecked && !flipChecked && (
              <div className="actions" style={{ marginTop: '1rem' }}>
                <button className="btn-primary" onClick={onFlip}>
                  I have flipped my lights to 12/12
                </button>
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
