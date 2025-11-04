// src/test/components/auth/SignupForm.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForm from "@/components/auth/SignupForm";

// useSignup mock
const signupAsyncMock = jest.fn();
jest.mock("@/apis/auths/auths.query", () => ({
  useSignup: () => ({ mutateAsync: signupAsyncMock, isPending: false }),
}));

// overlay mock
const overlaySpy = jest.fn();
jest.mock("@/hooks/useOverlay", () => ({
  useOverlay: () => ({ overlay: overlaySpy }),
}));

// next/navigation mock
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: pushMock }) }));

// 서버 에러 메시지 유틸은 단순 패스스루로 모킹
jest.mock("@/apis/_errorMessage", () => ({
  toUserErrorDetails: (e: any) => e,
  extractValidationItems: () => [],
}));

const fillValidForm = async () => {
  await userEvent.type(screen.getByLabelText(/이름/i), "홍길동");
  await userEvent.type(screen.getByLabelText(/아이디\(이메일\)/i), "user@example.com");
  await userEvent.type(screen.getByLabelText(/회사명/i), "ACME");
  // 길이 12+ / 숫자+문자+특수문자 포함 → 강도 요건 여유있게 충족
  await userEvent.type(screen.getByLabelText(/^비밀번호$/i), "Abcd1234!!@@");
  await userEvent.type(screen.getByLabelText(/비밀번호 확인/i), "Abcd1234!!@@");
};

describe("SignupForm", () => {
  beforeEach(() => {
    signupAsyncMock.mockReset();
    overlaySpy.mockReset();
    pushMock.mockReset();
  });

  test("비밀번호 확인 불일치 시 버튼 비활성화", async () => {
    render(<SignupForm />);
    await userEvent.type(screen.getByLabelText(/이름/i), "홍길동");
    await userEvent.type(screen.getByLabelText(/아이디\(이메일\)/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/회사명/i), "ACME");
    await userEvent.type(screen.getByLabelText(/^비밀번호$/i), "Abcd1234!!@@");
    await userEvent.type(screen.getByLabelText(/비밀번호 확인/i), "mismatch");

    expect(screen.getByRole("button", { name: /회원가입/i })).toBeDisabled();
  });

  test("정상 입력 시 mutateAsync 호출 + overlay 호출", async () => {
    signupAsyncMock.mockResolvedValueOnce({ ok: true });

    render(<SignupForm redirect="/signin" />);
    await fillValidForm();

    await userEvent.click(screen.getByRole("button", { name: /회원가입/i }));

    await waitFor(() => expect(signupAsyncMock).toHaveBeenCalledTimes(1));

    expect(signupAsyncMock).toHaveBeenCalledWith({
      name: "홍길동",
      email: "user@example.com", // 컴포넌트에서 toLowerCase 처리
      companyName: "ACME",
      password: "Abcd1234!!@@",
    });

    expect(overlaySpy).toHaveBeenCalledTimes(1);
  });

  test("서버가 EMAIL_EXISTS 반환 시 이메일 중복 에러 노출", async () => {
    signupAsyncMock.mockRejectedValueOnce({ code: "EMAIL_EXISTS", status: 400 });

    render(<SignupForm />);
    await fillValidForm();

    await userEvent.click(screen.getByRole("button", { name: /회원가입/i }));

    // 비동기 에러 렌더링 대기 후 확인(문구가 다를 수 있어 '중복' 키워드로 체크)
    expect(await screen.findByText(/중복.*이메일|이메일.*중복|중복된 이메일/)).toBeInTheDocument();
  });
});
