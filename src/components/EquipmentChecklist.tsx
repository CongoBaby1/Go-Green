import { EQUIPMENT_LIST } from '../data/growGuide';

interface Props {
  completedCheckpoints: Record<string, boolean>;
  onToggleCheckpoint: (checkpointId: string) => void;
}

export function EquipmentChecklist({ completedCheckpoints, onToggleCheckpoint }: Props) {
  return (
    <div className="equipment-checklist">
      <h2>Equipment Validation</h2>
      <p className="subtext">Check off each item as you acquire it. All required items must be ready before starting your grow.</p>

      <div className="checklist-grid">
        {EQUIPMENT_LIST.map(item => {
          const checked = !!completedCheckpoints[item.id];
          return (
            <div key={item.id} className={`checklist-card ${item.required ? 'required' : ''} ${checked ? 'checked' : ''}`}>
              <label className="equipment-label">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleCheckpoint(item.id)}
                />
                <div className="card-header">
                  <h3>{item.name}</h3>
                  {item.required && <span className="badge">{checked ? 'Ready' : 'Required'}</span>}
                </div>
              </label>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
