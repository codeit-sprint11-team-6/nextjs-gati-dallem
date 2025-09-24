import LoginModal from "@/components/common/LoginModal";
import Modal from "@/components/common/Modal";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Common/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CustomModalExample: Story = {
  render: () => {
    return (
      <Modal className="gap-8">
        <div className="grid gap-4">
          <Modal.Header>
            알림 <span className="text-base font-semibold text-gray-400">1/3</span>
          </Modal.Header>
          <div className="flex-center pt-4 text-lg font-semibold md:text-2xl">
            <p className="text-center">
              모달 예제를 확인하고
              <br />
              커스텀 모달 컴포넌트를 만들어 보세요
            </p>
          </div>
        </div>
        <Modal.OneButton>확인</Modal.OneButton>
      </Modal>
    );
  },
};
/** */
export const ModalLogin: Story = {
  render: () => {
    return (
      <Modal>
        <div className="grid gap-4">
          <Modal.Header />
          <div className="flex-center text-lg font-semibold md:text-2xl">
            로그인이 필요한 서비스입니다.
          </div>
        </div>
        <Modal.TwoButton rightBtnText="로그인하기" onRightBtnClick={() => {}} />
      </Modal>
    );
  },
};
