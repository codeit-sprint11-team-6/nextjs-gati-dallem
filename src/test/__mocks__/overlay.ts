export const overlaySpy = jest.fn();
export const closeSpy = jest.fn();

jest.mock("@/hooks/useOverlay", () => ({
  useOverlay: () => ({ overlay: overlaySpy, close: closeSpy }),
}));

export const resetOverlaySpy = () => overlaySpy.mockClear();
export const resetCloseSpy = () => overlaySpy.mockClear();
