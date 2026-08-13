export const scoreActions = [
  { name: "like / favorite", weight: 0.5, group: "Engagement", value: 72 },
  { name: "reply", weight: 5, group: "Engagement", value: 38 },
  { name: "repost", weight: 1, group: "Engagement", value: 20 },
  { name: "quote", weight: 5, group: "Engagement", value: 12 },
  { name: "share via copy link", weight: 20, group: "Engagement", value: 8 },
  { name: "share via DM", weight: 5, group: "Engagement", value: 25 },
  { name: "post click", weight: 0.4, group: "Clicks & attention", value: 45 },
  { name: "dwell time / second", weight: 0.004, group: "Clicks & attention", value: 80 },
  { name: "follow the author", weight: 4, group: "Author", value: 4 },
  { name: "not interested", weight: -43.2, group: "Negative", value: 0 },
  { name: "report", weight: -234, group: "Negative", value: 0 },
];

export const takeaways = [
  ["Write posts people reply to.", "A reply is worth ten likes — and twenty from a mutual."],
  ["Make posts worth sending.", "A copy-link share is the single most valuable action, at 40 likes."],
  ["Likes are the weakest strong signal.", "Each one carries a weight of 0.5."],
  ["Post within the window.", "Nothing older than 48 hours can enter the feed."],
  ["Reposting into your own network is discounted.", "It gets the same discount as a stranger’s post."],
  ["Don’t expect a second chance.", "A post you were already shown is filtered out."],
  ["Negative feedback is brutal maths.", "One report costs roughly 468 likes."],
  ["Your feed mirrors your behavior.", "That includes the posts you only linger on."],
  ["Followers aren’t required to reach someone.", "They lower the bar: out-of-network posts are scored at 0.75."],
];
