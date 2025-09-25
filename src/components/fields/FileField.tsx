"use client";

import * as React from "react";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FileFieldProps = {
  onFileSelect?: (file: File | null) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  accept?: string;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
};

export const FileField = React.forwardRef<HTMLInputElement, FileFieldProps>(
  (
    {
      onFileSelect,
      placeholder = "이미지를 첨부해주세요",
      size = "md",
      accept,
      multiple,
      className,
      disabled,
    },
    _ref,
  ) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const [label, setLabel] = React.useState("");

    return (
      <div className="relative flex items-center gap-2">
        <Input
          readOnly
          disabled={disabled}
          placeholder={placeholder}
          value={label}
          size={size}
          className={cn("pr-24 bg-white", className)}
        />
        <Button
          type="button"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-purple-600 border border-purple-500 hover:bg-purple-50"
          onClick={() => ref.current?.click()}
          disabled={disabled}
        >
          파일 찾기
        </Button>
        <input
          ref={ref}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            const files = e.target.files;
            const name = !files?.length
              ? ""
              : multiple
                ? Array.from(files)
                    .map((f) => f.name)
                    .join(", ")
                : files![0].name;
            setLabel(name);
            onFileSelect?.(files?.[0] ?? null);
          }}
        />
      </div>
    );
  },
);

FileField.displayName = "FileField";
