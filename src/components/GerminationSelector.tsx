import { GERMINATION_PATHS } from '../data/growGuide';

interface Props {
  selectedPath: 'direct' | 'transplant' | null;
  onSelectPath: (path: 'direct' | 'transplant') => void;
}

export function GerminationSelector({ selectedPath, onSelectPath }: Props) {
  return (
    <div className="germination-selector">
      <h2>Germination & Potting</h2>
      <p className="subtext">Select exactly one pathway to begin.</p>

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

      {!selectedPath && (
        <p className="hint">Tap a pathway above to reveal the full workflow.</p>
      )}
    </div>
  );
}
