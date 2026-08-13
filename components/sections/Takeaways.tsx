import { takeaways } from "@/lib/data";
import { SectionShell } from "../ui/SectionShell";

export function Takeaways() {
  return (
    <SectionShell id="takeaways" eyebrow="TAKEAWAYS" title="Nine things worth remembering">
      <div className="takeaway-grid">
        {takeaways.map(([title, description], index) => (
          <div className="takeaway-card" key={title}>
            <span className="mono takeaway-index">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
