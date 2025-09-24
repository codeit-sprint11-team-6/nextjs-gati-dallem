// .storybook/preview.ts

import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 전체 스토리에 배경 설정
    backgrounds: {
      options: {
        light: {
          name: "light",
          value: "#F6F7F9",
        },
        dark: {
          name: "dark",
          value: "#333333",
        },
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
