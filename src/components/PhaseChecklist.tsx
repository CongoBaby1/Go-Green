import { TrackerPhase } from '../data/trackerTypes';

interface Props {
  phase: TrackerPhase;
  completedCheckpoints: Record<string, boolean>;
  timestamps: Record<string, string>;
  onToggleCheckpoint: (checkpointId: string) => void;
  title?: string;
}

export function PhaseChecklist({ phase, completedCheckpoints, timestamps, onToggleCheckpoint, title }: Props) {
  return (
    <div className="phase-checklist">
      <div className="checklist-header">
        <h3>{title || phase.phaseName}</h3>
        <span className="phase-range">
          {phase.phaseEndDay
            ? `Days ${phase.phaseStartDay}–${phase.phaseEndDay}`
            : `Days ${phase.phaseStartDay}+`}
        </span>
      </div>

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
              {timestamps[cp.id] && <span className="checkpoint-ts">{timestamps[cp.id]}</span>}
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
  );
}
