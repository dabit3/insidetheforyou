import { Eyebrow } from "./Eyebrow";

export function SectionShell({
  eyebrow,
  title,
  body,
  children,
  dark = false,
  id,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`section-shell ${dark ? "section-dark" : ""}`}>
      <div className="page-grid">
        <div className="section-heading">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
          <div className="heading-copy">
            <h2>{title}</h2>
            {body ? <p>{body}</p> : null}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
