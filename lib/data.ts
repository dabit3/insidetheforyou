export type ScoreAction = {
  name: string;
  weight: number;
  group: string;
  value: number;
  muted?: boolean;
};

export const scoreActions: ScoreAction[] = [
  { name: "like / favorite", weight: 0.5, group: "Engagement", value: 72 },
  { name: "reply", weight: 5, group: "Engagement", value: 38 },
  { name: "repost", weight: 1, group: "Engagement", value: 20 },
  { name: "quote", weight: 5, group: "Engagement", value: 12 },
  { name: "share", weight: 2, group: "Engagement", value: 12 },
  { name: "share via DM", weight: 5, group: "Engagement", value: 25 },
  { name: "share via copy link", weight: 20, group: "Engagement", value: 8 },
  { name: "post click", weight: 0.4, group: "Clicks & attention", value: 45 },
  { name: "open link", weight: 0.2, group: "Clicks & attention", value: 25 },
  { name: "profile click", weight: 0, group: "Clicks & attention", value: 40, muted: true },
  { name: "photo expand", weight: 0.05, group: "Clicks & attention", value: 12 },
  { name: "video open", weight: 0.05, group: "Clicks & attention", value: 12 },
  { name: "video quality view", weight: 0.05, group: "Clicks & attention", value: 8 },
  { name: "dwell", weight: 0, group: "Clicks & attention", value: 45, muted: true },
  { name: "dwell time / second", weight: 0.004, group: "Clicks & attention", value: 80 },
  { name: "unexplored-post nudge", weight: 0.02, group: "Clicks & attention", value: 10 },
  { name: "follow the author", weight: 4, group: "Author", value: 4 },
  { name: "not interested", weight: -43.2, group: "Negative", value: 0 },
  { name: "block author", weight: -31.2, group: "Negative", value: 0 },
  { name: "mute author", weight: -58.8, group: "Negative", value: 0 },
  { name: "report", weight: -234, group: "Negative", value: 0 },
  { name: "scrolled past without dwelling", weight: -0.02, group: "Negative", value: 0 },
];

export const takeaways = [
  ["Write posts people reply to.", "A reply is worth ten likes — and twenty from a mutual."],
  [
    "Make posts worth sending.",
    "A copy-link share is the single most valuable action, at 40 likes.",
  ],
  ["Likes are the weakest strong signal.", "Each one carries a weight of 0.5."],
  ["Post within the window.", "Nothing older than 48 hours can enter the feed."],
  [
    "Reposting into your own network is discounted.",
    "It gets the same discount as a stranger’s post.",
  ],
  ["Don’t expect a second chance.", "A post you were already shown is filtered out."],
  ["Negative feedback is brutal maths.", "One report costs roughly 468 likes."],
  ["Your feed mirrors your behavior.", "That includes the posts you only linger on."],
  [
    "Followers aren’t required to reach someone.",
    "They lower the bar: out-of-network posts are scored at 0.75.",
  ],
];

export const pipelineSteps = [
  ["GATHER", "Collect candidate posts from two pools."],
  ["CLEAN", "Throw out anything you shouldn’t or wouldn’t want to see."],
  ["PREDICT", "For each post, guess how likely you are to each action."],
  ["SCORE & ORDER", "Turn those guesses into one number, sort, keep the top posts."],
  ["BLEND", "Mix in ads, Who to Follow, and prompts."],
] as const;

export const inputCards = [
  [
    "↗",
    "Your recent actions",
    "The posts you liked, replied to, reposted, clicked, and lingered on.",
  ],
  ["◎", "Who you follow", "Your graph shapes the first pool of posts."],
  ["×", "Blocks, mutes and muted keywords", "Hard boundaries the feed respects."],
  ["□", "Posts you’ve already been shown", "The feed keeps an impression history."],
  ["◌", "Topics you follow", "Interests you have chosen to see more of."],
  ["≡", "Your settings and country", "Context that changes what is eligible."],
] as const;

export const filterReasons = [
  ["Older than 48 hours", "Nothing older than 48 hours can appear in the feed."],
  ["Your own posts", "Your own posts are not candidates for your For You feed."],
  ["Already shown to you", "A second impression record confirms this post has already appeared."],
  ["Accounts you block or mute", "Your hard boundaries remove this candidate before ranking."],
  ["Muted keywords", "The words you chose to mute keep this post out."],
  [
    "Reposts and replies from accounts you don’t follow",
    "These interactions are removed from this candidate pool.",
  ],
  ["The same post returned twice", "Duplicate candidates are collapsed before scoring."],
  ["Subscriber-only posts", "You cannot see this post, so it cannot be ranked for you."],
  [
    "Low-engagement new account post",
    "Brand-new accounts need stronger signals to enter from out-of-network.",
  ],
] as const;
