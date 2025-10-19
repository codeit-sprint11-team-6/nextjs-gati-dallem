import ProfileUpdateForm from "@/components/my/profile/ProfileUpdateForm";
import { mockProfile } from "@/mocks/my/mockProfile";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

describe("마이페이지 - 프로필 수정 입력 폼 (ProfileUpdateForm)", () => {
  const profileUpdateFormProps = { profileData: mockProfile, onProfileDataChange: jest.fn() };

  describe("입력 확인", () => {
    test("이름 입력 비활성화 확인", () => {
      render(<ProfileUpdateForm {...profileUpdateFormProps} />);
      const nameInput = screen.getByLabelText("이름");
      expect(nameInput).toHaveValue(mockProfile.name);
      expect(nameInput).toBeDisabled();
    });

    test("회사 입력 활성화 확인 및 입력 결과 확인", () => {
      const Wrapper = () => {
        const [profileData, setProfileData] = useState(mockProfile);
        function handleProfileDataChange(name: string, value: string) {
          setProfileData({ ...profileData, [name]: value });
        }
        return (
          <ProfileUpdateForm
            profileData={profileData}
            onProfileDataChange={handleProfileDataChange}
          />
        );
      };

      render(<Wrapper />);

      const companyNameInput = screen.getByLabelText("회사");
      expect(companyNameInput).toHaveValue(mockProfile.companyName);
      expect(companyNameInput).toBeEnabled();

      fireEvent.change(companyNameInput, { target: { value: "테스트" } });
      expect(companyNameInput).toHaveValue("테스트");
    });

    test("이메일 입력 비활성화 확인", () => {
      render(<ProfileUpdateForm {...profileUpdateFormProps} />);
      const emailInput = screen.getByLabelText("이메일");
      expect(emailInput).toHaveValue(mockProfile.email);
      expect(emailInput).toBeDisabled();
    });
  });
});
