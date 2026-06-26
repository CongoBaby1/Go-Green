export function Guardrails() {
  return (
    <div className="guardrails">
      <h2>Execution Rules & Guardrails</h2>
      <p className="subtext">Behavioral guardrails that govern all guidance in this app.</p>

      <div className="guardrail-grid">
        <div className="guardrail-card critical">
          <h3>No Synthetic Recommendations</h3>
          <p>
            If you ask about chemical PK boosters or synthetic nutrients, the app will firmly redirect you to the organic living soil methodology.
          </p>
          <p className="rationale">Synthetics degrade boutique quality, kill soil microbiology, and produce harsh, inferior end product.</p>
        </div>

        <div className="guardrail-card critical">
          <h3>Autoflower Timing Safeguard</h3>
          <p>
            Never suggest heavy pruning, topping, or high-stress techniques outside the specified Day 14-16 and Day 21 windows.
          </p>
          <p className="rationale">Autoflowers run on a genetic countdown clock. Recovery time is not elastic. Delayed recovery ruins yields permanently.</p>
        </div>

        <div className="guardrail-card">
          <h3>Dynamic Response Generation</h3>
          <p>
            When you report your current grow day, the app cross-references the knowledge base and outputs precisely what your watering volumes, environmental targets, and training requirements should be at that exact moment.
          </p>
        </div>

        <div className="guardrail-card">
          <h3>The Wildcard Rule</h3>
          <p>
            Autoflowers are driven by a strict genetic countdown clock and phenotype expressions vary. The trichomes under the loupe always dictate the final timeline, not just the calendar day.
          </p>
        </div>

        <div className="guardrail-card">
          <h3>Watering Discipline</h3>
          <p>
            The app enforces a strict watering progression: localized small volumes early, ramping to full-pot saturation. The soil tensiometer reading (80-120 mbar) is the final authority on when to water, not a calendar schedule.
          </p>
        </div>

        <div className="guardrail-card">
          <h3>Harvest by Trichome, Not Calendar</h3>
          <p>
            The app provides approximate day ranges, but the harvest window is determined exclusively by trichome maturity observed through a loupe on the CALYX, not sugar leaves.
          </p>
        </div>

        <div className="guardrail-card">
          <h3>1-Gallon Living Soil Formula</h3>
          <p>
            Base: 1 Gallon non-chlorinated water or clean rainwater.
          </p>
          <p>
            Inoculant: 1 teaspoon Real Growers Recharge.
          </p>
          <p>
            Organic Matter: 29.5 mL Wiggle Worm Organic Worm Casting Tea.
          </p>
          <p>
            Fuel/Catalyst: 10 mL Microbe Life Hydroponics Vitamins and Amino Acids.
          </p>
          <p className="rationale">
            Living Soil pH Target: 6.0 - 6.5 (always adjust after mixing all ingredients together).<br/>
            Coco Coir pH Target: 5.8 - 6.0
          </p>
          <p>
            Application: Top-water evenly across soil surface. Water thoroughly until 10-15% runoff pours from bottom of pot. Empty drainage trays after watering so plants do not sit in stagnant runoff.
          </p>
          <p className="rationale">
            Crucial Wicking Adjustment: Because you are running a bottom-reservoir wicking system, do NOT water to heavy runoff. Forcing 15% of this thick organic tea out the bottom will drain directly into your clean reservoir and spoil it. Instead, top-pour just enough tea to thoroughly saturate the top 2-3 inches of soil. This delivers microbes right to the root zone and top-dress without flooding your clean reservoir below.
          </p>
        </div>

        <div className="guardrail-card">
          <h3>Tea Application Timeline</h3>
          <p><strong>Weeks 1-2 (Days 1-14):</strong> SKIP THE TEA. Plain water only. Seedling needs time to establish roots without being pushed.</p>
          <p><strong>Week 3 (Days 15-21):</strong> First Application. Top-water tea once this week to fuel explosive root growth and help the plant bounce back from early training.</p>
          <p><strong>Week 4 (Days 22-28):</strong> Second Application. Top-water tea once this week to build microbial population before transition to flower.</p>
          <p><strong>Week 5 (Day 35):</strong> Bloom Booster Kick. Scratch DNC Bloom Top Dressing into top inch of soil, then immediately water in heavily with tea batch to activate the organic powders.</p>
          <p><strong>Weeks 6-7 (Days 36-49):</strong> Peak Flower Swell. Top-water tea once a week to maximize bud density, stack weight, and unlock bound phosphorus.</p>
          <p><strong>Week 8 to Harvest (Day 50+):</strong> STOP THE TEA. Plain water only for final stretch. Soil is fully charged. Plant coasts on plain water until final dryback and chop.</p>
        </div>
      </div>
    </div>
  );
}
