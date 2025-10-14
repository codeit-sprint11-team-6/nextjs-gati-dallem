"use client";

import { useUpdateAuthUser } from "@/apis/auths/auths.query";
import { useOverlay } from "@/hooks/useOverlay";
import { useAuthStore } from "@/store/authStore";
import { AuthUser } from "@/types";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal from "../../common/Modal";
import ProfileUpdateForm from "./ProfileUpdateForm";

const initialProfileData = { image: null, name: "", companyName: "", email: "" };

export type ProfileDataType = { tempImage?: File } & Pick<
  AuthUser,
  "image" | "name" | "companyName" | "email"
>;

export default function ProfileUpdateModal() {
  const { user } = useAuthStore();
  const { close } = useOverlay();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState<ProfileDataType>(initialProfileData);
  const updateMutate = useUpdateAuthUser();

  useEffect(() => {
    if (user) {
      const { image, name, companyName, email } = user;
      setProfileData({ image, name, companyName, email });
    }
  }, [user]);

  function handleChangeProfileImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      setProfileData({ ...profileData, image: preview, tempImage: file });
    }
  }

  function handleClickEditButton() {
    fileInputRef.current?.click();
  }

  function handleChangeProfileData(name: string, value: string) {
    setProfileData({ ...profileData, [name]: value });
  }
  const btnDisabled =
    user?.companyName === profileData.companyName && user?.image === profileData.image;

  function onConfirmBtnClick() {
    const { companyName, tempImage: image } = profileData;
    updateMutate.mutate({ companyName, image }, { onSuccess: () => close() });
  }
  return (
    <Modal>
      <Modal.Header>프로필 수정하기</Modal.Header>
      <div className="grid justify-stretch gap-8">
        <div className="flex-center">
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="absolute top-0 bottom-0 z-1 w-[114px] cursor-pointer rounded-full opacity-0"
              onChange={handleChangeProfileImage}
            />
            <div className="relative h-[114px] w-[114px] overflow-hidden rounded-full border-1 border-slate-200">
              <Image
                src={profileData?.image ?? "/image/profile-lg.svg"}
                className="object-cover"
                alt="프로필 사진"
                fill
              />
            </div>
            <div className="absolute right-[-2px] bottom-[-5px]">
              <button
                className="flex-center cursor-pointer rounded-full border-1 border-slate-200 bg-white p-2"
                onClick={handleClickEditButton}
              >
                <Image
                  src="/icon/edit-lg.svg"
                  alt="프로필 사진 수정하기 버튼 이미지"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
        <ProfileUpdateForm
          profileData={profileData}
          onProfileDataChange={handleChangeProfileData}
        />
      </div>
      <Modal.TwoButton
        rightBtnText="수정하기"
        onRightBtnClick={onConfirmBtnClick}
        rightBtnDisabled={btnDisabled}
      />
    </Modal>
  );
}
