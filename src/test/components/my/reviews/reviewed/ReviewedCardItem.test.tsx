import ReviewedCardItem from "@/components/my/reviews/reviewed/ReviewedCardItem";
import { mockReviewed } from "@/mocks/my/mockMyReview";
import { GatheringMapper } from "@/types";
import { formatDate } from "@/utils/datetime";
import { render, screen } from "@testing-library/react";

describe("마이페이지 - 나의 리뷰 - 작성한 리뷰 카드 컴포넌트 (ReviewedCardItem)", () => {
  const mockData = mockReviewed.data[0];

  test("기본 렌더링 테스트 (사용자/스코어/날짜/모임 링크/모임 이미지/코멘트 라인)", () => {
    render(<ReviewedCardItem {...mockData} />);

    expect(screen.getByText("이수정")).toBeInTheDocument();

    const hearts = screen.getAllByAltText("리뷰 평점 표시 이미지") as HTMLImageElement[];
    const activeCount = hearts.filter((img) => img.src.includes("heart_active.svg")).length;
    expect(activeCount).toBe(mockData.score);

    const dateStr = formatDate(mockData.createdAt);
    expect(screen.getByText(dateStr)).toBeInTheDocument();

    const meetingImg = screen.getByAltText("리뷰 작성한 모임 이미지") as HTMLImageElement;
    expect(meetingImg).toHaveAttribute("src", mockData.Gathering.image);

    const link = screen.getByTestId("next-link");
    expect(link).toHaveAttribute("href", `/meetings/${mockData.Gathering.id}`);
    expect(link).toHaveTextContent(GatheringMapper[mockData.Gathering.type]);
    expect(link).toHaveTextContent(mockData.Gathering.name);

    expect(screen.getByText("첫 줄")).toBeInTheDocument();
    expect(screen.getByText("둘째 줄")).toBeInTheDocument();
  });

  test("사용자 프로필 이미지가 없으면 기본 이미지(/image/profile.svg) 사용", () => {
    const props = { ...mockData, User: { ...mockData.User, name: "홍길동", image: undefined } };
    render(<ReviewedCardItem {...props} />);

    const userImg = screen.getByAltText("리뷰 작성 사용자의 프로필 이미지") as HTMLImageElement;
    expect(userImg).toHaveAttribute("src", "/image/profile.svg");
  });

  test("모임 이미지가 없으면 모임 이미지 섹션 미렌더링", () => {
    const props = { ...mockData, Gathering: { ...mockData.Gathering, image: undefined } };
    render(<ReviewedCardItem {...props} />);

    expect(screen.queryByAltText("리뷰 작성한 모임 이미지")).not.toBeInTheDocument();
  });
});
