import { useState, useEffect, useRef } from 'react';
import AutoApp from './App';
import PhotoApp from './photoperiod/PhotoApp';
import AuthScreen from './components/AuthScreen';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

type SeedType = 'auto' | 'photo' | null;

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function RootApp() {
  const [seedType, setSeedType] = useState<SeedType>(null);
  const [showApp, setShowApp] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<{ uid: string; email: string; name?: string } | null>(null);
  const [navSticky, setNavSticky] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({ uid: fbUser.uid, email: fbUser.email || '' });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setNavSticky(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      setShowApp(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setShowApp(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowApp(false);
  };

  // Deep-link into autoflower or photoperiod app
  if (seedType === 'auto') {
    return <AutoApp />;
  }
  if (seedType === 'photo') {
    return <PhotoApp />;
  }

  // Auth overlay
  if (showAuth) {
    return (
      <div className="app">
        <AuthScreen onAuth={handleAuthSuccess} />
        <button className="btn-text" onClick={() => setShowAuth(false)} style={{ margin: '1rem auto', display: 'block' }}>
          Back to Landing Page
        </button>
      </div>
    );
  }

  // App selector (seed type picker) — shown after "Get Started"
  if (showApp) {
    return (
      <div className="app">
        <header className="header">
          <div className="header-content">
            <div>
              <h1 className="logo">Go Green</h1>
              <p className="tagline">Elite Cannabis Cultivation Guide</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {user?.name && <span className="user-name">{user.name}</span>}
              {user && (
                <button className="btn-text" onClick={handleLogout}>
                  Log Out
                </button>
              )}
              <button className="btn-text" onClick={() => setShowApp(false)}>
                Back
              </button>
            </div>
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
                <span className="seed-desc">Grower-controlled timeline. Heavy manipulation. Strip and Flip method. Quad-Main topping. Trellis weaving. 60/60 cure.</span>
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

  // Landing Page
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`landing-nav ${navSticky ? 'sticky' : ''}`}>
        <div className="landing-nav-inner">
          <div className="landing-logo">Go Green</div>
          <div className="landing-links">
            <button className="landing-link" onClick={() => smoothScrollTo('features')}>Features</button>
            <button className="landing-link" onClick={() => smoothScrollTo('how-it-works')}>How It Works</button>
            <button className="landing-link" onClick={() => smoothScrollTo('security')}>About</button>
            <button className="landing-link" onClick={() => smoothScrollTo('final-cta')}>Pricing</button>
          </div>
          <div className="landing-nav-cta">
            {user ? (
              <>
                <span className="landing-user">{user.name || user.email}</span>
                <button className="btn-primary" onClick={handleGetStarted}>Dashboard</button>
              </>
            ) : (
              <button className="btn-primary" onClick={() => setShowAuth(true)}>
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" ref={heroRef} id="hero">
        <div className="hero-content">
          <h1 className="hero-headline">Stop Guessing. Start Growing Trophy Harvests.</h1>
          <p className="hero-subheadline">
            The first automated, state-driven cultivation assistant that builds a custom step-by-step checklist around your exact genetics, living soil, and setup. Zero confusion. Zero synthetic chemicals. Just elite, iced-out buds.
          </p>
          <button className="hero-cta" onClick={handleGetStarted}>
            Create Your Free Account
          </button>
          <p className="hero-subtext">No credit card required. Secure backend encryption.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-inner">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">The 3-Step Automation Loop</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Select Your Pathway</h3>
              <p className="step-desc">
                Tell the engine if you are running a strict genetic countdown clock with Autoflowers, or hand-building a massive canopy footprint with Photoperiods. Input your strain's projected lifecycle to anchor the math.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Follow Your Live Checklist</h3>
              <p className="step-desc">
                No massive walls of text or information overload. The app hides the future to keep you focused. You only see the interactive checkboxes, precise watering volumes, and organic formulas required for your plant's exact day of growth.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Trigger Elite Stress Protocols</h3>
              <p className="step-desc">
                When the automated clock hits the target, the app actively guides you through advanced training, the signature Strip and Flip methods, or our late-flower Subzero Frost Protocol to max out your trichomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="features" id="features">
        <div className="section-inner">
          <h2 className="section-title">Core App Features</h2>
          <p className="section-subtitle">What Makes Us Elite</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">M</div>
              <h3 className="feature-title">The Secret Microbial Tea Recipe</h3>
              <p className="feature-desc">
                Get precise, dynamic alerts on exactly when to brew our elite organic microbial tea mix consisting of Recharge, Worm Casting Tea, and Amino Acids. Includes our custom Wicking System Guardrail to keep your bottom-reservoirs perfectly clean and odor-free.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">G</div>
              <h3 className="feature-title">Genetic Countdown Precision</h3>
              <p className="feature-desc">
                Autoflowers do not have time for mistakes. If you miss a crucial vegetative window or attempt a high-stress technique too late, our smart guardrails flag an instant warning to protect your final yield.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">S</div>
              <h3 className="feature-title">The Strip and Flip Master Blueprint</h3>
              <p className="feature-desc">
                Growing photoperiods? Master the exact multi-stage topping schedules, low trellis net horizontal weaving, heavy lollipopping, and the clone loophole used by master growers to build a perfectly flat grid of identical main colas.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">Z</div>
              <h3 className="feature-title">The Subzero Protocol Controller</h3>
              <p className="feature-desc">
                Get timed, step-by-step prompts for the final 14-day push: tracking your supplemental UVB lighting windows, managing a 10-degree-F night drop, executing drybacks, shocking with ice flushes, and timing the final 72-hour total darkness dump.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="security" id="security">
        <div className="section-inner">
          <div className="security-callout">
            <h3 className="security-title">Security and Peace of Mind</h3>
            <div className="security-points">
              <div className="security-point">
                <strong>Secure Backend Infrastructure:</strong> Your personal grow logs, dates, and environmental metrics are fully encrypted and tied to a private, secure profile database.
              </div>
              <div className="security-point">
                <strong>100% Locally Compliant:</strong> Built strictly as an educational tracking and logging tool. You maintain complete, private control of your data dashboard.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta" id="final-cta">
        <div className="final-cta-inner">
          <h2 className="final-cta-headline">Ready to grow like an elite master?</h2>
          <p className="final-cta-subtext">
            Sign up in less than 60 seconds. Unlock your automated dashboard and give your living soil the precise microbial schedule it needs to thrive.
          </p>
          <button className="final-cta-button" onClick={handleGetStarted}>
            Initialize Your First Grow Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="footer-links">
            <span>2026 Go Green App</span>
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Terms of Service</button>
            <button className="footer-link">Contact Support</button>
          </div>
          <p className="footer-legal">
            Go Green is strictly an educational tool and software logging assistant. Always comply with local laws and regulations.
          </p>
        </div>
      </footer>
    </div>
  );
}
