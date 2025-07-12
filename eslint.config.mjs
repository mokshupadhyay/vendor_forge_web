import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the problematic rules
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "warn", // or "off" to completely disable
      "@next/next/no-img-element": "warn", // or "off" to completely disable
    },
  },
];

export default eslintConfig;
