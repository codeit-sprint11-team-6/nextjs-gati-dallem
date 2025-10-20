import { useOverlay } from "@/hooks/useOverlay";
import { useModalHistory } from "@/hooks/useModalHistory";
import { cn } from "@/utils/classNames";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

/**
 * CCP로 직접 구현하는 모달 컴포넌트
 */
export default function Modal({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { close } = useOverlay();

  // 뒤로가기로 모달 닫기 기능
  useModalHistory(true, close);

  return (
    <div
      className="animate-fade-in fixed inset-0 z-100 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      id="dimmed"
    >
      <section
        className={cn(
          "grid items-center justify-stretch gap-11 rounded-3xl md:rounded-[40px]",
          "min-w-[342px] bg-white p-6 pt-8 md:w-[600px] md:p-12",
          className,
        )}
        aria-label="모달 영역"
      >
        {children}
      </section>
    </div>
  );
}
function ModalHeader({ children }: { children?: React.ReactNode }) {
  const { close } = useOverlay();
  return (
    <div className="flex-between">
      <h2 className="text-lg font-semibold text-gray-900 md:text-2xl">{children}</h2>
      <button className="cursor-pointer" onClick={close}>
        <Image src="/icon/delete.svg" width={24} height={24} alt="모달 닫기 버튼 이미지" />
      </button>
    </div>
  );
}
Modal.Header = ModalHeader;

function ModalOneButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className="flex-center">
      <button
        className="btn w-[140px] rounded-2xl bg-purple-500 py-3 font-bold text-white md:w-[254px] md:p-4 md:text-xl"
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
Modal.OneButton = ModalOneButton;

function ModalTwoButton({
  leftBtnText = "취소",
  rightBtnText = "확인",
  rightBtnDisabled = false,
  onRightBtnClick = () => {},
}: {
  leftBtnText?: string;
  rightBtnText?: string;
  rightBtnDisabled?: boolean;
  onRightBtnClick?: () => void;
}) {
  const { close } = useOverlay();
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        className="btn rounded-2xl border-1 border-[#DDDDDD] bg-white p-3 text-[#737373] md:p-4 md:text-xl"
        onClick={close}
      >
        {leftBtnText}
      </button>
      <button
        className="btn rounded-2xl bg-purple-500 p-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300 md:p-4 md:text-xl"
        disabled={rightBtnDisabled}
        onClick={onRightBtnClick}
      >
        {rightBtnText}
      </button>
    </div>
  );
}
Modal.TwoButton = ModalTwoButton;
