import { SectionShell } from "../ui/SectionShell";

export function Blending() {
  return (
    <SectionShell
      id="blending"
      eyebrow="STEP 5 — BLENDING"
      title="Your feed is not only posts"
      body="The ranked posts are one ingredient. A blending step interleaves ads, Who to Follow suggestions and prompts. Ads can also nudge nearby posts around for adjacency. Who to Follow and prompts sit at fixed positions."
    >
      <div className="blend-layout">
        <div className="blend-copy">
          <p className="large-copy">
            The order is almost done — then the feed makes room for the things that help you
            discover people, products and settings.
          </p>
        </div>
        <div className="feed-visual">
          {[
            "A ranked post",
            "A ranked post",
            "WHO TO FOLLOW",
            "A ranked post",
            "PROMPT",
            "A ranked post",
          ].map((item, index) => (
            <div
              className={`feed-slot ${item !== "A ranked post" ? "feed-slot-special" : ""}`}
              key={`${item}-${index}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
