// src/components/auth/SignupForm.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AuthInput from "./ui/AuthInput";
import { AuthPasswordInput } from "./ui/AuthPasswordInput";
import AuthButton from "./ui/AuthButton";
import { useSignup } from "@/hooks/auths/useSignup";
// import { toSafePath } from "@/utils/auth/safePath";
import {
  // toUserErrorMessage,
  toUserErrorDetails,
  extractValidationItems,
} from "@/apis/_errorMessage";
import { AUTH_ERROR_MESSAGES } from "@/constants/auth/errorMessages";
import { validateSignup } from "@/utils/auth/validateSignup";
import { MIN_PASSWORD_LEN } from "@/constants/auth/constraints";

type Props = { redirect?: string };

const SignupForm = ({ redirect = "/signin" }: Props) => {
  const { mutateAsync: signupMutate, isPending } = useSignup();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  // field error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [pwError, setPwError] = useState("");
  const [pw2Error, setPw2Error] = useState("");
  //   const [serverMsg, setServerMsg] = useState("");

  // 앞단 검증
  const isPwMatch = pw2.length > 0 && pw === pw2;
  const isPwStrongEnough = pw.length >= MIN_PASSWORD_LEN; // 필요시 강화 규칙 추가(영문/숫자/특수문자 등)

  // 버튼 활성: 값 존재 & 요청 중 아님 (검증은 submit 시 validateSignup이 최종 담당)
  const canSubmit = useMemo(
    () =>
      !!(name.trim() && email.trim() && company.trim() && pw && pw2 && pw === pw2) && !isPending,
    [name, email, company, pw, pw2, isPending],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    // 에러 초기화
    setNameError("");
    setEmailError("");
    setCompanyError("");
    setPwError("");
    setPw2Error("");
    // setServerMsg("");

    // 1) 클라이언트 선검증
    const errs = validateSignup({
      name,
      email,
      company,
      password: pw,
      confirmPassword: pw2,
    });

    if (errs.name) setNameError(errs.name);
    if (errs.email) setEmailError(errs.email);
    if (errs.company) setCompanyError(errs.company);
    if (errs.password) setPwError(errs.password);
    if (errs.confirmPassword) setPw2Error(errs.confirmPassword);
    if (Object.keys(errs).length) return; // 선검증 실패 시 API 호출 중단

    // 2) API
    try {
      const body = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        companyName: company.trim(),
        password: pw,
      };
      await signupMutate(body);
      // 성공 모달은 useSignup 내부에서 처리 중
      // 필요 시: router.replace(redirect);
    } catch (err) {
      // 서버 필드 에러 매핑(있으면)
      const { code, status } = toUserErrorDetails(err, "");

      // 이메일 중복(서버: 400 + code "EMAIL_EXISTS")
      if (code === "EMAIL_EXISTS") {
        setEmailError(AUTH_ERROR_MESSAGES.fields.email.DUPLICATE);
        return;
      }

      // 서버 유효성 오류 → 각 필드로 매핑하지만, 대부분은 프론트에서 선검증됨
      if (code === "VALIDATION_ERROR" || status === 400 || status === 422) {
        const items = extractValidationItems(err);
        for (const it of items) {
          switch (it.parameter) {
            case "email":
              setEmailError(it.message || AUTH_ERROR_MESSAGES.fields.email.INVALID);
              break;
            case "name":
              setNameError(it.message || AUTH_ERROR_MESSAGES.fields.name.REQUIRED);
              break;
            case "companyName":
              setCompanyError(it.message || AUTH_ERROR_MESSAGES.fields.companyName.REQUIRED);
              break;
            case "password":
              setPwError(it.message || AUTH_ERROR_MESSAGES.fields.password.WEAK);
              break;
          }
        }
        return;
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex w-[680px] max-w-full flex-col gap-2 rounded-2xl bg-white pt-14 pr-11 pb-11 pl-14 shadow-sm [box-shadow:0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(16,24,40,0.08)]"
    >
      <h1 className="mb-6 text-center text-lg font-bold text-slate-900">회원가입</h1>

      {/* 이름 */}
      <label className="mb-1 text-[13px] font-medium text-slate-500">이름</label>
      <AuthInput
        placeholder="이름을 입력해 주세요"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (nameError) setNameError("");
        }}
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
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError("");
        }}
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
        onChange={(e) => {
          setCompany(e.target.value);
          if (companyError) setCompanyError("");
        }}
        invalid={!!companyError}
        autoComplete="organization"
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
      />
      {companyError && (
        <p id="company-error" className="mt-1 text-xs text-[#FF2727]">
          {companyError}
        </p>
      )}
      {/* 비밀번호 */}
      <label className="mt-4 mb-1 text-[13px] font-medium text-slate-500">비밀번호</label>
      <AuthPasswordInput
        placeholder="비밀번호를 입력해 주세요"
        value={pw}
        onChange={(e) => {
          setPw(e.target.value);
          if (pwError) setPwError("");
        }}
        invalid={!!pwError}
        errorMessage={pwError}
        aria-describedby="pw-error"
        autoComplete="new-password"
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
      />

      {/* 실시간 힌트(선택): 최소 길이 */}
      {pw.length > 0 && !isPwStrongEnough && !pwError && (
        <p className="mt-1 text-xs text-[#FF2727]">
          비밀번호는 {MIN_PASSWORD_LEN}자 이상이어야 합니다.
        </p>
      )}
      {/* 비밀번호 확인 (이미지처럼 에러 보더 + 하단 메시지)  */}
      <label className="mt-4 mb-1 text-[13px] font-medium text-slate-500">비밀번호 확인</label>
      <AuthPasswordInput
        placeholder="비밀번호를 작성해 주세요"
        value={pw2}
        onChange={(e) => {
          setPw2(e.target.value);
          if (pw2Error) setPw2Error("");
        }}
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
