// src/components/auth/SignupForm.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AuthInput from "./ui/AuthInput";
import { AuthPasswordInput } from "./ui/AuthPasswordInput";
import AuthButton from "./ui/AuthButton";
import { useSignup } from "@/apis/auths/auths.query";
// import { toSafePath } from "@/utils/auth/safePath";
import {
  // toUserErrorMessage,
  toUserErrorDetails,
  extractValidationItems,
} from "@/apis/_errorMessage";
import { AUTH_ERROR_MESSAGES } from "@/constants/auth/errorMessages";
import { validateSignup, SignupFields as ValidationFields } from "@/utils/auth/validateSignup";
import { EMAIL_REGEX, MIN_PASSWORD_LEN } from "@/constants/auth/constraints";
import FormErrorBanner from "./ui/FormErrorBanner";
import { useOverlay } from "@/hooks/useOverlay";
import { useRouter } from "next/navigation";
import { SignupBody } from "@/apis/auths/auths.schema";
import SignupModal from "../common/SignupModal";
import { useDebouncedValidation } from "@/hooks/auths/useDebouncedValidation";
import { DEBOUNCE_MS } from "@/constants/auth/validation";

type Props = { redirect?: string };

type FormFields = Omit<ValidationFields, "password" | "confirmPassword"> & {
  pw: string;
  pw2: string;
};

type SignupErrors = Partial<Record<keyof FormFields | "global", string>>;

const SignupForm = ({ redirect = "/signin" }: Props) => {
  const { overlay } = useOverlay();
  const router = useRouter();

  const { mutateAsync: signupMutate, isPending } = useSignup();

  // form states
  const [values, setValues] = useState<FormFields>({
    name: "",
    email: "",
    company: "",
    pw: "",
    pw2: "",
  });

  // field error states
  const [errors, setErrors] = useState<SignupErrors>({});

  const [touched, setTouched] = useState<Record<keyof FormFields, boolean>>({
    name: false,
    email: false,
    company: false,
    pw: false,
    pw2: false,
  });

  const { name, email, company, pw, pw2 } = values;

  // 공통 change 핸들러 (값 업데이트 + 해당 필드 에러 초기화)
  function handleChange<K extends keyof FormFields>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" as SignupErrors[K], global: "" }));
  }

  // 앞단 검증
  const isFormValid = useMemo(() => {
    const filled = !!(name.trim() && email.trim() && company.trim() && pw && pw2);
    const basicValid =
      EMAIL_REGEX.test(email.trim()) && pw.length >= MIN_PASSWORD_LEN && pw === pw2;
    return filled && basicValid && !isPending;
  }, [name, email, company, pw, pw2, isPending]);

  useDebouncedValidation(
    [values.name, values.email, values.company, values.pw, values.pw2, touched],
    DEBOUNCE_MS,
    () => {
      const vErrs = validateSignup({
        name,
        email,
        company,
        password: pw,
        confirmPassword: pw2,
      });

      const next: SignupErrors = {};
      if (touched.name) next.name = vErrs.name || "";
      if (touched.email) next.email = vErrs.email || "";
      if (touched.company) next.company = vErrs.company || "";
      if (touched.pw) next.pw = vErrs.password || "";
      if (touched.pw2) next.pw2 = vErrs.confirmPassword || "";

      setErrors((prev) => ({ ...prev, ...next }));
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    setErrors({}); // 에러 초기화

    // 1) 클라이언트 선검증
    const vErrs = validateSignup({
      name,
      email,
      company,
      password: pw,
      confirmPassword: pw2,
    });

    // 선검증 실패 시 API 호출 중단
    if (Object.keys(vErrs).length) {
      setErrors({
        name: vErrs.name,
        email: vErrs.email,
        company: vErrs.company,
        pw: vErrs.password,
        pw2: vErrs.confirmPassword,
      });
      return;
    }

    // 2) API
    try {
      const body: SignupBody = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        companyName: company.trim(),
        password: pw,
      };
      await signupMutate(body);
      // 성공 시 모달 표시 후 redirect 경로로 이동
      overlay(
        <SignupModal
          message={`"같이달램" 회원가입이 정상적으로 완료되었습니다.\n로그인 페이지로 이동합니다.`}
          onConfirm={() => router.push(redirect)}
        />,
      );
    } catch (err) {
      // 서버 필드 에러 매핑(있으면)
      const { code, status, message } = toUserErrorDetails(err, "");

      // 이메일 중복(서버: 400 + code "EMAIL_EXISTS")
      if (code === "EMAIL_EXISTS") {
        setErrors((prev) => ({
          ...prev,
          email: AUTH_ERROR_MESSAGES.fields.email.DUPLICATE,
        }));
        return;
      }

      // 서버 유효성 오류 매핑 → 각 필드로 매핑하지만, 대부분은 프론트에서 선검증됨
      if (code === "VALIDATION_ERROR" || status === 400) {
        const items = extractValidationItems(err);
        const next: SignupErrors = {};
        for (const it of items) {
          switch (it.parameter) {
            case "email":
              next.email = it.message || AUTH_ERROR_MESSAGES.fields.email.INVALID;
              break;
            case "name":
              next.name = it.message || AUTH_ERROR_MESSAGES.fields.name.REQUIRED;
              break;
            case "companyName":
              next.company = it.message || AUTH_ERROR_MESSAGES.fields.companyName.REQUIRED;
              break;
            case "password":
              next.pw = it.message || AUTH_ERROR_MESSAGES.fields.password.WEAK;
              break;
          }
        }
        setErrors((prev) => ({ ...prev, ...next }));
        return;
      }
      setErrors((prev) => ({ ...prev, global: message }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-[680px] max-w-full flex-col gap-2 rounded-2xl bg-white pt-14 pr-11 pb-11 pl-14 shadow-sm [box-shadow:0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(16,24,40,0.08)]"
    >
      <h1 className="mb-6 text-center text-lg font-bold text-slate-900">회원가입</h1>
      {errors.global && <FormErrorBanner message={errors.global} />}
      {/* 이름 */}
      <label htmlFor="signup-name" className="mb-1 text-[13px] font-medium text-slate-500">
        이름
      </label>
      <AuthInput
        id="signup-name"
        placeholder="이름을 입력해 주세요"
        value={values.name}
        onChange={(e) => handleChange("name", e.target.value)}
        invalid={!!errors.name}
        errorMessage={errors.name}
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
        autoComplete="name"
      />
      {/* 아이디(이메일) */}
      <label htmlFor="signup-email" className="mt-4 mb-1 text-[13px] font-medium text-slate-500">
        이메일
      </label>
      <AuthInput
        id="signup-email"
        type="email"
        placeholder="이메일을 입력해 주세요"
        value={email}
        onChange={(e) => handleChange("email", e.target.value)}
        invalid={!!errors.email}
        errorMessage={errors.email}
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
        autoComplete="username"
      />
      {/* 회사명 */}
      <label htmlFor="signup-company" className="mt-4 mb-1 text-[13px] font-medium text-slate-500">
        회사명
      </label>
      <AuthInput
        id="signup-company"
        placeholder="회사명을 입력해 주세요"
        value={company}
        onChange={(e) => handleChange("company", e.target.value)}
        invalid={!!errors.company}
        errorMessage={errors.company}
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
        autoComplete="organization"
      />
      {/* 비밀번호 */}
      <label htmlFor="signup-password" className="mt-4 mb-1 text-[13px] font-medium text-slate-500">
        비밀번호
      </label>
      <AuthPasswordInput
        id="signup-password"
        placeholder="새 비밀번호를 입력해 주세요"
        value={pw}
        onChange={(e) => handleChange("pw", e.target.value)}
        invalid={!!errors.pw}
        errorMessage={errors.pw}
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
        autoComplete="new-password"
      />
      {/* 비밀번호 확인  */}
      <label
        htmlFor="signup-password-confirm"
        className="mt-4 mb-1 text-[13px] font-medium text-slate-500"
      >
        비밀번호 확인
      </label>
      <AuthPasswordInput
        id="signup-password-confirm"
        placeholder="비밀번호를 한 번 더 입력해 주세요"
        value={pw2}
        onChange={(e) => handleChange("pw2", e.target.value)}
        invalid={!!errors.pw2}
        errorMessage={errors.pw2}
        className="bg-white ring-1 ring-slate-200 hover:ring-[#5865F2]/40 focus-visible:ring-2 focus-visible:ring-[#5865F2]"
        autoComplete="new-password"
      />

      <AuthButton type="submit" disabled={!isFormValid} loading={isPending} className="mt-6">
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
