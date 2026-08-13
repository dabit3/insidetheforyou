export function Footer() {
  return (
    <footer className="footer section-dark">
      <div className="page-grid footer-grid">
        <div>
          <div className="footer-wordmark">insidetheforyou</div>
          <div className="eyebrow eyebrow-dark">A PLAIN-ENGLISH EXPLAINER</div>
          <p className="fine-print">
            Independent explainer built from X’s published code. Values shown are defaults and can
            change.
          </p>
        </div>
        <div>
          <div className="footer-label">Sources</div>
          <a href="https://github.com/xai-org/x-algorithm">The algorithm repo ↗</a>
          <a href="https://deepwiki.com/xai-org/x-algorithm">DeepWiki ↗</a>
        </div>
        <div>
          <div className="footer-label">Credits</div>
          <a href="https://devin.ai">Built with Devin ↗</a>
        </div>
        <p className="fine-print footer-bottom">© 2025 · For learning, not prediction.</p>
      </div>
    </footer>
  );
}
