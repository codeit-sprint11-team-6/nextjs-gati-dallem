import { cn, cond } from "@/utils/classNames";
import { HtmlHTMLAttributes } from "react";

const CHIP_VARIANTS = {
  tag: "gap-1 pr-2 pl-1 rounded-xl bg-[rgba(255,133,224,0.2)] text-xs md:text-sm font-semibold text-pink-500",
  info: "px-2 py-0.5 rounded-xl border-1 border-slate-100 bg-white text-xs md:text-sm font-medium text-slate-500",
  active: "px-4 py-2 rounded-2xl bg-state-700 text-base font-medium text-white",
  default: "px-4 py-2 rounded-2xl bg-state-50 text-base font-medium text-slate-700",
  /** 이용 예정 */
  brand: "px-3 py-1.5 rounded-3xl bg-purple-100 text-sm font-semibold text-purple-600",
  /** 개설 대기 */
  tertiary:
    "px-3 py-1.5 rounded-3xl border-1 border-gray-200 bg-white text-sm font-semibold text-gray-500",
  /** 이용 완료 */
  disabled: "px-3 py-1.5 rounded-3xl bg-slate-50 text-sm font-semibold text-slate-500",
  /** 개설 확정 */
  outlined:
    "gap-0.5 pr-3 pl-2 py-1 rounded-3xl m-[1px] bg-white text-sm font-semibold text-purple-600",
};
interface ChipProps extends HtmlHTMLAttributes<HTMLDivElement> {
  variant: keyof typeof CHIP_VARIANTS;
  children?: React.ReactNode;
  className?: string;
}
export default function Chip({ variant, className = "", children, ...props }: ChipProps) {
  const chipClassName = cn("flex justify-center items-center", CHIP_VARIANTS[variant], className);
  return (
    <span
      className={cond(
        variant === "outlined",
        "bg-linear-90 from-purple-300 to-pink-300 rounded-3xl",
      )}
      aria-label="chip area"
    >
      <div className={chipClassName} aria-label="chip content area" {...props}>
        {children}
      </div>
    </span>
  );
}
