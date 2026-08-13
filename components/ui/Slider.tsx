export function Slider({
  label,
  value,
  onChange,
  muted = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  muted?: boolean;
}) {
  return (
    <input
      className={`score-slider ${muted ? "slider-muted" : ""}`}
      aria-label={`${label} probability`}
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  );
}
