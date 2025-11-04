// components/auth/LoginForm.tsx
"use client";

import { useMemo, useState, type FormEvent } from "react";
import AuthInput from "./ui/AuthInput";
import AuthButton from "./ui/AuthButton";
import { AuthPasswordInput } from "./ui/AuthPasswordInput";
import { useSignin } from "@/apis/auths/auths.query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toSafePath } from "@/utils/auth/safePath";
import { toUserErrorMessage } from "@/apis/_errorMessage";
import { EMAIL_REGEX } from "@/constants/auth/constraints";
import FormErrorBanner from "./ui/FormErrorBanner";
import { useDebouncedValidation } from "@/hooks/auths/useDebouncedValidation";
import { validateSignin } from "@/utils/auth/validateSignin";
import { DEBOUNCE_MS } from "@/constants/auth/validation";

type Props = { redirect?: string };

const LoginForm = ({ redirect = "/" }: Props) => {
  const router = useRouter();

  // error 지우고 HttpApiError 통합 예정
  const { mutateAsync: signinMutate, isPending, error, reset } = useSignin();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const [touched, setTouched] = useState({ email: false });
  const emailTrim = email.trim();

  const isFormValid = useMemo(() => {
    const filled = emailTrim.length > 0 && pw.length > 0;
    const validEmail = EMAIL_REGEX.test(emailTrim);
    return filled && validEmail && !isPending;
  }, [emailTrim, pw, isPending]);

  useDebouncedValidation([emailTrim, touched.email], DEBOUNCE_MS, () => {
    if (!touched.email) return;
    const errs = validateSignin({ email: emailTrim });
    setEmailError(errs.email ?? "");
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isPending) return; // 중복 제출 방지

    setEmailError("");
    setServerMsg("");
    reset();

    try {
      await signinMutate({ email: emailTrim, password: pw });
      router.replace(toSafePath(redirect)); // 로그인 성공 시 안전 리다이렉트
    } catch (err) {
      setServerMsg(toUserErrorMessage(err, "로그인에 실패했습니다. 다시 시도해 주세요."));
    }
  };

  const fallbackMsg = error ? toUserErrorMessage(error, "") : "";
  const displayError = serverMsg || fallbackMsg;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-[680px] max-w-full flex-col gap-2 rounded-2xl bg-white pt-14 pr-11 pb-11 pl-14 shadow-sm [box-shadow:0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(16,24,40,0.08)] max-sm:px-6 dark:bg-gray-900`}
      noValidate // 브라우저 기본 검증 비활성 (커스텀 메시지 사용)
    >
      <h1 className="mb-6 text-center text-lg font-bold text-slate-900 dark:text-slate-100">
        로그인
      </h1>
      {displayError && <FormErrorBanner message={displayError} />}

      <label
        htmlFor="login-email"
        className="mb-1 text-[13px] font-medium text-slate-500 dark:text-slate-400"
      >
        아이디(이메일)
      </label>
      <AuthInput
        id="login-email"
        type="email"
        placeholder="아이디(이메일)을 입력해 주세요"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (!touched.email) setTouched((t) => ({ ...t, email: true }));
          if (emailError) setEmailError("");
          if (serverMsg) setServerMsg("");
          if (error) reset();
        }}
        invalid={!!emailError}
        errorMessage={emailError}
        autoComplete="username"
        name="username"
        inputMode="email"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />

      <label
        htmlFor="login-password"
        className="mt-4 mb-1 text-[13px] font-medium text-slate-500 dark:text-slate-400"
      >
        비밀번호
      </label>
      <AuthPasswordInput
        id="login-password"
        placeholder="비밀번호를 입력해 주세요"
        value={pw}
        onChange={(e) => {
          setPw(e.target.value);
          if (serverMsg) setServerMsg("");
          if (error) reset();
        }}
        autoComplete="current-password"
        name="password"
      />

      <AuthButton type="submit" disabled={!isFormValid} className="mt-6">
        {isPending ? "로그인 중..." : "로그인"}
      </AuthButton>
      <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
        같이 달램이 처음이신가요?{" "}
        <Link
          href="/signup"
          className="underline underline-offset-2 hover:text-slate-700 dark:text-slate-300"
        >
          회원가입
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
