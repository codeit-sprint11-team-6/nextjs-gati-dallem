"use client";
import { Plus } from "lucide-react";
import { useOverlay } from "@/hooks/useOverlay";
import { useRequireAuthAction } from "@/hooks/auths/useRequireAuthAction";
import { Button } from "@/components/common/Button";
import CreateMeetingModal from "./CreateMeetingModal";

interface Props {
  className?: string;
}
export default function CreateMeetingFAB({ className }: Props) {
  const { overlay } = useOverlay();
  const { requireAuthAction } = useRequireAuthAction();

  const handleClick = requireAuthAction(() => {
    overlay(<CreateMeetingModal />);
  });

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      size="icon"
      radius="round"
      className={`fixed right-8 bottom-8 z-30 h-14 w-14 cursor-pointer shadow-2xl hover:bg-purple-600 ${className ?? ""}`}
      aria-label="모임 만들기"
      leftIcon={<Plus className="h-6 w-6" />}
    >
      모임 만들기
    </Button>
  );
}
