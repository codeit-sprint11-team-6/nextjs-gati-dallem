// src/components/auth/ui/AuthPasswordInput.tsx
"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import AuthInput from "./AuthInput";

type AuthPasswordInputProps = React.ComponentProps<typeof AuthInput>;

const AuthPasswordInput = React.forwardRef<HTMLInputElement, AuthPasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <div className="relative">
        <AuthInput
          ref={ref}
          type={show ? "text" : "password"}
          className={cn("pr-12", className)}
          rightAdornment={
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "비밀번호 숨기기" : "비밀번호 표시"}
              className={cn(
                "flex size-5 items-center justify-center",
                // 기본 상태 (라이트)
                "text-[color:var(--color-gray-500,#737373)] hover:text-[color:var(--color-gray-700,#555555)]",
                // 다크모드 (placeholder 톤 맞춤)
                "dark:text-[color:var(--color-gray-300,#6B7280)] dark:hover:text-[color:var(--color-gray-200,#9CA3AF)]",
              )}
            >
              {show ? <Eye /> : <EyeOff />}
            </button>
          }
          {...props}
        />
      </div>
    );
  },
);

AuthPasswordInput.displayName = "AuthPasswordInput";
export { AuthPasswordInput };
