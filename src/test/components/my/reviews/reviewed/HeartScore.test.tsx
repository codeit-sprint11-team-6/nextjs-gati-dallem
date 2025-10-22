import HeartScore from "@/components/my/reviews/reviewed/HeartScore";
import { render, screen } from "@testing-library/react";

describe("마이페이지 - 나의 리뷰 - 작성한 리뷰 - 점수 표시 (HeartScore)", () => {
  test("하트는 항상 5개 렌더링된다", () => {
    render(<HeartScore score={3} />);
    const hearts = screen.getAllByAltText("리뷰 평점 표시 이미지") as HTMLImageElement[];
    expect(hearts).toHaveLength(5);
  });

  test("score=0 : 모두 비활성 하트", () => {
    render(<HeartScore score={0} />);
    const hearts = screen.getAllByAltText("리뷰 평점 표시 이미지") as HTMLImageElement[];
    expect(hearts.every((img) => img.src.includes("heart_inactive.svg"))).toBe(true);
  });

  test("score=3 : 앞의 3개만 활성 하트, 나머지는 비활성", () => {
    render(<HeartScore score={3} />);
    const hearts = screen.getAllByAltText("리뷰 평점 표시 이미지") as HTMLImageElement[];

    const active = hearts.filter((img) => img.src.includes("heart_active.svg"));
    const inactive = hearts.filter((img) => img.src.includes("heart_inactive.svg"));

    expect(active).toHaveLength(3);
    expect(inactive).toHaveLength(2);
  });

  test("score=5 : 모두 활성 하트", () => {
    render(<HeartScore score={5} />);
    const hearts = screen.getAllByAltText("리뷰 평점 표시 이미지") as HTMLImageElement[];
    expect(hearts.every((img) => img.src.includes("heart_active.svg"))).toBe(true);
  });

  test("score가 5보다 큰 경우(6 등)도 5개 모두 활성", () => {
    render(<HeartScore score={6} />);
    const hearts = screen.getAllByAltText("리뷰 평점 표시 이미지") as HTMLImageElement[];
    expect(hearts.every((img) => img.src.includes("heart_active.svg"))).toBe(true);
  });
});
