// .storybook/mocks/nextNavigationMock.ts

export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  refresh: () => {},
  prefetch: async () => {},
});

export const usePathname = () => "/";
