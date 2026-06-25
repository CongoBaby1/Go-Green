import { PhotoEquipmentItem, PhotoGerminationPath, PhotoPhase, PhotoMilestone } from './types';

export const PHOTO_EQUIPMENT_LIST: PhotoEquipmentItem[] = [
  { id: 'soil', name: 'Fox Farm Ocean Forest OR Coco/Perlite Mix', description: 'Base medium for photoperiod grows. Choose one.', required: true },
  { id: 'gallon-1', name: '1-Gallon Fabric Pots (x2)', description: 'Transitional pot for veg phase before final pot.', required: true },
  { id: 'gallon-7', name: '7-Gallon Fabric Pots', description: 'Final pot. Fill 1 week before light flip.', required: true },
  { id: 'solo-cups', name: 'Solo Cups (with drainage holes)', description: 'Starter homes for germinated seedlings.', required: true },
  { id: 'hygrometer', name: 'Digital Hygrometer', description: 'Target: 68-78F / 20-26C, 40-60% RH veg, 40-50% flower.', required: true },
  { id: 'nutrients', name: 'General Hydroponics Flora Duo Series', description: 'Max 850-950 PPM. pH 5.5-5.8 veg, 6.2 flower.', required: true },
  { id: 'ph-meter', name: 'Digital pH Meter', description: 'Mandatory for synthetic nutrient grows.', required: true },
  { id: 'ppm-meter', name: 'PPM/EC Meter', description: 'Monitor nutrient strength. Target max 850-950 PPM.', required: true },
  { id: 'microbial', name: 'Microbial Root Enhancer', description: 'Dust root ball and soil hole during every transplant.', required: true },
  { id: 'loupe', name: 'Jewelers Loupe / Microscope', description: '60x-100x magnification for trichome assessment.', required: true },
  { id: 'trellis', name: 'Low Trellis Net', description: 'Install 8 inches above final pot. 75% footprint fill target.', required: true },
  { id: 'fans', name: 'Oscillating Fans', description: 'Position so every plant is actively dancing. Eliminate stagnant air.', required: true },
  { id: 'timer', name: '12/12 Light Timer', description: 'Absolute precision required. Zero light leaks.', required: true },
  { id: 'dark-tent', name: 'Light-Proof Grow Tent', description: 'Critical for 12-hour dark cycle. Zipper light leaks = hermaphrodites.', required: true },
];

export const PHOTO_GERMINATION_PATHS: PhotoGerminationPath[] = [
  {
    id: 'solo-cup',
    name: 'G7 Precision Germination',
    steps: [
      {
        step: 1,
        title: 'The Zero-Pat Planting',
        instructions: [
          'After water soak (24-48h), place seeds exactly 1/4 to 1/2 inch deep into Solo cup of starter medium.',
          'Cover with loose dirt.',
          'NEVER pat it down. Pressure suffocates the taproot.',
        ],
      },
      {
        step: 2,
        title: 'The Hair-Tie Greenhouse',
        instructions: [
          'Secure plastic wrap over the top of the Solo cup with a hair tie.',
          'This locks in a high-humidity greenhouse environment until emergence.',
          'Keep temps at 75-78F.',
          'Remove plastic wrap immediately once cotyledons break surface.',
        ],
      },
      {
        step: 3,
        title: 'Syringe Feeding',
        instructions: [
          'Water exclusively with a syringe close to the stem.',
          'Prevents fragile seedling from tipping.',
          'Prevents drowning the taproot.',
          'Small volumes: 10-20 mL every 2-3 days.',
        ],
      },
    ],
  },
];

export const PHOTO_PHASES: PhotoPhase[] = [
  // Seedling
  {
    phase: 'seedling',
    stage: 'Seedling',
    title: 'Seedling Phase',
    instructions: [
      'Maintain Hair-Tie Greenhouse until emergence.',
      'Syringe feed only. No nutrients yet.',
      'Light: 18/6 at moderate intensity.',
    ],
    wateringVolume: '10-20 mL via syringe every 2-3 days',
    envTargets: 'Temp: 75-78F, RH: 65-70%',
    warnings: ['Never pat soil down after planting. Loose cover only.'],
  },

  // Early Veg
  {
    phase: 'veg-early',
    stage: 'Early Veg',
    title: 'Early Vegetative (Solo Cup)',
    instructions: [
      'First true leaves established.',
      'Continue syringe feeding close to stem.',
      'Watch for roots at Solo cup drainage holes.',
    ],
    wateringVolume: '20-40 mL via syringe every 2-3 days',
    envTargets: 'Temp: 72-78F, RH: 55-65%',
  },
  {
    phase: 'veg-early-2',
    stage: 'Early Veg',
    title: 'Early Vegetative (Solo Cup Week 2)',
    instructions: [
      'Plant should have 3-4 nodes.',
      'Prepare for first transplant to 1-gallon pot.',
    ],
    wateringVolume: '40-60 mL',
    envTargets: 'Temp: 72-78F, RH: 50-60%',
  },

  // Mid Veg — Transplant to 1-Gallon
  {
    phase: 'veg-mid-transplant',
    stage: 'Mid Veg',
    title: '1-Gallon Transplant (Day 10-14)',
    instructions: [
      'Fill 1-gallon pot with fresh medium.',
      'Use Cyclops soil molding: bury empty Solo cup, pack soil, remove to create perfect mold.',
      'Dust outside of root ball and inside soil hole with microbial root enhancer.',
      'Slide seedling into mold. Water in with Full-Circle Saturate.',
    ],
    wateringVolume: 'Full-Circle Saturate: water in circles until 10-20% runoff',
    envTargets: 'Temp: 72-78F, RH: 50-60%',
    milestones: ['First transplant complete. Roots expanding.'],
  },
  {
    phase: 'veg-mid',
    stage: 'Mid Veg',
    title: 'Mid Vegetative (1-Gallon)',
    instructions: [
      'Plant establishing in 1-gallon.',
      'Begin light nutrient feed at 1/4 strength (200-250 PPM).',
      'pH 5.5-5.8.',
      'Position oscillating fans so plant is actively dancing.',
    ],
    wateringVolume: 'Full-Circle Saturate every 3-4 days',
    envTargets: 'Temp: 72-78F, RH: 50-60%, PPM: 200-250, pH: 5.5-5.8',
    milestones: ['The Dancing Ladies airflow active.'],
  },
  {
    phase: 'veg-mid-2',
    stage: 'Mid Veg',
    title: 'Mid Veg: First Top',
    instructions: [
      'Wait until plant shows 6 full nodes.',
      'Cleanly cut main stem above the 5th node.',
      'Sterilize blade with alcohol before and after.',
      'This creates the foundation for the Quad-Main structure.',
    ],
    warnings: ['Do not top if plant is stressed, slow, or under 6 nodes.'],
    milestones: ['First Top complete: 2 primary mains established.'],
  },

  // Late Veg
  {
    phase: 'veg-late',
    stage: 'Late Veg',
    title: 'Late Veg: Second Top',
    instructions: [
      'Allow the 2 new primary mains to grow out 2 nodes each.',
      'Top both mains again to create 4 uniform framework branches.',
      'These 4 branches are your Quad-Main foundation.',
    ],
    warnings: ['Ensure recovery between tops. Watch for vigorous new growth before second cut.'],
    milestones: ['Second Top complete: Quad-Main structure (4 mains) established.'],
  },
  {
    phase: 'veg-late-2',
    stage: 'Late Veg',
    title: 'Late Veg: Trellis Weaving',
    instructions: [
      'Install trellis net 8 inches above the 1-gallon pot.',
      'Manually bend, pull, and weave branches horizontally beneath the net.',
      'Goal: fill 75% of grow tent footprint with a flat canopy grid.',
      'Continue tucking branches under net as they grow.',
    ],
    wateringVolume: 'Full-Circle Saturate',
    envTargets: 'Temp: 72-78F, RH: 45-55%, PPM: 400-600, pH: 5.5-5.8',
    milestones: ['Trellis net installed. Canopy weaving in progress.'],
  },
  {
    phase: 'veg-late-3',
    stage: 'Late Veg',
    title: 'Late Veg: Final Transplant',
    instructions: [
      'Fill 7-gallon final pot with fresh medium.',
      'Cyclops mold technique again.',
      'Dust root ball and soil hole with microbial enhancer.',
      'Transplant 1 week BEFORE planned flip date.',
      'Let plant recover and fill trellis to 75% before flipping.',
    ],
    wateringVolume: 'Full-Circle Saturate until 10-20% runoff',
    envTargets: 'Temp: 72-78F, RH: 45-55%, PPM: 500-700, pH: 5.5-5.8',
    milestones: ['Final transplant to 7-gallon complete.'],
  },

  // Pre-Flip
  {
    phase: 'pre-flip',
    stage: 'Pre-Flip',
    title: 'Ready to Flip',
    instructions: [
      'Trellis should be 75% full of horizontal branches.',
      'Canopy should be a flat grid of 12-16+ potential bud sites.',
      'When ready: manually shift light timer to strict 12/12 cycle.',
    ],
    manualTrigger: true,
    triggerLabel: 'I have flipped my lights to 12/12',
    warnings: ['Absolute total darkness is mandatory during 12-hour off cycle. A single light leak will hermaphrodite the plant.'],
    milestones: ['FLIP TRIGGER: User must manually confirm 12/12 transition.'],
  },

  // Early Flower — Strip & Flip
  {
    phase: 'flower-early-strip',
    stage: 'Early Flower',
    title: 'The Strip & Flip',
    instructions: [
      'On the exact day of the flip: perform heavy lollipopping.',
      'Strip away 100% of the bottom 30% of all growth, fan leaves, and lower shoots underneath the trellis net.',
      'All energy now redirects to the top canopy.',
      'Save, label, and clone the lower nodes pruned off during the strip.',
      'These become independent nursery mothers for this phenotype.',
    ],
    warnings: ['The Strip is aggressive. Do not strip more than bottom 30%.', 'Clones must be rooted immediately. Do not let cuttings sit dry.'],
    milestones: ['Strip & Flip complete. Eternal Mother clones saved.'],
  },
  {
    phase: 'flower-early',
    stage: 'Early Flower',
    title: 'Early Flower: The Stretch',
    instructions: [
      'Week 1-2 of 12/12: flowering stretch active.',
      'Branches will double or triple in height.',
      'Continue tucking horizontal branches under trellis net.',
      'Switch nutrients to bloom formula. pH 6.2.',
    ],
    wateringVolume: 'Full-Circle Saturate every 2-3 days',
    envTargets: 'Temp: 68-77F, RH: 40-50%, PPM: 700-850, pH: 6.2',
    warnings: ['Continue tucking branches horizontally. Do not let vertical shoots escape net.'],
  },

  // Mid Flower
  {
    phase: 'flower-mid',
    stage: 'Mid Flower',
    title: 'Mid Flower: Lock-In (Day 21 of Flower)',
    instructions: [
      'Flowering stretch ends. Stop all horizontal branch tucking.',
      'Let the buds stand up vertically now.',
      'Top-dress with 1 full cup of bloom dressing scratched into topsoil.',
      'Water in thoroughly.',
    ],
    wateringVolume: 'Full-Circle Saturate with runoff',
    envTargets: 'Temp: 68-77F, RH: 40-45%, PPM: 800-950, pH: 6.2',
    milestones: ['Mid-Flower Lock-In: Vertical bud growth begins. Bloom dressing applied.'],
  },
  {
    phase: 'flower-mid-2',
    stage: 'Mid Flower',
    title: 'Mid Flower: Bulk Phase',
    instructions: [
      'Buds stacking and swelling.',
      'Maintain airflow to prevent mold in dense canopy.',
      'Check for nutrient deficiency at this stage.',
    ],
    wateringVolume: 'Full-Circle Saturate every 2-3 days',
    envTargets: 'Temp: 68-77F, RH: 40-45%, PPM: 800-950, pH: 6.2',
  },
  {
    phase: 'flower-mid-3',
    stage: 'Mid Flower',
    title: 'Mid Flower: Frost Building',
    instructions: [
      'Trichome production ramping.',
      'Aroma intensifying. Ensure carbon filter is functional.',
    ],
    envTargets: 'Temp: 68-77F, RH: 40-45%',
  },

  // Late Flower
  {
    phase: 'flower-late',
    stage: 'Late Flower',
    title: 'Late Flower: Stigma Transition',
    instructions: [
      'Stigmas shift from white to orange/brown.',
      'Bud growth rate slowing. Focus on resin production.',
      'Begin loupe checks on CALYX trichomes, not sugar leaves.',
    ],
    envTargets: 'Temp: 68-75F, RH: 35-45%',
    warnings: ['Sugar leaves amber faster than calyx. Always check calyx for harvest timing.'],
    milestones: ['Stigma Transition: Evaluate harvest window.'],
  },
  {
    phase: 'flower-late-2',
    stage: 'Late Flower',
    title: 'Late Flower: Harvest Window',
    instructions: [
      'Use loupe starting week 7-9 of flower.',
      'Target 10-20% amber heads for heavy body relaxation.',
      'Target 100% milky white for potent head high.',
    ],
    envTargets: 'Temp: 68-75F, RH: 35-40%',
    milestones: ['Harvest Window: Trichome maturity determines exact chop day.'],
  },

  // Flush
  {
    phase: 'flush',
    stage: 'Flush',
    title: 'The Pre-Harvest Flush',
    instructions: [
      'Stop all nutrients 7-10 days before planned harvest.',
      'Flush with pH-balanced water only (6.2).',
      'Runoff should be clear. No green tint.',
      'This removes residual salts and improves smoke quality.',
    ],
    wateringVolume: 'Heavy flush: 2x normal volume until runoff is clear',
    envTargets: 'Temp: 68-75F, RH: 35-40%',
    warnings: ['Do not harvest without flushing. Residual nutrients create harsh smoke and black ash.'],
  },

  // Harvest
  {
    phase: 'harvest',
    stage: 'Harvest',
    title: 'The G7 Trophy Harvest',
    instructions: [
      'Chop entire plant at base, leaving main stem intact.',
      'Remove large fan leaves but keep sugar leaves attached.',
      'Handle buds gently. Trichomes are fragile.',
    ],
    milestones: ['Harvest complete. Time to dry and cure.'],
  },

  // Dry
  {
    phase: 'dry',
    stage: 'Dry',
    title: 'The 60/60 Dry',
    instructions: [
      'Hang entire chopped plant upside down in a dark tent.',
      'Preset to 60F temperature and 60% Relative Humidity.',
      'Duration: 13 days.',
      'Place circulation fan strictly on the floor pointing UNDER the hanging canopy.',
      'Never allow a fan to blow directly onto drying buds.',
    ],
    envTargets: 'Temp: 60F, RH: 60%, Duration: 13 days',
    warnings: ['Direct airflow on buds flashes off volatile terpenes. Keep fan off buds.', 'Light degrades cannabinoids. Total darkness required.'],
  },

  // Cure
  {
    phase: 'cure',
    stage: 'Cure',
    title: 'The 60/60 Cure',
    instructions: [
      'On Day 13: cleanly snap a small branch to verify dry completion.',
      'It should snap cleanly, not bend.',
      'Trim buds from branches.',
      'Jar in airtight glass containers (mason jars).',
      'Fill jars 75% full. Do not pack.',
      'Burp jars daily for first 2 weeks: open 15 minutes.',
      'After 2 weeks: burp weekly.',
      'Cure minimum 2 weeks. Ideal: 4-8 weeks.',
    ],
    envTargets: 'Temp: 60-65F, RH: 58-62% in jars',
    warnings: ['If buds feel damp in jar, leave lid off until surface dry. Prevent mold.'],
    milestones: ['Cure complete. Boutique quality achieved.'],
  },
];

export const PHOTO_MILESTONES: PhotoMilestone[] = [
  { phase: 'veg-mid-transplant', label: '1-Gallon Transplant', description: 'First transplant using Cyclops mold + microbial dusting.', technicalTarget: 'Root ball dusted. Full-Circle Saturate applied.' },
  { phase: 'veg-mid-2', label: 'First Top', description: 'Main stem cut above 5th node at 6+ nodes.', technicalTarget: 'Sterile blade. 2 primary mains established.' },
  { phase: 'veg-late', label: 'Second Top', description: 'Both mains topped again to create 4 uniform branches.', technicalTarget: 'Quad-Main structure complete.' },
  { phase: 'veg-late-2', label: 'Trellis Weaving', description: 'Branches woven horizontally under net to 75% footprint fill.', technicalTarget: 'Flat canopy grid of 12-16+ sites.' },
  { phase: 'veg-late-3', label: 'Final Transplant', description: 'Moved to 7-gallon 1 week before flip.', technicalTarget: 'Cyclops mold + microbial enhancer.' },
  { phase: 'pre-flip', label: 'The Flip', description: 'Light timer manually shifted to 12/12.', technicalTarget: 'Zero light leaks. Absolute darkness confirmed.' },
  { phase: 'flower-early-strip', label: 'Strip & Flip', description: 'Bottom 30% stripped. Clones saved as Eternal Mothers.', technicalTarget: 'Energy redirected to top canopy.' },
  { phase: 'flower-mid', label: 'Mid-Flower Lock-In', description: 'Stretch ends. Vertical growth begins. Bloom dressing applied.', technicalTarget: '1 full cup bloom dressing. pH 6.2.' },
  { phase: 'flower-late-2', label: 'Harvest Window', description: 'Trichome maturity dictates chop day.', technicalTarget: 'Calyx trichomes: 10-20% amber or 100% milky.' },
  { phase: 'dry', label: 'The 60/60 Dry', description: 'Upside-down hang at 60F/60%RH for 13 days.', technicalTarget: 'Fan under canopy only. Total darkness.' },
  { phase: 'cure', label: 'The 60/60 Cure', description: 'Mason jar burp cure. Minimum 2 weeks.', technicalTarget: 'Temp: 60-65F, RH: 58-62% in jars.' },
];
