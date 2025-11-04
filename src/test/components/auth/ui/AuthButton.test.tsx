// src/test/components/auth/ui/AuthButton.test.tsx

import { render, screen } from "@testing-library/react";
import AuthButton from "@/components/auth/ui/AuthButton";

describe("AuthButton", () => {
  test("loading일 때 disabled + '처리 중...' 노출", () => {
    render(<AuthButton loading>로그인</AuthButton>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("data-loading", "true");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toHaveTextContent("처리 중...");
  });

  test("enabled일 때 children 렌더링, 전체폭 적용", () => {
    render(<AuthButton>회원가입</AuthButton>);
    const btn = screen.getByRole("button", { name: "회원가입" });
    expect(btn).toBeEnabled();
    expect(btn.className).toMatch(/w-full/); // fullWidth 기본 true
  });
});
