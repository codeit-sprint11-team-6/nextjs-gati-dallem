// .storybook/preview.ts

import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import "../src/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

/** 브라우저 환경 모킹 (window, localStorage 등) */
// localStorage mock (Storybook은 JSDOM이라 실제 localStorage 없음)
if (!("localStorage" in globalThis)) {
  // @ts-ignore
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}
// matchMedia mock (Tailwind의 md/lg breakpoints 관련 코드에서 쓰일 수도 있음)
if (typeof window !== "undefined" && !window.matchMedia) {
  // @ts-ignore
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
// ResizeObserver mock (Shadcn 컴포넌트나 Dialog, Popover 내부에서 필요할 때 있음)
if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
  // @ts-ignore
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

/** 모든 스토리에 React Query Provider 적용 */
export const decorators: Decorator[] = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  ),
];

/** Storybook 설정 */
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
    options: {
      storySort: {
        order: [
          "Foundation",
          "Components",
          [
            "UI",
            "Common",
            "Meeting",
            "My",
            ["Bookings", "Reviews", ["UnreviewedCardItem", "ReviewedCardItem"], "Hosted"],
          ],
        ],
      },
    },
    nextjs: {
      appDirectory: true, // App Router 사용 시 필요
      navigation: {
        pathname: "/",
        push: () => {},
        replace: () => {},
        refresh: () => {},
        prefetch: async () => {},
      },
    },
  },
};

export default preview;
