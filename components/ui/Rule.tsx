export function Rule({ dark = false }: { dark?: boolean }) {
  return <div className={`rule ${dark ? "rule-dark" : ""}`} aria-hidden="true" />;
}
