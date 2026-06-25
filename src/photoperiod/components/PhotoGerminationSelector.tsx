import { PHOTO_GERMINATION_PATHS } from '../data/photoGrowGuide';

interface Props {
  selectedPath: string | null;
  onSelectPath: (path: string) => void;
}

export function PhotoGerminationSelector({ selectedPath, onSelectPath }: Props) {
  return (
    <div className="germination-selector">
      <h2>G7 Precision Germination</h2>
      <p className="subtext">The foundation of a trophy-level photoperiod grow.</p>

      <div className="pathway-grid">
        {PHOTO_GERMINATION_PATHS.map(path => {
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
        <p className="hint">Tap above to reveal the G7 germination workflow.</p>
      )}
    </div>
  );
}
