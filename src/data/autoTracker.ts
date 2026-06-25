import { TrackerPhase } from './trackerTypes';

export const AUTO_TRACKER_PHASES: TrackerPhase[] = [
  {
    phaseId: 'germination',
    phaseName: 'Germination & Sprouting',
    phaseStartDay: 1,
    phaseEndDay: 7,
    checkpoints: [
      { id: 'seed-soak', label: 'Seed placed in 24-48 hour water soak', checked: false },
      { id: 'taproot', label: 'Taproot emerged', checked: false },
      { id: 'option-a', label: 'Selected Option A: Direct Potting (Starter Pocket filled with mild peat mix)', checked: false },
      { id: 'option-b', label: 'Selected Option B: Chad Cyclops Method (Placeholder Solo cup buried in 7-gal DNC soil)', checked: false },
      { id: 'sprout-day-1', label: 'Seedling broke the surface (Sprout Day 1)', checked: false },
    ],
    dynamicOutput: [
      'If Option B checked and Sprout Day 5-7: ACTION REQUIRED — Root tips visible at bottom of Solo cup. Execute Zero-Shock Swap now. Remove placeholder cup, drop root ball in, bury up to cotyledons.',
    ],
    guardrail: [
      'Watering: Maintain localized watering at 50-75 mL.',
    ],
  },
  {
    phaseId: 'veg',
    phaseName: 'Vegetative Growth & Canopy Training',
    phaseStartDay: 8,
    phaseEndDay: 26,
    checkpoints: [
      { id: 'day-13-water', label: 'Day 13: 1 Liter watering complete', checked: false },
      { id: 'vigor-check', label: 'Day 14-16 Vigor Check: Plant has 4-5 nodes AND main stem is >3mm thick', checked: false },
      { id: 'pathway-1', label: 'Day 14-16 Action: Pathway 1 (Precision Topping above 4th/5th node) complete', checked: false },
      { id: 'pathway-2', label: 'Day 14-16 Action: Pathway 2 (Aggressive LST Main-Stem Bend parallel to soil) complete', checked: false },
      { id: 'day-18-water', label: 'Day 18: 2 Liters watering complete (1L center, 1L outer rim)', checked: false },
      { id: 'day-21-lst', label: 'Day 21: Secondary LST Tie-Down complete & lowest 2 tiny starter nodes pruned', checked: false },
    ],
    guardrail: [
      'If CURRENT_DAY > 16 AND Topping/LST checkboxes both empty: CRITICAL — Autoflower countdown clock ticking. Past ideal topping window. Execute Pathway 2 (Soft LST Bending) immediately to prevent vertical Christmas-tree stretching.',
    ],
  },
  {
    phaseId: 'flower',
    phaseName: 'Flowering & Subzero Protocol',
    phaseStartDay: 27,
    phaseEndDay: null,
    checkpoints: [
      { id: 'day-30-stigmas', label: 'Day 30: White stigmas (hairs) visible at bud sites', checked: false },
      { id: 'day-35-bloom', label: 'Day 35: 1/2 to 1 cup DNC Bloom Dressing scratched into topsoil and watered in', checked: false },
      { id: 'mid-flower-water', label: 'Mid-Flower: Water tracking stepped up to 3-4 Liters per feeding', checked: false },
      { id: 'subzero-init', label: 'Last 14 Days: Loupe check shows clear/milky trichomes. Initiating Subzero Protocol.', checked: false },
      { id: 'subzero-uvb', label: 'Subzero Day 1-14: UVB Light active 2-4 hours daily', checked: false },
      { id: 'subzero-temp', label: 'Subzero Day 1-14: Night temperature drop of 10F dialed in', checked: false },
      { id: 'subzero-dryback', label: 'Subzero Day 7: Watering halted for final dryback sequence', checked: false },
      { id: 'subzero-ice', label: 'Subzero Day 3: Ice Water Flush complete', checked: false },
      { id: 'subzero-dark', label: 'Subzero Day 2: Tent dropped into 100% total darkness', checked: false },
    ],
    guardrail: [
      'If Day 30 checked: Automatically lock, grey out, and hide any pruning or lollipopping options. Flowering active. Pruning now will stunt yields. Focus strictly on watering and light exposure.',
    ],
  },
];
