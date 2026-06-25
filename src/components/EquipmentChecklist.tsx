import { EQUIPMENT_LIST } from '../data/growGuide';

export function EquipmentChecklist() {
  return (
    <div className="equipment-checklist">
      <h2>Equipment Validation</h2>
      <p className="subtext">Verify all baseline hardware before starting your grow.</p>

      <div className="checklist-grid">
        {EQUIPMENT_LIST.map(item => (
          <div key={item.id} className={`checklist-card ${item.required ? 'required' : ''}`}>
            <div className="card-header">
              <h3>{item.name}</h3>
              {item.required && <span className="badge">Required</span>}
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
