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
      </div>
    </div>
  );
}
