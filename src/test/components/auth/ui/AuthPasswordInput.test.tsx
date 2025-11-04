// src/test/components/auth/ui/AuthPasswordInput.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthPasswordInput } from "@/components/auth/ui/AuthPasswordInput";

describe("AuthPasswordInput", () => {
  it("기본은 password → 토글하면 text 로 변경", async () => {
    render(<AuthPasswordInput aria-label="비밀번호" />);
    const input = screen.getByLabelText("비밀번호") as HTMLInputElement;
    expect(input.type).toBe("password");

    const toggle = screen.getByRole("button", { name: "비밀번호 표시" });
    await userEvent.click(toggle);

    expect(screen.getByRole("button", { name: "비밀번호 숨기기" })).toBeInTheDocument();
    expect((screen.getByLabelText("비밀번호") as HTMLInputElement).type).toBe("text");
  });
});
