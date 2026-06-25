import { SUBZERO_DAYS } from '../data/growGuide';

interface Props {
  active: boolean;
  onToggle: () => void;
  currentDay: number;
}

export function SubzeroProtocol({ active, onToggle, currentDay: _currentDay }: Props) {
  return (
    <div className="subzero-protocol">
      <h2>Subzero Late-Flower Frost Protocol</h2>
      <p className="subtext">
        Trigger this protocol strictly in the LAST 14 DAYS before harvest.
        Genetics must be stable. Wear UV eyewear.
      </p>

      <div className="subzero-toggle">
        <button
          className={`btn-large ${active ? 'active' : ''}`}
          onClick={onToggle}
        >
          {active ? 'Deactivate Subzero Protocol' : 'Activate Subzero Protocol'}
        </button>
      </div>

      {!active && (
        <div className="subzero-preview">
          <h3>Protocol Overview (14 Days)</h3>
          <ul className="protocol-list">
            <li><strong>Days 1-7:</strong> UVB Light Blast (2-4h daily) + 10F Night Temp Drop</li>
            <li><strong>Days 8-11:</strong> Extreme Drybacks — halt regular watering, controlled drought</li>
            <li><strong>Day 12:</strong> Ice Water Flush — ice-cold water or ice cubes on soil surface</li>
            <li><strong>Days 13-14:</strong> Total Darkness (48-72h) prior to harvest</li>
          </ul>
        </div>
      )}

      {active && (
        <div className="subzero-active">
          <div className="banner subzero-banner">
            Subzero Protocol Active — Use Timeline Tab for Day-by-Day Guidance
          </div>

          <div className="protocol-detail">
            {SUBZERO_DAYS.map(d => (
              <div key={d.day} className="protocol-day">
                <h4>{d.title}</h4>
                <ul>
                  {d.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ul>
                {d.warnings && (
                  <div className="warning-block">
                    {d.warnings.map((w, i) => (
                      <p key={i}>{w}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
