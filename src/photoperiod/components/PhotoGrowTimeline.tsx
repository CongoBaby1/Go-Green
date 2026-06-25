import { PHOTO_PHASES, PHOTO_MILESTONES } from '../data/photoGrowGuide';

interface Props {
  currentPhaseIndex: number;
  selectedPhaseIndex: number | null;
  onSelectPhase: (index: number) => void;
  flipped: boolean;
}

export function PhotoGrowTimeline({ currentPhaseIndex, selectedPhaseIndex, onSelectPhase, flipped }: Props) {
  const phases = PHOTO_PHASES;

  const stageColor: Record<string, string> = {
    'Seedling': '#06b6d4',
    'Early Veg': '#22c55e',
    'Mid Veg': '#84cc16',
    'Late Veg': '#eab308',
    'Pre-Flip': '#f97316',
    'Early Flower': '#ef4444',
    'Mid Flower': '#dc2626',
    'Late Flower': '#b91c1c',
    'Flush': '#8b5cf6',
    'Harvest': '#a855f7',
    'Dry': '#6366f1',
    'Cure': '#4f46e5',
  };

  return (
    <div className="grow-timeline">
      <h2>Photoperiod Grow Timeline</h2>
      <p className="subtext">
        Current Phase: <strong>{phases[currentPhaseIndex]?.title || 'Not Started'}</strong>
        {flipped ? ' | Light Cycle: 12/12' : ' | Light Cycle: 18/6 or 20/4'}
      </p>

      {!flipped && currentPhaseIndex < phases.findIndex(p => p.phase === 'pre-flip') && (
        <div className="banner photo-banner">
          Vegetative Phase Active — You control when to flip to 12/12
        </div>
      )}

      <div className="timeline-scroll">
        <div className="timeline-track">
          {phases.map((phase, index) => {
            const isCurrent = index === currentPhaseIndex;
            const isPast = index < currentPhaseIndex;
            const isMilestone = PHOTO_MILESTONES.some(m => m.phase === phase.phase);
            const color = stageColor[phase.stage] || '#6b7280';
            const isLocked = !flipped && index > phases.findIndex(p => p.phase === 'pre-flip');

            return (
              <button
                key={phase.phase}
                className={`timeline-node ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''} ${selectedPhaseIndex === index ? 'selected' : ''} ${isMilestone ? 'milestone' : ''} ${isLocked ? 'locked' : ''}`}
                style={{ borderColor: color }}
                onClick={() => !isLocked && onSelectPhase(index)}
                disabled={isLocked}
              >
                <span className="node-day">{phase.stage}</span>
                <span className="node-stage">{phase.phase}</span>
                {phase.manualTrigger && <span className="trigger-badge">TRIGGER</span>}
                {isMilestone && <span className="milestone-dot"></span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="legend">
        <span><span className="dot current-dot"></span> Current</span>
        <span><span className="dot past-dot"></span> Past</span>
        <span><span className="dot milestone-dot-legend"></span> Milestone</span>
        <span><span className="dot locked-dot"></span> Locked (Flip Required)</span>
      </div>
    </div>
  );
}
