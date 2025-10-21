// URL API 폴리필
Object.defineProperty(global.URL, "createObjectURL", {
  writable: true,
  value: jest.fn(() => "blob:preview"),
});
Object.defineProperty(global.URL, "revokeObjectURL", {
  writable: true,
  value: jest.fn(),
});
