import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * spec
 * Colors: #5865F2, #4D59D5, #38419B, #EEEEEE
 * Sizes:  474x60, 232x60, 311x48, 102x48
 * Radius: 20px
 */
const buttonVariants = cva(
  // base (공통)
  "inline-flex items-center justify-center whitespace-nowrap rounded-[20px] font-bold transition-colors " +
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 " +
    "gap-2.5 leading-7 tracking-[-0.03em] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // === 색상(팔레트) ===
      tone: {
        purple500: "bg-[#5865F2] text-white hover:brightness-95",
        indigo450: "bg-[#4D59D5] text-white hover:brightness-95",
        navy700: "bg-[#38419B] text-white hover:brightness-95",
        neutral: "bg-[#EEEEEE] text-[#737373] hover:brightness-95",
        white: "bg-white text-[#737373] hover:brightness-95",
        cancel: "bg-white text-[#737373] hover:brightness-95",
      },
      // === 사이즈(고정 width/height 포함) ===
      size: {
        // 60px 높이군
        xl_474x60: "w-[474px] h-[60px] px-[30px] text-xl [&_svg]:size-5",
        md_232x60: "w-[232px] h-[60px] px-[30px] text-xl [&_svg]:size-5",
        // 48px 높이군
        lg_311x48: "w-[311px] h-12 px-6 text-base [&_svg]:size-4",
        sm_102x48: "w-[102px] h-12 px-4 text-base [&_svg]:size-4",
      },
    },
    // tone+size 조합에 따라 색상 오버라이드
    compoundVariants: [
      {
        tone: "white",
        size: "sm_102x48",
        className: "text-[#4D59D5]", // 작은+흰배경 → 파란 글자
      },
      {
        tone: "purple500",
        size: "sm_102x48",
        className: "text-[#C3C8FA]", // 작은+보라배경 → 연한 보라 텍스트
      },
    ],
    defaultVariants: {
      tone: "purple500",
      size: "xl_474x60",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, tone, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ tone, size, className }))} {...props} />;
  },
);
Button.displayName = "Button";

export { buttonVariants };
