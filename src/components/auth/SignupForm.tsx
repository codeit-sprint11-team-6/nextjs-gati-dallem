// src/components/auth/SignupForm.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthInput from "./ui/AuthInput";
import { AuthPasswordInput } from "./ui/AuthPasswordInput";
import AuthButton from "./ui/AuthButton";
import { useSignup } from "@/hooks/auths/useSignUp";
import { toSafePath } from "@/utils/auth/safePath";

/** 에러 객체에서 사용자 메시지 추출 (백/프론트 혼용 대비) */
const toErrorMessage = (err: unknown) => {
  const anyErr = err as any;
  return (
    anyErr?.response?.data?.message ??
    anyErr?.data?.message ??
    anyErr?.message ??
    "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요."
  );
};

type Props = { redirect?: string };

const SignupForm = ({ redirect = "/" }: Props) => {
  const router = useRouter();
  const { mutateAsync: signupMutate, isPending, error } = useSignup();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  // field error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [pw2Error, setPw2Error] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  const isPwMatch = pw2.length > 0 && pw === pw2;
  const isPwStrongEnough = pw.length >= 8; // 필요시 강화 규칙 추가(영문/숫자/특수문자 등)

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      company.trim().length > 0 &&
      pw.length > 0 &&
      pw2.length > 0 &&
      isPwStrongEnough &&
      pw === pw2 &&
      !isPending
    );
  }, [name, email, company, pw, pw2, isPwStrongEnough, isPending]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    // 초기화
    setNameError("");
    setEmailError("");
    setPwError("");
    setPw2Error("");
    setServerMsg("");

    // 간단 클라이언트 유효성
    if (!name) setNameError("이름을 입력해 주세요.");
    if (!email) setEmailError("아이디(이메일)를 입력해 주세요.");
    if (!pw) setPwError("비밀번호를 입력해 주세요.");
    if (!pw2) setPw2Error("비밀번호 확인을 입력해 주세요.");
    if (pw && !isPwStrongEnough) setPwError("비밀번호는 8자 이상이어야 합니다.");
    if (pw2 && pw !== pw2) setPw2Error("비밀번호가 일치하지 않습니다.");
    if (!name || !email || !pw || !pw2 || !isPwStrongEnough || pw !== pw2) return;

    try {
      // ✅ 프로젝트 스키마에 맞게 바디 키 이름을 맞추세요.
      // 예) 백엔드가 companyName을 원하면 { companyName: company } 로 변경
      const body = { name: name.trim(), email: email.trim(), company, password: pw };

      await signupMutate(body as any);
      router.replace(toSafePath(redirect));
    } catch (err) {
      setServerMsg(toErrorMessage(err));
    }
  };

  // React Query fallback 메시지(성공 후 rerender 타이밍 보정)
  const fallbackMsg =
    (error as any)?.response?.data?.message ??
    (error as any)?.data?.message ??
    (error as any)?.message ??
    "";
  const displayError = serverMsg || fallbackMsg;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-[680px] max-w-full flex-col gap-2 rounded-2xl bg-white pt-14 pr-11 pb-11 pl-14 shadow-sm [box-shadow:0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(16,24,40,0.08)]"
    >
      <h1 className="mb-6 text-center text-lg font-bold text-slate-900">회원가입</h1>

      {displayError && (
        <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">{displayError}</p>
      )}

      {/* 이름 */}
      <label className="mb-1 text-[13px] font-medium text-slate-500">이름</label>
      <AuthInput
        placeholder="이름을 입력해 주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        invalid={!!nameError}
        aria-describedby="name-error"
        autoComplete="name"
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
      />
      {nameError && (
        <p id="name-error" className="mt-1 text-xs text-[#FF2727]">
          {nameError}
        </p>
      )}

      {/* 아이디(이메일) */}
      <label className="mt-4 mb-1 text-[13px] font-medium text-slate-500">아이디</label>
      <AuthInput
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        invalid={!!emailError}
        aria-describedby="email-error"
        autoComplete="username"
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
      />
      {emailError && (
        <p id="email-error" className="mt-1 text-xs text-[#FF2727]">
          {emailError}
        </p>
      )}

      {/* 회사명 */}
      <label className="mt-4 mb-1 text-[13px] font-medium text-slate-500">회사명</label>
      <AuthInput
        placeholder="회사명을 입력해 주세요"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        invalid={false}
        autoComplete="organization"
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
      />

      {/* 비밀번호 */}
      <label className="mt-4 mb-1 text-[13px] font-medium text-slate-500">비밀번호</label>
      <AuthPasswordInput
        placeholder="비밀번호를 입력해 주세요"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        invalid={!!pwError}
        errorMessage={pwError}
        aria-describedby="pw-error"
        autoComplete="new-password"
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
      />

      {/* 비밀번호 확인 (이미지처럼 에러 보더 + 하단 메시지) */}
      <label className="mt-4 mb-1 text-[13px] font-medium text-slate-500">비밀번호 확인</label>
      <AuthPasswordInput
        placeholder="비밀번호를 작성해 주세요"
        value={pw2}
        onChange={(e) => setPw2(e.target.value)}
        invalid={!!pw2Error || (pw2.length > 0 && !isPwMatch)}
        errorMessage={
          pw2Error || (pw2.length > 0 && !isPwMatch ? "비밀번호가 일치하지 않습니다." : undefined)
        }
        aria-describedby="pw2-error"
        autoComplete="new-password"
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
      />

      <AuthButton type="submit" disabled={!canSubmit} loading={isPending} className="mt-6">
        회원가입
      </AuthButton>

      <p className="mt-3 text-center text-xs text-slate-500">
        이미 회원이신가요?{" "}
        <Link href="/signin" className="underline underline-offset-2 hover:text-slate-700">
          로그인
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
