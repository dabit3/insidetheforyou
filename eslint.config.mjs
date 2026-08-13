import tsParser from "@typescript-eslint/parser";

export default [
  { ignores: [".next/**", "node_modules/**"] },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true } } },
  },
];
