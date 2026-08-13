export function Tabs({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="tabs" role="tablist">
      {options.map((option) => (
        <button
          key={option}
          className={option === value ? "tab-active" : ""}
          onClick={() => onChange(option)}
          role="tab"
          aria-selected={option === value}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
