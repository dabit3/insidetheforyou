import { Reveal, RevealHeading } from "./Primitives";

const blended = [
  "A post you follow",
  "A post from discovery",
  "Who to Follow",
  "A post you follow",
  "Prompt",
  "Ad",
];

export function Act08() {
  return (
    <section id="blend" className="section light">
      <div className="wrap">
        <RevealHeading
          eyebrow="Act 08 / Blend"
          lede="The ranked slate is one source among several. Ads, Who to Follow, and prompts are interleaved around it."
        >
          Your feed is not only posts.
        </RevealHeading>
        <div className="blend-list">
          {blended.map((item, index) => (
            <Reveal key={`${item}-${index}`} delay={index * 0.06}>
              <div className={`blend-row ${item === "Ad" ? "ad-row" : ""}`}>
                <span className="mono text-lavender">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
                {item !== "A post you follow" && (
                  <span className="mono muted push-right">interleaved</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
