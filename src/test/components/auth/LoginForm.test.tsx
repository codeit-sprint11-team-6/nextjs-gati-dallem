// src/test/components/auth/LoginForm.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/auth/LoginForm";

const replaceMock = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ replace: replaceMock }) }));

const mutateAsyncMock = jest.fn().mockResolvedValue({ token: "t" });
const resetMock = jest.fn();
jest.mock("@/apis/auths/auths.query", () => ({
  useSignin: () => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
    error: undefined,
    reset: resetMock,
  }),
}));

describe("LoginForm", () => {
  it("유효 입력 시 버튼 활성화 & 제출 플로우", async () => {
    render(<LoginForm redirect="/" />);
    await userEvent.type(screen.getByLabelText(/아이디\(이메일\)/i), "tester@example.com");
    await userEvent.type(screen.getByLabelText(/^비밀번호$/i), "Abcd1234!!");

    const btn = screen.getByRole("button", { name: /로그인/i });
    expect(btn).not.toBeDisabled();

    await userEvent.click(btn);

    await waitFor(() =>
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        email: "tester@example.com",
        password: "Abcd1234!!",
      }),
    );
    expect(replaceMock).toHaveBeenCalledWith("/");
  });
});
