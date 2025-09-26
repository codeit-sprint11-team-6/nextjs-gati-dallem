// src/components/auth/ui/AuthPasswordInput.tsx
"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthInput from "./AuthInput";
import { InputProps } from "@/components/common/Input";

// type AuthPasswordInputProps = InputProps & {
//   errorMessage?: string; // 에러 메시지 출력용
// };

type AuthPasswordInputProps = InputProps & { errorMessage?: string; invalid?: boolean };

const AuthPasswordInput = React.forwardRef<HTMLInputElement, AuthPasswordInputProps>(
  ({ className, invalid, errorMessage, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <div className="w-full">
        <div className="relative">
          <AuthInput
            ref={ref}
            type={show ? "text" : "password"}
            invalid={invalid}
            className={cn("pr-12", className)}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "비밀번호 숨기기" : "비밀번호 표시"}
            className="absolute top-1/2 right-3 inline-flex size-5 -translate-y-1/2 items-center justify-center text-[color:var(--color-gray-500,#737373)] hover:text-[color:var(--color-gray-700,#555555)]"
          >
            {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
        {errorMessage && <p className="mt-1 text-xs text-[#FF2727]">{errorMessage}</p>}
      </div>
    );
  },
);

AuthPasswordInput.displayName = "AuthPasswordInput";
export { AuthPasswordInput };
