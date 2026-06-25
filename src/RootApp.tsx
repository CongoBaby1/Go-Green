import { useState } from 'react';
import AutoApp from './App';
import PhotoApp from './photoperiod/PhotoApp';

type SeedType = 'auto' | 'photo' | null;

export default function RootApp() {
  const [seedType, setSeedType] = useState<SeedType>(null);

  if (seedType === 'auto') {
    return <AutoApp />;
  }

  if (seedType === 'photo') {
    return <PhotoApp />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Go Green</h1>
          <p className="tagline">Elite Cannabis Cultivation Guide</p>
        </div>
      </header>

      <main className="main">
        <div className="seed-selector">
          <h2>Select Your Seed Type</h2>
          <p className="subtext">Your choice determines the entire grow methodology. These are completely separate systems.</p>

          <div className="manifesto">
            <p>You can substitute, change or edit any part of the grow to your personal choices however if you follow this app exactly, you can expect an elite, high-yield, boutique-quality harvest with three major defining characteristics:</p>
            <ol>
              <li>
                <strong>Maximum "Iced-Out" Trichome Coverage & Terpenes:</strong> By pairing high-quality genetics with the combination of UVB light exposure, deep 10°F night drops, and late-flower extreme drybacks, you are forcing the plant's natural defense systems into overdrive. Instead of standard "sticky" buds, your flowers will look completely frosted over—like they were dipped in sugar crystals. The cold shocks and drought stress also compress and lock in the volatile essential oils, giving you an incredibly loud, pungent terpene profile and maximum bag appeal.
              </li>
              <li>
                <strong>Dense, Heavy Buds Without Synthetic Chemicals:</strong> Because you are running a massive 7-gallon volume of premium DNC Great Lakes living soil, your plants will have an extensive, unhindered root zone. Combined with microbial inoculants (which handle nutrient transport and increase stress tolerance) and the DNC Bloom Top Dressing, your buds will swell naturally to their maximum genetic density. You get tight, rock-solid colas without ever having to touch synthetic chemical plant growth regulators (PGRs) that ruin flower quality.
              </li>
              <li>
                <strong>An Even, High-Yield Canopy with Zero Stunting:</strong> Following the precision-timed training choices and meticulous tie-down LST rules ensures that instead of growing one giant, vertical Christmas-tree-shaped cola (which causes small "larf" buds at the bottom), you will create a flat, horizontal table of 8 to 10 massive, identical main colas. Every single bud site will receive 100% equal light intensity from your fixtures, drastically increasing your overall final weight.
              </li>
            </ol>
            <blockquote className="wildcard-note">
              <strong>The Wildcard Note:</strong> Because autoflowers are grown from seed rather than identical clones, your exact final timeline and structure will always be dictated by the specific seed's phenotype expression. Some plants will finish like a sprint on Day 60 of flower, while others will want to pack on weight for an extra 10 days. Let the trichomes under your loupe guide your final decision, and you'll bring home an absolute trophy harvest.
            </blockquote>
          </div>

          <div className="seed-options">
            <button className="seed-card auto" onClick={() => setSeedType('auto')}>
              <span className="seed-label">Autoflower Seeds</span>
              <span className="seed-desc">Strict genetic countdown clock. Precision-timed training. Living soil, UVB frost, and extreme drybacks. Days 1-80+.</span>
              <span className="seed-features">DNC Living Soil | 7-Gallon | Real Growers Recharge | Subzero Protocol</span>
            </button>

            <button className="seed-card photo" onClick={() => setSeedType('photo')}>
              <span className="seed-label">Photoperiod Seeds</span>
              <span className="seed-desc">Grower-controlled timeline. Heavy manipulation. Strip & Flip method. Quad-Main topping. Trellis weaving. 60/60 cure.</span>
              <span className="seed-features">Fox Farm / Coco | GH Flora Duo | Trellis Net | G7 Genetics Blueprint</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>The trichomes under the loupe always dictate the final timeline.</p>
      </footer>
    </div>
  );
}
