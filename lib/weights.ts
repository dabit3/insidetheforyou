export type WeightKind = "positive" | "negative" | "neutral";

export type Weight = {
  action: string;
  value: number;
  gloss: string;
};

export const weights: Weight[] = [
  { action: "Copy link", value: 20, gloss: "You pass a post along outside X." },
  { action: "Reply", value: 5, gloss: "You join the conversation." },
  {
    action: "Mutual reply",
    value: 20,
    gloss: "You and the author follow each other.",
  },
  { action: "DM share", value: 5, gloss: "You send it directly to someone." },
  { action: "Quote", value: 5, gloss: "You add your own words to a post." },
  {
    action: "Follow author",
    value: 4,
    gloss: "You choose to see more from them.",
  },
  { action: "Share", value: 2, gloss: "You share it with your followers." },
  {
    action: "Repost",
    value: 1,
    gloss: "You put it back in your followers’ feeds.",
  },
  { action: "Like", value: 0.5, gloss: "A small positive signal." },
  { action: "Post click", value: 0.4, gloss: "You open the conversation." },
  { action: "Open link", value: 0.2, gloss: "You follow a link in the post." },
  { action: "Photo / video", value: 0.05, gloss: "You expand or open media." },
  { action: "Quoted click", value: 0.05, gloss: "You open a quoted post." },
  {
    action: "Dwell time",
    value: 0.004,
    gloss: "Each second you spend reading.",
  },
  {
    action: "Unexplored (in-network)",
    value: 0.02,
    gloss: "A post you have not seen yet.",
  },
  { action: "Profile click", value: 0, gloss: "No added score." },
  { action: "Plain dwell", value: 0, gloss: "No added score." },
  { action: "Not dwelled", value: -0.02, gloss: "You skip without dwelling." },
  { action: "Block author", value: -31.2, gloss: "You block the author." },
  {
    action: "Not interested",
    value: -43.2,
    gloss: "You ask for less like this.",
  },
  { action: "Mute author", value: -58.8, gloss: "You mute the author." },
  { action: "Report", value: -234, gloss: "You report the post." },
];

export function weightKind(value: number): WeightKind {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

export function likeComparison(value: number): string {
  if (value === 0) return "no added score";
  const ratio = Math.abs(value) / 0.5;
  if (ratio >= 1) return `${value < 0 ? "−" : ""}${ratio}× a like`;
  return `${value} points per action`;
}
