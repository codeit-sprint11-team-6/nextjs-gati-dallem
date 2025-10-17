import CreatedCardItem from "@/components/my/hosted/CreatedCardItem";
import { mockMyGathering } from "@/mocks/my/mockMyGathering";
import { resetOverlaySpy } from "@/test/__mocks__/overlay";
import { render, screen } from "@testing-library/react";

describe("마이페이지 - 내가 만든 모임 - 내가 만든 모임 카드 컴포넌트 (CreatedCardItem)", () => {
  beforeEach(() => {
    resetOverlaySpy();
  });

  test("기본 렌더링 테스트 (이미지/제목/인원/위치/날짜/시간)", () => {
    const mockData = mockMyGathering[0];
    render(<CreatedCardItem {...mockData} />);

    expect(screen.getByLabelText("모임 목록 아이템")).toBeInTheDocument();

    const img = screen.getByAltText("모임 이미지 미리보기") as HTMLImageElement;
    expect(img).toHaveAttribute("src", mockData.image);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockData.participantCount}/${mockData.capacity}`),
    ).toBeInTheDocument();

    expect(screen.getByText("홍대입구")).toBeInTheDocument();
    expect(screen.getByText("11월 04일")).toBeInTheDocument();
    expect(screen.getByText("19:00")).toBeInTheDocument();
  });

  test("모임 이름 클릭 시 링크 경로(id 전달) 확인", () => {
    const mockData = mockMyGathering[0];
    render(<CreatedCardItem {...mockData} />);

    const link = screen.getByTestId("next-link");
    expect(link).toHaveAttribute("href", `/meetings/${mockData.id}`);
  });

  // TODO: 찜하기 버튼 렌더링
});
