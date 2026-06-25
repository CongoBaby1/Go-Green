import { PHOTO_EQUIPMENT_LIST } from '../data/photoGrowGuide';

export function PhotoEquipmentChecklist() {
  return (
    <div className="equipment-checklist">
      <h2>G7 Equipment Validation</h2>
      <p className="subtext">Verify all baseline hardware for photoperiod cultivation.</p>

      <div className="checklist-grid">
        {PHOTO_EQUIPMENT_LIST.map(item => (
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
