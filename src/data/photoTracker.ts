import { TrackerPhase } from './trackerTypes';

export const PHOTO_TRACKER_PHASES: TrackerPhase[] = [
  {
    phaseId: 'germination',
    phaseName: 'G7 Precision Germination & Seedling Start',
    phaseStartDay: 1,
    phaseEndDay: null,
    checkpoints: [
      { id: 'seed-soak', label: 'Seeds soaked in water/H2O2 mix', checked: false },
      { id: 'planted', label: 'Seeds planted 1/4 to 1/2 inch deep in Solo cups', checked: false },
      { id: 'zero-pat', label: 'Covered with loose dirt (Zero patting/tamping down verification)', checked: false },
      { id: 'hair-tie', label: 'Hair-Tie Greenhouse wrap secured over Solo cup rim', checked: false },
      { id: 'syringe', label: 'Seedlings watering handled strictly via syringe', checked: false },
      { id: 'env-check', label: 'Environmental Check: Temperatures maintained at 75-78F', checked: false },
    ],
  },
  {
    phaseId: 'veg',
    phaseName: 'Multi-Stage Veg, Advanced Topping & Weaving',
    phaseStartDay: 1,
    phaseEndDay: null,
    checkpoints: [
      { id: 'transplant-1', label: 'Transplant 1: Moved to 1-Gallon Pot (Day 10-14)', checked: false },
      { id: 'transplant-2', label: 'Transplant 2: Moved to final 7-Gallon Pot (1 week before Flip)', checked: false },
      { id: 'cyclops', label: 'Cyclops Method placeholder cup used for perfect soil mold', checked: false },
      { id: 'root-shield', label: 'Root Shield: Root ball and soil hole dusted with microbial root enhancer', checked: false },
      { id: 'saturate', label: 'Full-Circle Saturate: Circle watering applied with 10-20% runoff achieved', checked: false },
      { id: 'airflow', label: 'Airflow: Oscillating fans adjusted; all ladies are actively dancing', checked: false },
      { id: 'first-top', label: 'Training Step 1: First Topping complete (Cut above 5th node at 6-node maturity)', checked: false },
      { id: 'quad-top', label: 'Training Step 2: Quad-Main Topping complete (Topped both new split mains)', checked: false },
      { id: 'trellis', label: 'Canopy Footprint: Low trellis net installed 8 inches above pots', checked: false },
      { id: 'weaving', label: 'Weaving: Shoots manually bent and woven horizontally under the net', checked: false },
      { id: 'space-check', label: 'Space Check: Canopy has successfully filled out 75% of the tent footprint', checked: false },
    ],
  },
  {
    phaseId: 'flip',
    phaseName: 'The Strip & Flip Flower Phase',
    phaseStartDay: 1,
    phaseEndDay: null,
    checkpoints: [
      { id: 'light-12-12', label: 'Light timer shifted to strict 12 hours ON / 12 hours OFF', checked: false },
      { id: 'light-leak', label: 'Light Leak Check: Verified 100% total darkness during the 12-hour off cycle', checked: false },
      { id: 'the-strip', label: 'The Strip: 100% of the bottom 30% of growth underneath the net stripped off', checked: false },
      { id: 'clones', label: 'Clone Loophole: Lower stripped nodes saved, labeled, and placed in nursery as mothers', checked: false },
      { id: 'day-21-stop', label: 'Day 21 of Flower: Canopy stretch stopped. All horizontal tucking halted.', checked: false },
      { id: 'day-21-dress', label: 'Day 21 Top Dressing: 1 full cup of DNC Bloom Dressing scratched in and watered', checked: false },
    ],
  },
  {
    phaseId: 'harvest',
    phaseName: 'G7 Trophy Harvest & 60/60 Cure',
    phaseStartDay: 1,
    phaseEndDay: null,
    checkpoints: [
      { id: 'loupe-amber', label: 'Loupe Inspection: 10-20% Amber trichomes achieved', checked: false },
      { id: 'chop', label: 'Harvest: Plants chopped and hung upside down', checked: false },
      { id: 'cure-env', label: 'Cure Environment: Drying space locked at 60F and 60% Relative Humidity', checked: false },
      { id: 'fan-floor', label: 'Fan Isolation: Internal fan placed on floor pointing strictly UNDER the canopy', checked: false },
      { id: 'day-13-snap', label: 'Day 13 Verification: Branches distinctly snap. Ready for manicuring and jars.', checked: false },
    ],
  },
];
