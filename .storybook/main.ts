import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  // stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  stories: ["../src/components/**/__stories__/**/*.stories.@(js|jsx|ts|tsx|mdx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "@storybook/addon-a11y", // 접근성 검사 쓰고 싶을 때만 유지

    // "@chromatic-com/storybook", // 크로마틱 안 쓸 거면 제거
    // "@storybook/addon-docs", // essentials 안에 이미 포함 → 중복
    // "@storybook/addon-onboarding", // 체험용, 실제 개발에선 불필요
    // "@storybook/addon-vitest", // Vitest 연동 쓸 때만 필요
  ],
  staticDirs: ["../public"],
  // docs: { autodocs: "tag" }, // 자동 문서화 켜두기
};
export default config;
