"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, ...props }, ref) => {
    const [showPassword, setshowPassword] = React.useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          size={size}
          type={showPassword ? "text" : "password"}
          withEndIcon
          className={cn("pr-10", className)}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute top-0 right-0 h-full cursor-pointer px-3 py-2 hover:!bg-transparent focus-visible:!bg-transparent active:!bg-transparent"
          onClick={() => setshowPassword((s) => !s)}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {showPassword ? (
            <Eye className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">{showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}</span>
        </Button>
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";
