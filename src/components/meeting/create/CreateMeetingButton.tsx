"use client";
import { useOverlay } from "@/hooks/useOverlay";
import CreateMeetingModal from "./CreateMeetingModal";

interface Props { className?: string; }
export default function CreateMeetingFAB({ className }: Props) {
  const { overlay } = useOverlay();

  const handleClick = () => {
    overlay(<CreateMeetingModal />);
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl transition-all hover:bg-emerald-600 hover:scale-110 ${className ?? ""}`}
      aria-label="모임 만들기"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  );
}
