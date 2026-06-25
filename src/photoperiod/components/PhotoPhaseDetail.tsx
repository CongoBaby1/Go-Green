import { PHOTO_PHASES } from '../data/photoGrowGuide';

interface Props {
  phaseIndex: number;
  currentPhaseIndex: number;
  onSetCurrentPhase: (index: number) => void;
  flipped: boolean;
  onFlip: () => void;
}

export function PhotoPhaseDetail({ phaseIndex, currentPhaseIndex, onSetCurrentPhase, flipped, onFlip }: Props) {
  const phase = PHOTO_PHASES[phaseIndex];
  if (!phase) return null;

  const isPreFlip = phase.phase === 'pre-flip';
  const isPast = phaseIndex < currentPhaseIndex;

  return (
    <div className="day-detail">
      <div className="day-detail-header">
        <h2>{phase.title}</h2>
        <span className="stage-badge">{phase.stage}</span>
      </div>

      <div className="detail-grid">
        <section className="detail-section">
          <h3>Instructions</h3>
          <ul>
            {phase.instructions.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ul>
        </section>

        {phase.wateringVolume && (
          <section className="detail-section highlight">
            <h3>Watering Volume</h3>
            <p className="big">{phase.wateringVolume}</p>
          </section>
        )}

        {phase.envTargets && (
          <section className="detail-section highlight">
            <h3>Environmental Targets</h3>
            <p className="big">{phase.envTargets}</p>
          </section>
        )}

        {phase.warnings && phase.warnings.length > 0 && (
          <section className="detail-section warning">
            <h3>Warnings</h3>
            <ul>
              {phase.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </section>
        )}

        {phase.milestones && phase.milestones.length > 0 && (
          <section className="detail-section milestone">
            <h3>Milestone</h3>
            <ul>
              {phase.milestones.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <div className="actions">
        {isPreFlip && !flipped && (
          <button className="btn-primary" onClick={onFlip}>
            {phase.triggerLabel || 'I have flipped my lights to 12/12'}
          </button>
        )}

        {isPreFlip && flipped && (
          <span className="current-label">Flip confirmed. Flower timeline unlocked.</span>
        )}

        {phaseIndex > currentPhaseIndex && !isPreFlip && (
          <button className="btn-primary" onClick={() => onSetCurrentPhase(phaseIndex)}>
            Mark as Current Phase
          </button>
        )}

        {phaseIndex === currentPhaseIndex && !isPreFlip && (
          <span className="current-label">This is your current phase.</span>
        )}

        {isPast && (
          <span className="past-label">Phase completed.</span>
        )}
      </div>
    </div>
  );
}
