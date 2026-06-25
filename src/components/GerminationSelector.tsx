import { GERMINATION_PATHS } from '../data/growGuide';
import { AUTO_TRACKER_PHASES } from '../data/autoTracker';

interface Props {
  selectedPath: 'direct' | 'transplant' | null;
  onSelectPath: (path: 'direct' | 'transplant') => void;
  completedCheckpoints: Record<string, boolean>;
  timestamps: Record<string, string>;
  onToggleCheckpoint: (checkpointId: string) => void;
}

export function GerminationSelector({ selectedPath, onSelectPath, completedCheckpoints, timestamps, onToggleCheckpoint }: Props) {
  // Get germination phase checkpoints (first phase)
  const germPhase = AUTO_TRACKER_PHASES[0];

  // Handle option A/B as mutually exclusive
  const handleOptionToggle = (optionId: string) => {
    const otherId = optionId === 'option-a' ? 'option-b' : 'option-a';
    if (!completedCheckpoints[optionId]) {
      // Selecting this one - deselect the other
      onToggleCheckpoint(optionId);
      if (completedCheckpoints[otherId]) {
        onToggleCheckpoint(otherId); // toggle off the other
      }
    } else {
      // Deselecting this one
      onToggleCheckpoint(optionId);
    }
  };

  return (
    <div className="germination-selector">
      <h2>Germination & Potting</h2>
      <p className="subtext">Select exactly one pathway to begin. Then complete the milestones below.</p>

      <div className="pathway-grid">
        {GERMINATION_PATHS.map(path => {
          const isSelected = selectedPath === path.id;
          return (
            <div
              key={path.id}
              className={`pathway-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectPath(path.id)}
            >
              <h3>{path.name}</h3>

              {isSelected && (
                <div className="pathway-steps">
                  {path.steps.map(s => (
                    <div key={s.step} className="step">
                      <div className="step-header">
                        <span className="step-num">Step {s.step}</span>
                        <span className="step-title">{s.title}</span>
                      </div>
                      <ul>
                        {s.instructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!selectedPath && <p className="hint">Tap a pathway above to reveal the full workflow.</p>}

      {/* Germination Tasks / Checkpoints */}
      <div className="germination-tasks">
        <h3>Milestones: Days 1-7</h3>
        <div className="checkpoints">
          {germPhase.checkpoints.map(cp => {
            const checked = !!completedCheckpoints[cp.id];
            const isOption = cp.id === 'option-a' || cp.id === 'option-b';
            return (
              <label key={cp.id} className={`checkpoint-row ${checked ? 'checked' : ''}`}>
                <input
                  type={isOption ? 'radio' : 'checkbox'}
                  checked={checked}
                  onChange={() => isOption ? handleOptionToggle(cp.id) : onToggleCheckpoint(cp.id)}
                />
                <span className="checkpoint-label">{cp.label}</span>
                {timestamps[cp.id] && <span className="checkpoint-ts">{timestamps[cp.id]}</span>}
              </label>
            );
          })}
        </div>

        {/* Dynamic output for transplant action */}
        {germPhase.dynamicOutput && germPhase.dynamicOutput.length > 0 && (
          <div className="dynamic-output">
            <h4>Dynamic Output</h4>
            {germPhase.dynamicOutput.map((out, i) => (
              <p key={i} className="dynamic-line">{out}</p>
            ))}
          </div>
        )}

        {germPhase.guardrail && germPhase.guardrail.length > 0 && (
          <div className="guardrail-block">
            <h4>Automated Guardrail</h4>
            {germPhase.guardrail.map((g, i) => (
              <p key={i} className="guardrail-line">{g}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
