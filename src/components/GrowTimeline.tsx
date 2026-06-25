import { GROW_DAYS, SUBZERO_DAYS, MILESTONES } from '../data/growGuide';

interface Props {
  currentDay: number;
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
  subzeroActive: boolean;
  breederLifecycle: number;
}

export function GrowTimeline({ currentDay, selectedDay, onSelectDay, subzeroActive, breederLifecycle }: Props) {
  const timelineDays = subzeroActive ? SUBZERO_DAYS : GROW_DAYS;

  const subzeroStart = breederLifecycle - 14;
  const drybackStart = breederLifecycle - 7;
  const iceFlushDay = breederLifecycle - 3;
  const darknessStart = breederLifecycle - 2;

  const dynamicTriggers = [
    { day: 30, label: 'Bloom Shift' },
    { day: 35, label: 'Bloom Dressing' },
    { day: subzeroStart, label: 'Subzero Protocol' },
    { day: drybackStart, label: 'Dryback Start' },
    { day: iceFlushDay, label: 'Ice Water Flush' },
    { day: darknessStart, label: 'Darkness Dump' },
    { day: breederLifecycle, label: 'Projected Harvest' },
  ];

  const stageColor: Record<string, string> = {
    'Sprout': '#22c55e',
    'Early Veg': '#84cc16',
    'Mid Veg': '#eab308',
    'Late Veg': '#f59e0b',
    'Pre-Flower': '#f97316',
    'Early Flower': '#ef4444',
    'Mid Flower': '#dc2626',
    'Late Flower': '#b91c1c',
    'Subzero': '#06b6d4',
  };

  const isTriggerDay = (day: number) => dynamicTriggers.some(t => t.day === day);

  return (
    <div className="grow-timeline">
      <h2>Grow Timeline</h2>
      <p className="subtext">
        Current Day: <strong>{currentDay}</strong>
        {' '}| Stage: <strong>{GROW_DAYS.find(d => d.day === currentDay)?.stage || 'Late Flower'}</strong>
        {' '}| Breeder Lifecycle: <strong>Day {breederLifecycle}</strong>
      </p>

      <div className="dynamic-triggers">
        {dynamicTriggers.map(trigger => {
          const isActive = currentDay >= trigger.day;
          const isUpcoming = currentDay < trigger.day;
          return (
            <div
              key={trigger.day}
              className={`trigger-chip ${isActive ? 'active' : ''} ${isUpcoming ? 'upcoming' : ''}`}
            >
              <span className="trigger-day">Day {trigger.day}</span>
              <span className="trigger-label">{trigger.label}</span>
              {isActive && <span className="trigger-status">REACHED</span>}
              {isUpcoming && <span className="trigger-status">{trigger.day - currentDay}d away</span>}
            </div>
          );
        })}
      </div>

      {subzeroActive && (
        <div className="banner subzero-banner">
          Subzero Protocol Active — Countdown to Harvest
        </div>
      )}

      <div className="timeline-scroll">
        <div className="timeline-track">
          {timelineDays.map(day => {
            const isCurrent = subzeroActive ? false : day.day === currentDay;
            const isPast = subzeroActive ? false : day.day < currentDay;
            const isMilestone = MILESTONES.some(m => m.day === day.day);
            const isTrigger = isTriggerDay(day.day);
            const color = stageColor[day.stage] || '#6b7280';

            return (
              <button
                key={subzeroActive ? day.day : day.day}
                className={`timeline-node ${isCurrent ? 'current' : ''} ${isPast ? 'past' : ''} ${selectedDay === day.day ? 'selected' : ''} ${isMilestone ? 'milestone' : ''} ${isTrigger ? 'trigger' : ''}`}
                style={{ borderColor: color }}
                onClick={() => onSelectDay(day.day)}
              >
                <span className="node-day">Day {subzeroActive ? day.day : day.day}</span>
                <span className="node-stage">{day.stage}</span>
                {isMilestone && <span className="milestone-dot"></span>}
                {isTrigger && <span className="trigger-dot"></span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="legend">
        <span><span className="dot current-dot"></span> Current</span>
        <span><span className="dot past-dot"></span> Past</span>
        <span><span className="dot milestone-dot-legend"></span> Milestone</span>
        <span><span className="dot trigger-dot-legend"></span> Dynamic Trigger</span>
      </div>
    </div>
  );
}
