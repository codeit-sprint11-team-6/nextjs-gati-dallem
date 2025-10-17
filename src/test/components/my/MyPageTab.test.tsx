import MyPageTab from "@/components/my/MyPageTab";
import { usePathnameMock } from "@/test/__mocks__/next";
import { render, screen } from "@testing-library/react";

const ACTIVE_CLASSES = ["border-b-2", "border-b-purple-500", "text-slate-800"];

function expectActive(li: Element) {
  for (const c of ACTIVE_CLASSES) expect(li).toHaveClass(c);
}
function expectInactive(li: Element) {
  for (const c of ACTIVE_CLASSES) expect(li).not.toHaveClass(c);
}

describe("마이페이지 - 메뉴 탭 (MyPageTab)", () => {
  test("기본 렌더링 테스트 (링크 라벨과 href가 올바른지)", () => {
    usePathnameMock.mockReturnValue("/my/bookings");

    const { container } = render(<MyPageTab />);

    const linkBookings = screen.getByRole("link", { name: "나의 모임" });
    expect(linkBookings).toHaveAttribute("href", "/my/bookings");

    const linkReviews = screen.getByRole("link", { name: "나의 리뷰" });
    expect(linkReviews).toHaveAttribute("href", "/my/reviews?writable=true");

    const linkHosted = screen.getByRole("link", { name: "내가 만든 모임" });
    expect(linkHosted).toHaveAttribute("href", "/my/hosted");

    const lis = container.querySelectorAll("ul > li");
    expect(lis.length).toBe(3);
  });

  test("pathname이 '/my/bookings'이면 [나의 모임]만 활성화", () => {
    usePathnameMock.mockReturnValue("/my/bookings");

    const { container } = render(<MyPageTab />);
    const lis = container.querySelectorAll("ul > li");

    expectActive(lis[0]); // 나의 모임
    expectInactive(lis[1]); // 나의 리뷰
    expectInactive(lis[2]); // 내가 만든 모임
  });

  test("pathname이 '/my/reviews'이면 [나의 리뷰]만 활성화", () => {
    usePathnameMock.mockReturnValue("/my/reviews");

    const { container } = render(<MyPageTab />);
    const lis = container.querySelectorAll("ul > li");

    expectInactive(lis[0]);
    expectActive(lis[1]);
    expectInactive(lis[2]);
  });

  test("pathname이 '/my/hosted'이면 [내가 만든 모임]만 활성화", () => {
    usePathnameMock.mockReturnValue("/my/hosted");

    const { container } = render(<MyPageTab />);
    const lis = container.querySelectorAll("ul > li");

    expectInactive(lis[0]);
    expectInactive(lis[1]);
    expectActive(lis[2]);
  });
});
