import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#191b22",
        surface: "#282b35",
        paper: "#e7e4db",
        card: "#efede6",
        line: "#a9a492",
        muted: "#54565f",
        "dark-muted": "#999ba6",
        lavender: "#8f93c2",
        accent: "#5a5e8e",
        signal: "#5f8b6e",
        amber: "#8c8054",
        negative: "#a45c60",
        chip: "#e2dfd6",
      },
    },
  },
  plugins: [],
} satisfies Config;
