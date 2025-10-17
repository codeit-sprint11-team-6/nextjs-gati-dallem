// next/image을 <img>로 치환
jest.mock("next/image", () => (props: any) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={props.alt} src={props.src} data-testid="next-image" />;
});

// next/link을 <a>로 치환
jest.mock("next/link", () => {
  return ({ href, children }: any) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  );
});

// next/navigate spy
export const pushSpy = jest.fn();
export const usePathnameMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushSpy }),
  usePathname: () => usePathnameMock(),
}));
