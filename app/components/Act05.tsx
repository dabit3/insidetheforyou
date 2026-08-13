import { Reveal, RevealHeading } from "./Primitives";
import { WeightTable } from "./WeightTable";

export function Act05() {
  return (
    <section id="weights" className="section light">
      <div className="wrap">
        <RevealHeading
          eyebrow="Act 05 / The score"
          lede="The model’s probabilities are combined with fixed weights. Positive actions lift a post. Negative actions pull it down."
        >
          Every action has a price.
        </RevealHeading>
        <Reveal delay={0.2}>
          <WeightTable />
        </Reveal>
      </div>
    </section>
  );
}
