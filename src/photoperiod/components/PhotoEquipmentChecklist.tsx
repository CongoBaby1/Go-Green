import { PHOTO_EQUIPMENT_LIST } from '../data/photoGrowGuide';

interface Props {
  completedCheckpoints: Record<string, boolean>;
  onToggleCheckpoint: (checkpointId: string) => void;
}

export function PhotoEquipmentChecklist({ completedCheckpoints, onToggleCheckpoint }: Props) {
  return (
    <div className="equipment-checklist">
      <h2>G7 Equipment Validation</h2>
      <p className="subtext">Check off each item as you acquire it. All required items must be ready before starting your grow.</p>

      <div className="checklist-grid">
        {PHOTO_EQUIPMENT_LIST.map(item => {
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

      <div className="recipe-card">
        <h2>Microbe Tea Recipe</h2>
        <p className="subtext">Ingredients for the 1-Gallon Microbial Tea. Mix fresh every batch.</p>
        <div className="recipe-grid">
          <div className="recipe-item">
            <span className="recipe-label">Base</span>
            <span className="recipe-val">1 Gallon non-chlorinated water or clean rainwater</span>
          </div>
          <div className="recipe-item">
            <span className="recipe-label">Inoculant</span>
            <span className="recipe-val">1 teaspoon Real Growers Recharge</span>
          </div>
          <div className="recipe-item">
            <span className="recipe-label">Organic Matter</span>
            <span className="recipe-val">29.5 mL Wiggle Worm Organic Worm Casting Tea</span>
          </div>
          <div className="recipe-item">
            <span className="recipe-label">Fuel / Catalyst</span>
            <span className="recipe-val">10 mL Microbe Life Hydroponics Vitamins and Amino Acids</span>
          </div>
          <div className="recipe-item">
            <span className="recipe-label">Coco Coir pH</span>
            <span className="recipe-val">5.8 - 5.9</span>
          </div>
          <div className="recipe-item">
            <span className="recipe-label">Living Soil pH</span>
            <span className="recipe-val">6.0 - 6.5 (adjust after mixing all ingredients)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
