import { Eyebrow } from "./Eyebrow";

export function SectionShell({
  eyebrow,
  title,
  body,
  children,
  dark = false,
  id,
  className = "",
  titleTag = "h2",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
  dark?: boolean;
  id?: string;
  className?: string;
  titleTag?: "h1" | "h2";
}) {
  const Heading = titleTag;
  return (
    <section id={id} className={`section-shell ${dark ? "section-dark" : ""} ${className}`.trim()}>
      <div className="page-grid">
        <div className="section-heading">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
          <Heading>{title}</Heading>
          {body ? <p>{body}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
