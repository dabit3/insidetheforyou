import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./Primitives";

export function Footer() {
  return (
    <footer className="dark footer">
      <div className="wrap footer-grid">
        <div>
          <Eyebrow>Sources / Keep looking</Eyebrow>
          <p className="dark-copy">
            Defaults published in the public x-algorithm repo, plus its README
            and DeepWiki. Production can differ: values come from configuration
            and experiments run on slices of traffic.
          </p>
        </div>
        <div className="footer-link">
          <p className="mono muted">Under the Hood</p>
          <a href="https://x.com/i/under_the_hood">
            See visibility labels on your account <ArrowRight size={15} />
          </a>
          <p className="mono muted">Not affiliated with X</p>
        </div>
      </div>
    </footer>
  );
}
