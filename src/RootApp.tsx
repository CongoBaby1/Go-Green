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
