import ProfileUpdateModal from "@/components/my/profile/ProfileUpdateModal";
import { mockProfile } from "@/mocks/my/mockProfile";
import { useAuthStore } from "@/store/authStore";
import { closeSpy, resetCloseSpy } from "@/test/__mocks__/overlay";
import { fireEvent, render, screen } from "@testing-library/react";

const mutateSpy = jest.fn().mockImplementation((_payload: any, opts: any) => {
  opts?.onSuccess?.();
});
jest.mock("@/apis/auths/auths.query", () => ({
  useUpdateAuthUser: () => ({ mutate: mutateSpy }),
}));

describe("마이페이지 - 프로필 수정 모달 (ProfileUpdateModal)", () => {
  let profileImage: HTMLElement;
  let fileInput: HTMLElement;
  let companyNameInput: HTMLElement;
  let submitBtn: HTMLElement;

  beforeEach(() => {
    useAuthStore.setState({ user: mockProfile });

    render(<ProfileUpdateModal />);

    profileImage = screen.getByAltText("프로필 사진");
    fileInput = screen.getByTestId("profile-image-input");
    companyNameInput = screen.getByLabelText("회사");
    submitBtn = screen.getByRole("button", { name: "수정하기" });
  });

  afterEach(() => {
    resetCloseSpy();
  });

  function _fireFileInputChange() {
    const dummyImageFile = new File(["dummy"], "new-profile-image.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [dummyImageFile] } });
  }

  function _fireCompanyNameInputChange() {
    const companyNameInput = screen.getByLabelText("회사");
    fireEvent.change(companyNameInput, { target: { value: "테스트" } });
  }

  test("렌더링 및 프로필 정보 세팅 확인", () => {
    setTimeout(() => {
      expect(screen.getByText("프로필 수정하기")).toBeInTheDocument();

      expect(profileImage).toBeInTheDocument();
      expect(profileImage.getAttribute("src")).toBe(mockProfile.image);

      expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
      expect(screen.getByText(mockProfile.companyName)).toBeInTheDocument();
      expect(screen.getByText(mockProfile.email)).toBeInTheDocument();

      const submitBtn = screen.getByRole("button", { name: "수정하기" });
      expect(submitBtn).toBeDisabled();
    }, 100);
  });

  test("이미지 업로드 및 미리보기 확인", () => {
    const objectUrlSpy = jest.spyOn(URL, "createObjectURL");

    _fireFileInputChange();

    expect(objectUrlSpy).toHaveBeenCalledTimes(1);
    expect(profileImage.getAttribute("src")).toBe("blob:preview");
  });

  describe("버튼 활성화 확인", () => {
    test("현재 프로필 상태와 같으면 비활성화", () => {
      setTimeout(() => {
        expect(profileImage.getAttribute("src")).toBe(mockProfile.image);
        expect(companyNameInput).toHaveValue(mockProfile.companyName);
        expect(submitBtn).toBeDisabled();
      }, 100);
    });

    test("프로필 정보 업데이트 감지하면 활성화", () => {
      _fireCompanyNameInputChange();
      expect(submitBtn).toBeEnabled();
    });
  });

  test("[수정하기] 버튼 클릭 - useUpdateAuthUser().mutate 호출, useOverlay().close 호출", () => {
    _fireFileInputChange();
    _fireCompanyNameInputChange();

    expect(submitBtn).toBeEnabled();
    fireEvent.click(submitBtn);

    expect(mutateSpy).toHaveBeenCalledTimes(1);
    const [args, options] = mutateSpy.mock.calls[0];
    // 파일과 회사명을 모두 변경하면 mutate payload에 image(File) 포함하는지 확인
    expect(args.companyName).toBe("테스트");
    expect(args.image).toBeInstanceOf(File);
    expect((args.image as File).name).toBe("new-profile-image.png");

    expect(typeof options?.onSuccess).toBe("function");
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });
});
