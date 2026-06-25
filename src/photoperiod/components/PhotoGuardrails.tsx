export function PhotoGuardrails() {
  return (
    <div className="guardrails">
      <h2>G7 Execution Rules & Guardrails</h2>
      <p className="subtext">Behavioral guardrails that govern all photoperiod guidance.</p>

      <div className="guardrail-grid">
        <div className="guardrail-card critical">
          <h3>Absolute Darkness Mandate</h3>
          <p>
            During the 12-hour dark cycle, zero light can enter the grow space. A single photon leak from equipment LEDs, tent zippers, or adjacent rooms will hermaphrodite the plant.
          </p>
          <p className="rationale">
            Hermaphroditism destroys sinsemilla (seedless bud) and forces seed production mid-flower. The crop is ruined.
          </p>
        </div>

        <div className="guardrail-card critical">
          <h3>No Autoflower Techniques Here</h3>
          <p>
            Photoperiod plants have infinite recovery time. Techniques like the Strip & Flip, heavy lollipopping, and aggressive defoliation are safe ONLY because the grower controls the timeline via the light timer.
          </p>
          <p className="rationale">
            Applying photoperiod stress techniques to autoflowers would permanently stunt or kill them. These branches are walled off for safety.
          </p>
        </div>

        <div className="guardrail-card critical">
          <h3>The Flip is Manual, Not Automatic</h3>
          <p>
            The app will NOT advance past the vegetative stage until you manually press the "I have flipped my lights to 12/12" button. You control when flower begins.
          </p>
          <p className="rationale">
            Premature flipping yields small plants. Delayed flipping yields oversized, unmanageable canopy. The grower must judge 75% trellis fill.
          </p>
        </div>

        <div className="guardrail-card">
          <h3>The Eternal Mother Loophole</h3>
          <p>
            Lower nodes stripped during the flip must be immediately cloned and rooted. These are genetic backups of the exact phenotype. Do not discard them.
          </p>
        </div>

        <div className="guardrail-card">
          <h3>The 60/60 Cure is Non-Negotiable</h3>
          <p>
            Drying at 60F / 60% RH for 13 days preserves volatile terpenes. Rushing the dry or using direct airflow destroys the boutique quality you spent months building.
          </p>
        </div>

        <div className="guardrail-card">
          <h3>Nutrient Discipline</h3>
          <p>
            Max PPM 850-950. pH 5.5-5.8 in veg, 6.2 in flower. Full-Circle Saturate until 10-20% runoff to prevent salt buildup and dry pockets.
          </p>
        </div>
      </div>
    </div>
  );
}
