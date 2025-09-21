// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import js from "@eslint/js";
import globals from "globals";
import unicorn from "eslint-plugin-unicorn";
import prettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// next/core-web-vitals, next/typescript를 flat으로 가져오기 위한 compat
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [// JS 기본 추천 규칙
js.configs.recommended, // Next.js + TS 규칙
...compat.extends("next/core-web-vitals", "next/typescript"), // 전역/언어 옵션
{
  name: "env",
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: { ...globals.browser, ...globals.node },
  },
}, // 팀 규칙: 파일명 컨벤션 등
{
  name: "team-rules",
  plugins: { unicorn },
  rules: {
    // 컴포넌트: PascalCase, 나머지: camelCase 허용
    "unicorn/filename-case": ["error", { cases: { camelCase: true, pascalCase: true } }],
    // React 19 JSX 자동 import라 off
    "react/react-in-jsx-scope": "off",
  },
}, // 컴포넌트 폴더에는 PascalCase 강제
{
  name: "components-filenames",
  files: ["src/components/**/*.{ts,tsx}"],
  rules: {
    "unicorn/filename-case": ["error", { cases: { pascalCase: true } }],
  },
}, // 컴포넌트 제외 파일은 camelCase
{
  name: "non-components-filenames",
  files: ["**/*.{ts,tsx,js,jsx}"],
  ignores: ["src/components/**/*"],
  rules: {
    "unicorn/filename-case": ["error", { cases: { camelCase: true } }],
  },
}, // 무시할 경로
{
  name: "ignores",
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
}, // 항상 마지막: Prettier 충돌 해제
prettier, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
