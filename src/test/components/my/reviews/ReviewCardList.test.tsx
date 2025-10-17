import ReviewCardList from "@/components/my/reviews/ReviewCardList";
import { mockReviewed, mockUnreviewed } from "@/mocks/my/mockMyReview";
import { mockProfile } from "@/mocks/my/mockProfile";
import { useAuthStore } from "@/store/authStore";
import { fireEvent, render, screen } from "@testing-library/react";

const pushSpy = jest.fn();
let mockWritableParam = "true";
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushSpy }),
  useSearchParams: () => ({
    get: (key: string) => (key === "writable" ? mockWritableParam : null),
  }),
}));

const unreviewedQueryFn = jest.fn();
jest.mock("@/apis/gatherings/gatherings.query", () => ({
  useJoinedGatherings: (args: any) => unreviewedQueryFn(args),
}));

const reviewedQueryFn = jest.fn();
jest.mock("@/apis/reviews/reviews.query", () => ({
  useReviews: (args: any) => reviewedQueryFn(args),
}));

/** Pagination 간단 모킹: onPageChange(2) 호출 버튼 제공 */
jest.mock("@/components/ui/Pagination", () => (props: any) => (
  <div data-testid="pagination">
    <div>
      page:{props.currentPage}/{props.totalPages}
    </div>
    <button onClick={() => props.onPageChange(2)}>go-2</button>
  </div>
));

describe("마이페이지 - 나의 리뷰 - 목록 조회 기능", () => {
  describe("ReviewCardList - 탭 전환(Filter)", () => {
    beforeEach(() => {
      pushSpy.mockClear();
      unreviewedQueryFn.mockReset();
      reviewedQueryFn.mockReset();
    });

    test("[작성한 리뷰] 클릭", () => {
      mockWritableParam = "true";
      unreviewedQueryFn.mockReturnValue({ isLoading: true, data: undefined });

      render(<ReviewCardList />);

      fireEvent.click(screen.getByRole("button", { name: "작성한 리뷰" }));
      expect(pushSpy).toHaveBeenCalledWith("/my/reviews?writable=false");
    });

    test("[작성 가능한 리뷰] 클릭", () => {
      mockWritableParam = "false";
      reviewedQueryFn.mockReturnValue({ isLoading: true, data: { data: [], totalPages: 1 } });

      render(<ReviewCardList />);

      fireEvent.click(screen.getByRole("button", { name: "작성 가능한 리뷰" }));
      expect(pushSpy).toHaveBeenCalledWith("/my/reviews?writable=true");
    });
  });

  describe("작성 가능한 리뷰 목록 조회 (UnreviewedCardList)", () => {
    beforeEach(() => {
      mockWritableParam = "true";
    });

    test("로딩 시 스켈레톤 UI (UnreviewedCardSkeleton)", () => {
      unreviewedQueryFn.mockReturnValue({ isLoading: true, data: undefined });
      render(<ReviewCardList />);

      const skeletons = screen.getAllByLabelText("리뷰 작성 가능한 모임 목록 스켈레톤");
      expect(skeletons).toHaveLength(3);
    });

    test("빈 데이터일 때 EmptyList 렌더링 (작성할 수 있는 리뷰가 없어요)", () => {
      unreviewedQueryFn.mockReturnValue({ isLoading: false, data: [] });
      render(<ReviewCardList />);

      expect(screen.getByText("작성할 수 있는 리뷰가 없어요")).toBeInTheDocument();
      expect(screen.getByAltText("빈 페이지 표시 이미지")).toHaveAttribute(
        "src",
        "/image/empty.svg",
      );
    });

    test("데이터가 있을 때 UnreviewedCardItem 렌더", () => {
      const mockList = mockUnreviewed;
      unreviewedQueryFn.mockReturnValue({ isLoading: false, data: mockList });
      render(<ReviewCardList />);

      const items = screen.getAllByLabelText("모임 목록 아이템");
      expect(items).toHaveLength(mockList.length);
      expect(screen.getByText(mockList[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockList[1].name)).toBeInTheDocument();

      expect(unreviewedQueryFn).toHaveBeenCalledWith({ completed: true, reviewed: false });
    });
  });

  describe("작성한 리뷰 목록 조회 (ReviewedCardList)", () => {
    beforeEach(() => {
      mockWritableParam = "false";
    });

    test("로딩 시 스켈레톤 UI (ReviewCardSkeleton)", () => {
      reviewedQueryFn.mockReturnValue({ isLoading: true, data: { data: [], totalPages: 1 } });
      render(<ReviewCardList />);

      const skeletons = screen.getAllByLabelText("작성한 리뷰 목록 스켈레톤");
      expect(skeletons).toHaveLength(3);
    });

    test("빈 데이터일 때 EmptyList 렌더링 (작성한 리뷰가 없어요)", () => {
      reviewedQueryFn.mockReturnValue({ isLoading: false, data: { data: [], totalPages: 1 } });
      render(<ReviewCardList />);

      expect(screen.getByText("작성한 리뷰가 없어요")).toBeInTheDocument();
      expect(screen.getByAltText("빈 페이지 표시 이미지")).toHaveAttribute(
        "src",
        "/image/empty.svg",
      );
    });

    test("데이터가 있을 때 ReviewedCardItem 리스트 렌더링 및 Pagination 표시", () => {
      useAuthStore.setState({ user: mockProfile });
      reviewedQueryFn.mockReturnValue({ isLoading: false, data: mockReviewed });
      render(<ReviewCardList />);

      const items = screen.getAllByTestId("reviewed-item");
      expect(items).toHaveLength(mockReviewed.data.length);
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
      expect(reviewedQueryFn).toHaveBeenCalledWith({ userId: mockProfile.id, offset: 0 });
    });

    test("페이지네이션 [go-2] 클릭 시 offset 1로 늘려서 재호출", () => {
      useAuthStore.setState({ user: mockProfile });
      reviewedQueryFn.mockReturnValue({ isLoading: false, data: mockReviewed });
      render(<ReviewCardList />);

      fireEvent.click(screen.getByText("go-2"));

      const calls = reviewedQueryFn.mock.calls.map((args) => args[0]);
      expect(calls.some((a) => a.offset === 1 && a.userId === mockProfile.id)).toBe(true);
    });
  });
});
