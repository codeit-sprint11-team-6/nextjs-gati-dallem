// components/auth/ui/LoginForm.tsx
"use client";

import { useMemo, useState } from "react";
import AuthInput from "./ui/AuthInput";
import AuthButton from "./ui/AuthButton";
import { AuthPasswordInput } from "./ui/AuthPasswordInput";
import { useSignin } from "@/hooks/auths/useSignin";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter(); // 성공 시 페이지 이동
  const { mutateAsync: signinMutate, isPending, error } = useSignin(); // 기존 로컬 상태 대신 react-query 훅 상태 사용

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  // useMemo로 canSubmit 최적화 (isPending까지 고려)
  const canSubmit = useMemo(
    () => email.trim().length > 0 && pw.trim().length > 0 && !isPending,
    [email, pw, isPending],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isPending) return; // 중복 제출 방지

    setEmailError("");
    setPwError("");
    setServerMsg("");

    // 간단한 클라이언트 유효성 예시
    if (!email) setEmailError("이메일을 입력해 주세요.");
    if (!pw) setPwError("비밀번호를 입력해 주세요.");
    if (!email || !pw) return;

    // 로그인 API 호출 (useSignin 활용)
    try {
      await signinMutate({ email, password: pw });
      router.push("/");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.data?.message ??
        err?.message ??
        "로그인에 실패했습니다. 다시 시도해 주세요.";
      setServerMsg(msg);
    }
  };

  // 표시 우선순위: serverMsg > react-query error.data.message > error.message
  const fallbackMsg =
    (error as any)?.response?.data?.message ??
    (error as any)?.data?.message ??
    (error as any)?.message ??
    "";
  const displayError = serverMsg || fallbackMsg;

  // const serverErrorMessage = (error as any)?.message ?? (error as any)?.data?.message ?? "";
  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-[568px] max-w-full flex-col gap-2 rounded-2xl bg-white pt-14 pr-11 pb-11 pl-14 shadow-sm [box-shadow:0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(16,24,40,0.08)]`}
      noValidate // 브라우저 기본 검증 비활성 (커스텀 메시지 사용)
      // 위 padding: top 56 / right 44 / bottom 44 / left 56 (Figma 근접)
    >
      <h1 className="mb-4 text-center text-lg font-bold text-slate-900">로그인</h1>

      {/* 서버 에러 표시 */}
      {/* {serverErrorMessage && (
        <p className="mb-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
          {serverErrorMessage}
        </p>
      )} */}

      {displayError && (
        <p className="mb-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{displayError}</p>
      )}

      <label className="mb-1 text-[13px] font-medium text-slate-500">이메일</label>
      <AuthInput
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        invalid={!!emailError}
        className={`bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]`}
        aria-describedby="email-error"
        aria-invalid={!!emailError} // 접근성 보강
        autoComplete="username" // 브라우저 자동완성
      />
      {emailError && (
        <p id="email-error" className="mt-1 text-xs text-[#FF2727]">
          {emailError}
        </p>
      )}

      <label className="mt-4 mb-1 text-[13px] font-medium text-slate-500">비밀번호</label>
      <AuthPasswordInput
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        invalid={!!pwError}
        className={`bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]`}
        aria-describedby="pw-error"
        aria-invalid={!!pwError} // 접근성 보강
        autoComplete="current-password" // 브라우저 자동완성
      />
      {pwError && (
        <p id="pw-error" className="mt-1 text-xs text-[#FF2727]">
          {pwError}
        </p>
      )}

      <AuthButton
        type="submit"
        disabled={!canSubmit}
        className={`mt-6 h-12 w-full rounded-xl bg-[#5865F2] text-white transition-colors hover:bg-[#5865F2] focus-visible:ring-2 focus-visible:ring-[#5865F2] focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </AuthButton>

      <p className="mt-3 text-center text-xs text-slate-500">
        같이 달램이 처음이신가요?{" "}
        <a href="/signup" className="underline underline-offset-2 hover:text-slate-700">
          회원가입
        </a>
      </p>
    </form>
  );
}
