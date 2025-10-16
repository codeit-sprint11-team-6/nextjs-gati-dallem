"use client";

import ReservedCardList from "@/components/my/bookings/ReservedCardList";
import ProfileUpdateModal from "@/components/my/profile/ProfileUpdateModal";
import { useOverlay } from "@/hooks/useOverlay";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function MyBookingsPage() {
  const searchParams = useSearchParams();
  const isProfileEdit = searchParams.get("profileEdit") === "true";

  const { overlay } = useOverlay();

  useEffect(() => {
    isProfileEdit && handleOpenProfileUpdateModal();
  }, [isProfileEdit]);

  function handleOpenProfileUpdateModal() {
    overlay(<ProfileUpdateModal />);
  }
  return (
    <div className="flex-center w-full">
      <ReservedCardList />
    </div>
  );
}
