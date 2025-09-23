import { useOverlay } from "@/hooks/useOverlay";
import { cn } from "@/utils/classNames";
import Image from "next/image";

export default function Modal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <section
        className={cn(
          "grid items-center justify-stretch gap-11 rounded-3xl md:rounded-[40px]",
          "min-w-[342px] bg-white p-6 pt-8 md:w-[600px] md:p-12",
          className,
        )}
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
      <button className="btn" onClick={close}>
        <Image src="/icon/delete.svg" width={24} height={24} alt="모달 닫기 버튼 이미지" />
      </button>
    </div>
  );
}
Modal.Header = ModalHeader;

function ModalTwoButton({
  rightBtnText = "확인",
  rightBtnDisabled = false,
  onRightBtnClick = () => {},
}: {
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
        취소
      </button>
      <button
        className="btn rounded-2xl bg-purple-500 p-3 font-bold text-white md:p-4 md:text-xl"
        disabled={rightBtnDisabled}
        onClick={onRightBtnClick}
      >
        {rightBtnText}
      </button>
    </div>
  );
}
Modal.TwoButton = ModalTwoButton;
