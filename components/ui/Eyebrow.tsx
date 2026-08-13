export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{children}</div>;
}
