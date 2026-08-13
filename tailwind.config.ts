import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink:"#191b22", paper:"#e7e4db", card:"#efede6", lavender:"#5a5e8e", signal:"#5f8b6e", amber:"#8c8054" } } },
  plugins: []
} satisfies Config;
