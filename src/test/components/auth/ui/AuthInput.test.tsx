// src/test/components/auth/ui/AuthInput.test.tsx
import { render, screen } from "@testing-library/react";
import AuthInput from "@/components/auth/ui/AuthInput";

describe("AuthInput", () => {
  test("invalid + errorMessage 시 aria-invalid/메시지 노출", () => {
    render(<AuthInput aria-label="이메일" invalid errorMessage="형식이 올바르지 않습니다" />);
    const input = screen.getByLabelText("이메일");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("형식이 올바르지 않습니다")).toBeInTheDocument();
  });

  test("rightAdornment 렌더링", () => {
    render(<AuthInput aria-label="필드" rightAdornment={<span data-testid="addon">A</span>} />);
    expect(screen.getByTestId("addon")).toBeInTheDocument();
  });
});
