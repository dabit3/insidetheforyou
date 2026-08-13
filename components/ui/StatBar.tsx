export function StatBar({ stats, dark = false }: { stats: [string, string][]; dark?: boolean }) {
  return (
    <div className={`stat-bar ${dark ? "stat-bar-dark" : ""}`}>
      {stats.map(([value, label]) => (
        <div className="stat-cell" key={value}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
