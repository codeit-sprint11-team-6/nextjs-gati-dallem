// components/auth/ui/LoginForm.tsx
"use client";

import { useState } from "react";
import AuthInput from "./ui/AuthInput";
import AuthButton from "./ui/AuthButton";
import { AuthPasswordInput } from "./ui/AuthPasswordInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPwError("");

    // 간단한 클라이언트 유효성 예시
    if (!email) setEmailError("이메일을 입력해 주세요.");
    if (!pw) setPwError("비밀번호를 입력해 주세요.");
    if (!email || !pw) return;

    try {
      setLoading(true);
      // TODO: 로그인 API 연동
      // await login({ email, password: pw });
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = email.length > 0 && pw.length > 0 && !loading;

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-[568px] max-w-full flex-col gap-2 rounded-2xl bg-white pt-14 pr-11 pb-11 pl-14 shadow-sm [box-shadow:0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(16,24,40,0.08)]`}
      // 위 padding: top 56 / right 44 / bottom 44 / left 56 (Figma 근접)
    >
      <h1 className="mb-4 text-center text-lg font-bold text-slate-900">로그인</h1>

      <label className="mb-1 text-[13px] font-medium text-slate-500">아이디</label>
      <AuthInput
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        invalid={!!emailError}
        className={`bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]`}
        aria-describedby="email-error"
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
        {loading ? "로그인 중..." : "로그인"}
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
