import { EquipmentItem, GerminationPath, GrowDay, Milestone } from './types';

export const EQUIPMENT_LIST: EquipmentItem[] = [
  { id: 'soil', name: 'DNC Great Lakes Water Only Soil', description: 'Detroit Nutrient Company living soil. Mandatory base medium.', required: true },
  { id: 'pot', name: '7-Gallon Fabric Pots', description: 'Mandatory volume for organic nutrient runway. No exceptions.', required: true },
  { id: 'hygrometer', name: 'Digital Hygrometer', description: 'Monitor ambient temp and humidity. Target: 68-78F / 20-26C, 40-60% RH.', required: true },
  { id: 'tensiometer', name: 'Soil Tensiometer', description: 'Digital soil tension meter. Target: 80-120 mbar.', required: true },
  { id: 'uvb', name: 'UVB Light Fixture', description: 'Supplementary UVB for late-flower trichome induction.', required: true },
  { id: 'loupe', name: 'Jewelers Loupe / Microscope', description: '60x-100x magnification for trichome maturity assessment.', required: true },
  { id: 'water', name: 'Dechlorinated Tap Water', description: 'Bubble or let sit 24 hours before use.', required: true },
  { id: 'recharge', name: 'Recharge Microbial Inoculant', description: 'Premium microbial additive for soil biology.', required: true },
  { id: 'bloom-dress', name: 'DNC Bloom Top Dressing', description: 'Great Lakes Bloom Top Dressing for flower boost.', required: true },
];

export const GERMINATION_PATHS: GerminationPath[] = [
  {
    id: 'direct',
    name: 'Option A: Direct Potting (Starter Pocket)',
    steps: [
      {
        step: 1,
        title: 'Glass of Water Soak (24-48 Hours)',
        instructions: [
          'Fill glass with dechlorinated water at ~70F.',
          'Drop seed in dark location.',
          'Wait until taproot emerges (usually 24-48h).',
          'Do NOT soak past 48 hours.',
        ],
      },
      {
        step: 2,
        title: '7-Gallon Setup',
        instructions: [
          'Fill 7-gallon pot with DNC Great Lakes soil.',
          'Dig a Solo-cup-sized hole in the exact center.',
          'Fill hole with mild, unamended peat seed-starter mix.',
        ],
      },
      {
        step: 3,
        title: 'Moisten & Plant',
        instructions: [
          'Pre-moisten soil with 250 mL water.',
          'Plant taproot down, burying seed at 1/4 to 1/2 inch depth.',
          'Cover with a cut water bottle humidity dome.',
          'Keep dome vents slightly open after day 2.',
        ],
      },
      {
        step: 4,
        title: 'Sprout Phase (Days 1-5)',
        instructions: [
          'Light cycle: 24/0 or 20/4 at ~600 PPFD.',
          'Localized watering: 50-75 mL every 3-4 days directly around seedling.',
          'Remove dome once cotyledons open and stand upright.',
        ],
      },
    ],
  },
  {
    id: 'transplant',
    name: 'Option B: Solo Cup to 7-Gallon (Cyclops)',
    steps: [
      {
        step: 1,
        title: 'Soak & Seedling Cup',
        instructions: [
          'Soak seed in dechlorinated water 24-48h until taproot shows.',
          'Plant in Solo cup with mild seed-starter mix up to the lower ridge line.',
          'Do not overpack; roots need oxygen.',
        ],
      },
      {
        step: 2,
        title: 'Cyclops Mold',
        instructions: [
          'Fill 7-gallon pot with DNC soil.',
          'Bury an EMPTY Solo cup in the exact center as a placeholder.',
          'Pack soil firmly around the placeholder cup.',
          'Do not remove placeholder until transplant day.',
        ],
      },
      {
        step: 3,
        title: 'Zero-Shock Swap (Days 5-7)',
        instructions: [
          'Watch for white roots hitting Solo cup drainage holes.',
          'Once roots show: remove placeholder cup to reveal perfect mold.',
          'Slide seedling out gently.',
          'Drop into mold. Bury stem ALL THE WAY up to cotyledons to anchor stretch and force new root strikes.',
        ],
      },
    ],
  },
];

export const GROW_DAYS: GrowDay[] = [
  // Germination / Sprout
  { day: 1, stage: 'Sprout', title: 'Sprout Phase', instructions: ['Maintain 24/0 or 20/4 light cycle at ~600 PPFD.', 'Humidity dome in place. No feeding.'], wateringVolume: '50-75 mL every 3-4 days (localized)', envTargets: 'Temp: 70-75F, RH: 60-70%' },
  { day: 2, stage: 'Sprout', title: 'Sprout Phase', instructions: ['Monitor for shell cracking. Do not intervene unless helmet head stuck.'], wateringVolume: '50-75 mL every 3-4 days (localized)', envTargets: 'Temp: 70-75F, RH: 60-70%' },
  { day: 3, stage: 'Sprout', title: 'Sprout Phase', instructions: ['Cotyledons should begin to spread.'], wateringVolume: '50-75 mL every 3-4 days (localized)', envTargets: 'Temp: 70-75F, RH: 60-70%' },
  { day: 4, stage: 'Sprout', title: 'Sprout Phase', instructions: ['First true leaves may begin to form.'], wateringVolume: '50-75 mL every 3-4 days (localized)', envTargets: 'Temp: 70-75F, RH: 60-70%' },
  { day: 5, stage: 'Sprout', title: 'Sprout Phase', instructions: ['Remove humidity dome. First set of true leaves visible.'], wateringVolume: '50-75 mL every 3-4 days (localized)', envTargets: 'Temp: 70-75F, RH: 60-70%' },

  // Early Veg
  { day: 6, stage: 'Early Veg', title: 'Early Vegetative', instructions: ['Seedling establishing. Keep light moderate.'], wateringVolume: '100-150 mL localized', envTargets: 'Temp: 72-78F, RH: 55-65%' },
  { day: 7, stage: 'Early Veg', title: 'Early Vegetative', instructions: ['If using transplant method: execute zero-shock swap today if roots show.'], wateringVolume: '100-150 mL localized', envTargets: 'Temp: 72-78F, RH: 55-65%', warnings: ['Transplant window closes soon. Act on root signals.'] },
  { day: 8, stage: 'Early Veg', title: 'Localized Watering Ramp', instructions: ['Increase to 250-450 mL localized watering.', 'Water close to stem; avoid wetting leaves.'], wateringVolume: '250-450 mL localized', envTargets: 'Temp: 72-78F, RH: 50-60%, Soil Tension: 80-120 mbar' },
  { day: 9, stage: 'Early Veg', title: 'Early Vegetative', instructions: ['Monitor node spacing. Stretch should be minimal with proper light intensity.'], wateringVolume: '250-450 mL localized', envTargets: 'Temp: 72-78F, RH: 50-60%' },
  { day: 10, stage: 'Early Veg', title: 'Early Vegetative', instructions: ['Plant should have 2-3 nodes.', 'Inspect for pests daily.'], wateringVolume: '250-450 mL localized', envTargets: 'Temp: 72-78F, RH: 50-60%' },

  // Mid Veg
  { day: 11, stage: 'Mid Veg', title: 'Mid Vegetative', instructions: ['Roots expanding. Begin thinking about training strategy.'], wateringVolume: '400-600 mL', envTargets: 'Temp: 72-78F, RH: 50-60%' },
  { day: 12, stage: 'Mid Veg', title: 'Mid Vegetative', instructions: ['Side branches beginning to show.'], wateringVolume: '400-600 mL', envTargets: 'Temp: 72-78F, RH: 50-60%' },
  { day: 13, stage: 'Mid Veg', title: '1-Liter Watering Threshold', instructions: ['Step up to 1 Liter per watering.', 'Water evenly across surface, not just at stem.'], wateringVolume: '1 Liter', envTargets: 'Temp: 72-78F, RH: 50-60%, Soil Tension: 80-120 mbar' },
  { day: 14, stage: 'Mid Veg', title: 'Canopy Strategy Decision', instructions: ['Evaluate plant vigor NOW.', 'Count nodes: must have 4-5 visible nodes.', 'Check main stem diameter: must be >3mm with vertical ridges.', 'Lower nodes must show side growth.', 'If all criteria met: precision topping is viable.'], warnings: ['If plant is slow or stressed, do NOT top. Choose LST instead.', 'This is the last safe topping window.'], milestones: ['Canopy Strategy Selector opens today.'] },
  { day: 15, stage: 'Mid Veg', title: 'Training Execution', instructions: ['Execute chosen strategy: Precision Topping OR Aggressive Main-Stem LST.', 'Topping: cleanly snip main growth tip above 4th or 5th node.', 'LST: secure soft garden wire anchor at trunk base; loop top growth tip and bend main stem parallel to soil.'], warnings: ['Sterilize blade with alcohol before topping.', 'Do not break the main stem during LST.'], milestones: ['Training applied. Recovery begins.'] },
  { day: 16, stage: 'Mid Veg', title: 'Training Recovery', instructions: ['Maintain stable environment. No additional stress for 48 hours.'], wateringVolume: '1 Liter', envTargets: 'Temp: 72-78F, RH: 50-60%' },

  // Late Veg
  { day: 17, stage: 'Late Veg', title: 'Late Vegetative', instructions: ['New growth tips should be visible on topped plants.', 'LST plants: branches turning upward toward light.'], wateringVolume: '1.5 Liters', envTargets: 'Temp: 72-78F, RH: 45-55%' },
  { day: 18, stage: 'Late Veg', title: '2-Liter Watering Threshold', instructions: ['Step up to 2 Liters per feeding.', '1 Liter close to plant, 1 Liter at outer edge to drive root expansion.', 'Soil tension MUST read 80-120 mbar before next watering.'], wateringVolume: '2 Liters (1L close + 1L outer edge)', envTargets: 'Temp: 72-78F, RH: 45-55%, Soil Tension: 80-120 mbar' },
  { day: 19, stage: 'Late Veg', title: 'Late Vegetative', instructions: ['Canopy filling out. Keep light intensity rising.'], wateringVolume: '2 Liters', envTargets: 'Temp: 72-78F, RH: 45-55%' },
  { day: 20, stage: 'Late Veg', title: 'Late Vegetative', instructions: ['Secondary branching should be vigorous.'], wateringVolume: '2 Liters', envTargets: 'Temp: 72-78F, RH: 45-55%' },
  { day: 21, stage: 'Late Veg', title: 'Secondary Tie-Down', instructions: ['Remove two large fan leaves directly under main upper branches.', 'Pull dominant branches down/outward with soft wire.', 'Prune off the two lowest, tiniest nodes at the absolute base of bottom branches (Early Lollipopping).'], warnings: ['Only remove leaves that block lower bud sites.', 'Do not over-defoliate.'], milestones: ['Early Lollipopping complete. Canopy flattening in progress.'] },
  { day: 22, stage: 'Late Veg', title: 'Late Vegetative', instructions: ['Branches responding to LST. Adjust ties as needed.'], wateringVolume: '2 Liters', envTargets: 'Temp: 72-78F, RH: 45-55%' },
  { day: 23, stage: 'Late Veg', title: 'Late Vegetative', instructions: ['Monitor for any branch dominance. Re-tie if one branch shoots ahead.'], wateringVolume: '2 Liters', envTargets: 'Temp: 72-78F, RH: 45-55%' },
  { day: 24, stage: 'Late Veg', title: 'Late Vegetative', instructions: ['Canopy should be forming a flat table.'], wateringVolume: '2 Liters', envTargets: 'Temp: 72-78F, RH: 45-55%' },
  { day: 25, stage: 'Late Veg', title: 'Late Vegetative', instructions: ['Final checks before pre-flower transition.'], wateringVolume: '2 Liters', envTargets: 'Temp: 72-78F, RH: 45-55%' },
  { day: 26, stage: 'Late Veg', title: 'Canopy Leveling', instructions: ['Pin side branches outward to maintain flat elevation.', 'Snip inward-pointing leaves to open airflow.', 'Goal: even, flat table of 8-10 main colas.'], milestones: ['Canopy table established. Ready for flower.'] },

  // Pre-Flower
  { day: 27, stage: 'Pre-Flower', title: 'Pre-Flower Transition', instructions: ['Watch for pre-flower nodes showing white stigmas.', 'Light cycle stays 20/4 or 18/6.'], wateringVolume: '2.5 Liters', envTargets: 'Temp: 70-78F, RH: 45-50%' },
  { day: 28, stage: 'Pre-Flower', title: 'Pre-Flower', instructions: ['Sex confirmation: white hairs = female.'], wateringVolume: '2.5 Liters', envTargets: 'Temp: 70-78F, RH: 45-50%' },
  { day: 29, stage: 'Pre-Flower', title: 'Pre-Flower', instructions: ['Stretch phase beginning. Maintain LST ties.'], wateringVolume: '2.5 Liters', envTargets: 'Temp: 70-78F, RH: 45-50%' },

  // Early Flower
  { day: 30, stage: 'Early Flower', title: 'Bloom Shift', instructions: ['White stigmas confirmed. Full flowering underway.', 'Step up water to 3-4 Liters per feeding.', 'Fine-tune LST stakes for last time.', 'CEASE all branch pruning and lollipopping.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-50%', warnings: ['No more pruning. Every fan leaf is now a sugar factory.'], milestones: ['Bloom shift complete. Flower cycle begins.'] },
  { day: 31, stage: 'Early Flower', title: 'Early Flower', instructions: ['Flower sites stacking. Maintain airflow.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-50%' },
  { day: 32, stage: 'Early Flower', title: 'Early Flower', instructions: ['Lower humidity if possible to 40-45%.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-45%' },
  { day: 33, stage: 'Early Flower', title: 'Early Flower', instructions: ['Watch for any mold in dense lower canopy. Thin ONLY if absolutely necessary.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-45%' },
  { day: 34, stage: 'Early Flower', title: 'Early Flower', instructions: ['Bud sites multiplying. Stay the course.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-45%' },
  { day: 35, stage: 'Early Flower', title: 'The Flower Boost', instructions: ['Top-dress with 1/2 to 1 cup of DNC Great Lakes Bloom Dressing.', 'Scratch into top 1 inch of soil.', 'Water in thoroughly with 3-4 Liters.', 'Early trichome stacking begins.'], wateringVolume: '3-4 Liters (water in bloom dress)', envTargets: 'Temp: 68-77F, RH: 40-45%', milestones: ['Early Trichome Stacking: Look for stigmas clustering in dense bundles and early resin lines on sugar leaves.'] },

  // Mid Flower
  { day: 36, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Bloom dress activated. Microbial activity ramping.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-45%' },
  { day: 37, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Buds swelling. Maintain VPD in target range.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-45%' },
  { day: 38, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Colas elongating. Support stakes may be needed for heavy branches.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-45%' },
  { day: 39, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Check for any nutrient deficiency at this stage.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-45%' },
  { day: 40, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Flower bulk increasing.'], wateringVolume: '3-4 Liters', envTargets: 'Temp: 68-77F, RH: 40-45%' },
  { day: 41, stage: 'Mid Flower', title: 'Frost Explosion', instructions: ['Trichomes should coat sugar leaves and visibly spread down cola sides.', 'If you have not started UVB and night temp drops, begin NOW.'], envTargets: 'Temp: 68-77F day / 58-67F night, RH: 40-45%', warnings: ['Wear UV eyewear when UVB light is on.', 'Ensure genetics are stable before applying stress.'], milestones: ['Frost Explosion: Trichomes coating sugar leaves and spreading down cola sides.'] },

  { day: 42, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['UVB blast: 2-4 hours daily during main light cycle.', 'Night temp drop: lower by 10F relative to daytime.'], envTargets: 'Temp: 68-77F day / 58-67F night, RH: 40-45%' },
  { day: 43, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Monitor for any light/heat stress from UVB addition.'], envTargets: 'Temp: 68-77F day / 58-67F night, RH: 40-45%' },
  { day: 44, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Buds should feel noticeably resinous to touch.'], envTargets: 'Temp: 68-77F day / 58-67F night, RH: 40-45%' },
  { day: 45, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Canopy is peak heavy. Check branch supports.'], envTargets: 'Temp: 68-77F day / 58-67F night, RH: 40-45%' },
  { day: 46, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Maintain dryback between waterings.'], envTargets: 'Temp: 68-77F day / 58-67F night, RH: 40-45%' },
  { day: 47, stage: 'Mid Flower', title: 'Mid Flower', instructions: ['Aroma intensifying. Ensure carbon filter / exhaust is functional.'], envTargets: 'Temp: 68-77F day / 58-67F night, RH: 40-45%' },

  // Late Flower
  { day: 48, stage: 'Late Flower', title: 'Stigma Transition', instructions: ['Fast-finishing traits: stigmas shift from white to orange/brown.', 'Prepare for dryback sequence.', 'Continue UVB and night drops.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%', milestones: ['Stigma Transition: Fast-finishing traits show white to orange/brown hairs.'] },
  { day: 49, stage: 'Late Flower', title: 'Late Flower', instructions: ['Bud growth rate slowing. Focus on resin production now.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%' },
  { day: 50, stage: 'Late Flower', title: 'Late Flower', instructions: ['Lower branches may be lagging behind. This is normal.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%' },
  { day: 51, stage: 'Late Flower', title: 'Late Flower', instructions: ['Check loupe: most trichome heads should be milky by now.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%' },
  { day: 52, stage: 'Late Flower', title: 'Late Flower', instructions: ['Some amber may appear on sugar leaves.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%' },
  { day: 53, stage: 'Late Flower', title: 'Late Flower', instructions: ['Canopy may show natural fade. Do not panic.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%' },
  { day: 54, stage: 'Late Flower', title: 'Late Flower', instructions: ['Aroma at peak.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%' },
  { day: 55, stage: 'Late Flower', title: 'Late Flower', instructions: ['Evaluate: if mostly milky with 10-20% amber, harvest window approaching.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%' },
  { day: 56, stage: 'Late Flower', title: 'Late Flower', instructions: ['Decision point: harvest now or extend 7-10 days for more amber.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-45%' },
  { day: 57, stage: 'Late Flower', title: 'Senescence & Fade', instructions: ['Natural yellowing/purpling spreading.', 'Bud uptake slowing significantly.', 'Use loupe to check for milky/amber heads on CALYX, not sugar leaves.'], warnings: ['Sugar leaves amber faster than calyx. Always check calyx trichomes for harvest timing.'], milestones: ['Senescence & Fade: Natural yellowing/purpling. Evaluate final harvest window or extend 7-10 days.'] },

  // Extended late flower (days 58-67)
  { day: 58, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['If extending: maintain UVB and night drops.', 'Monitor for any degradation signs.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },
  { day: 59, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['Trichome maturity increasing.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },
  { day: 60, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['Evaluate again: harvest window or extend further?'], warnings: ['Autoflower genetics have limits. Do not push past obvious degradation.'], milestones: ['Senescence & Fade: Evaluate final harvest window or extend 7-10 days.'] },
  { day: 61, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['If still extending, monitor daily for bud rot.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },
  { day: 62, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['Amber trichomes should be 30-50% now if extending.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },
  { day: 63, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['Final stretch. Plan harvest date.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },
  { day: 64, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['Check moisture levels. Lower RH aggressively if needed.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },
  { day: 65, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['Pre-harvest: prepare drying space.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },
  { day: 66, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['Harvest decision: do not wait past peak amber.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },
  { day: 67, stage: 'Late Flower', title: 'Late Flower Extension', instructions: ['Final evaluation with loupe.'], envTargets: 'Temp: 68-75F day / 58-65F night, RH: 35-40%' },

  // Subzero Protocol (last 14 days before harvest — user triggers manually)
  // These are shown when Subzero mode is active
];

export const SUBZERO_DAYS: GrowDay[] = [
  { day: -14, stage: 'Subzero', title: 'Subzero Protocol: Day 1', instructions: ['Begin UVB Light Blast: 2-4 hours daily during main light cycle.', 'Begin 10F Night Temperature Drop.', 'Genetics must be stable. Wear UV eyewear.'], warnings: ['Do NOT begin Subzero if plant shows stress, disease, or instability.'] },
  { day: -13, stage: 'Subzero', title: 'Subzero Protocol: Day 2', instructions: ['Continue UVB blast and night drops.', 'Monitor for any UVB burn on upper leaves.'] },
  { day: -12, stage: 'Subzero', title: 'Subzero Protocol: Day 3', instructions: ['Trichome production should visibly intensify.', 'Maintain environmental consistency.'] },
  { day: -11, stage: 'Subzero', title: 'Subzero Protocol: Day 4', instructions: ['Continue UVB blast and night drops.'] },
  { day: -10, stage: 'Subzero', title: 'Subzero Protocol: Day 5', instructions: ['Continue UVB blast and night drops.'] },
  { day: -9, stage: 'Subzero', title: 'Subzero Protocol: Day 6', instructions: ['Continue UVB blast and night drops.'] },
  { day: -8, stage: 'Subzero', title: 'Subzero Protocol: Day 7', instructions: ['Begin Extreme Drybacks (Last 7 Days).', 'Halt regular watering schedule.', 'Allow medium to dry out significantly.'], warnings: ['This is controlled drought stress. Do not let plants completely collapse.'] },
  { day: -7, stage: 'Subzero', title: 'Subzero Protocol: Day 8', instructions: ['Dryback continuing. Soil should be noticeably dry.', 'Leaves may begin to wilt slightly. This is expected.'] },
  { day: -6, stage: 'Subzero', title: 'Subzero Protocol: Day 9', instructions: ['Dryback continuing. Monitor for excessive wilting.'] },
  { day: -5, stage: 'Subzero', title: 'Subzero Protocol: Day 10', instructions: ['Dryback continuing.'] },
  { day: -4, stage: 'Subzero', title: 'Subzero Protocol: Day 11', instructions: ['Dryback peaking. Controlled drought state active.'] },
  { day: -3, stage: 'Subzero', title: 'Subzero Protocol: Ice Water Flush', instructions: ['Flood soil with ice-cold water OR lay fresh ice cubes over DNC soil surface.', 'This is the final stress trigger.'], warnings: ['Use dechlorinated water. Do not overwater if soil is already saturated below surface.'] },
  { day: -2, stage: 'Subzero', title: 'Subzero Protocol: Day 13', instructions: ['Begin Last Panic Dump preparation.', 'Ensure grow space can be sealed for total darkness.'] },
  { day: -1, stage: 'Subzero', title: 'Subzero Protocol: Final Darkness', instructions: ['Execute 100% total darkness in grow space for final 48-72 hours.', 'No light leaks. No checking with lights on.', 'Prepare for harvest immediately after darkness period.'], warnings: ['Total darkness is critical. Any light leak ruins the protocol.'] },
];

export const MILESTONES: Milestone[] = [
  { day: 14, label: 'Canopy Strategy Decision', description: 'Evaluate vigor and choose topping or LST path.', technicalTarget: '4-5 nodes, >3mm stem, side growth visible.' },
  { day: 21, label: 'Secondary Tie-Down', description: 'Early lollipopping and branch positioning.', technicalTarget: 'Flat table forming. Lowest nodes removed.' },
  { day: 26, label: 'Canopy Leveling', description: 'Final pre-flower canopy adjustments.', technicalTarget: 'Even 8-10 main colas at same elevation.' },
  { day: 30, label: 'Bloom Shift', description: 'Full flowering confirmed. Water and light ramp.', technicalTarget: '3-4L watering. No more pruning.' },
  { day: 35, label: 'Early Trichome Stacking', description: 'Stigmas clustering, early resin on sugar leaves.', technicalTarget: 'Verify bloom dressing application. 1/2 to 1 cup.' },
  { day: 41, label: 'Frost Explosion', description: 'Trichomes coat sugar leaves, spread down colas.', technicalTarget: 'Verify UVB and night temp drop active.' },
  { day: 48, label: 'Stigma Transition', description: 'White to orange/brown hair shift.', technicalTarget: 'Prepare for dryback sequence.' },
  { day: 57, label: 'Senescence & Fade', description: 'Natural yellowing/purpling. Harvest window.', technicalTarget: 'Evaluate milky/amber calyx trichomes. Extend or harvest.' },
];
