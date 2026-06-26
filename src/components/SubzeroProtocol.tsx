import { SUBZERO_DAYS } from '../data/growGuide';

interface Props {
  active: boolean;
  onToggle: () => void;
  currentDay: number;
  breederLifecycle: number;
}

export function SubzeroProtocol({ active, onToggle, currentDay, breederLifecycle }: Props) {
  const subzeroStart = breederLifecycle - 14;
  const drybackStart = breederLifecycle - 7;
  const iceFlushDay = breederLifecycle - 3;
  const darknessStart = breederLifecycle - 2;

  const daysToSubzero = subzeroStart - currentDay;
  const daysToDryback = drybackStart - currentDay;
  const daysToIce = iceFlushDay - currentDay;
  const daysToDark = darknessStart - currentDay;
  const daysToHarvest = breederLifecycle - currentDay;

  return (
    <div className="subzero-protocol">
      <h2>Subzero Late-Flower Frost Protocol</h2>
      <p className="subtext">
        Triggered dynamically based on your breeder lifecycle of {breederLifecycle} days.
        Genetics must be stable. Wear UV eyewear.
      </p>

      <div className="setup-preview">
        <div className="calc-grid">
          <div className="calc-item">
            <span className="calc-label">Subzero Protocol Starts</span>
            <span className="calc-val">Day {subzeroStart} {daysToSubzero > 0 && `(${daysToSubzero}d away)`} {daysToSubzero <= 0 && daysToSubzero > -14 && '(ACTIVE)'}</span>
          </div>
          <div className="calc-item">
            <span className="calc-label">Dryback Sequence Starts</span>
            <span className="calc-val">Day {drybackStart} {daysToDryback > 0 && `(${daysToDryback}d away)`} {daysToDryback <= 0 && daysToDryback > -7 && '(ACTIVE)'}</span>
          </div>
          <div className="calc-item">
            <span className="calc-label">Ice Water Flush</span>
            <span className="calc-val">Day {iceFlushDay} {daysToIce > 0 && `(${daysToIce}d away)`} {daysToIce <= 0 && daysToIce > -3 && '(ACTIVE)'}</span>
          </div>
          <div className="calc-item">
            <span className="calc-label">Darkness Dump Starts</span>
            <span className="calc-val">Day {darknessStart} {daysToDark > 0 && `(${daysToDark}d away)`} {daysToDark <= 0 && daysToDark > -2 && '(ACTIVE)'}</span>
          </div>
          <div className="calc-item">
            <span className="calc-label">Projected Harvest</span>
            <span className="calc-val">Day {breederLifecycle} {daysToHarvest > 0 && `(${daysToHarvest}d away)`} {daysToHarvest <= 0 && '(REACHED)'}</span>
          </div>
        </div>
      </div>

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
          <h3>Protocol Overview (14 Days Before Harvest)</h3>
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
            Subzero Protocol Active
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
