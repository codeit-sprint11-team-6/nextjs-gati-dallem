"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { SelectField, FileField } from "@/components/fields/index";
import { DateTimeField } from "@/components/fields/DateTimeField";
import { Label } from "@/components/ui/Label";
import { useCreateGathering } from "@/apis/gatherings/gatherings.query";
import type { CreateGatheringBody } from "@/apis/gatherings/gatherings.schema";
import { X } from "lucide-react";
import { DefaultGatheringType, GatheringMapper } from "@/types/gathering";

type Step = 1 | 2 | 3;
type MeetingType = "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";

interface Draft {
  type: MeetingType | null;
  name: string;
  location: string;
  imageFile: File | null;
  startDate: Date | undefined;
  endDate: Date | undefined;
  capacity: number | "";
}

const LOCATION_OPTIONS = [
  { label: "건대입구", value: "건대입구" },
  { label: "을지로3가", value: "을지로3가" },
  { label: "신림", value: "신림" },
  { label: "홍대입구", value: "홍대입구" },
];

const TYPE_OPTIONS = [
  {
    key: DefaultGatheringType.OFFICE_STRETCHING,
    title: GatheringMapper.OFFICE_STRETCHING,
    desc: "개발자들의 커뮤니티",
    emoji: "💻",
  },
  {
    key: DefaultGatheringType.MINDFULNESS,
    title: GatheringMapper.MINDFULNESS,
    desc: "누구나 참여 가능",
    emoji: "🤝",
  },
  {
    key: DefaultGatheringType.WORKATION,
    title: GatheringMapper.WORKATION,
    desc: "지식 공유의 장",
    emoji: "💼",
  },
] as const;

const NEXT: Record<Step, Step> = { 1: 2, 2: 3, 3: 3 };
const PREV: Record<Step, Step> = { 1: 1, 2: 1, 3: 2 };

// Wizard Context
interface WizardContextValue {
  step: Step;
  draft: Draft;
  setStep: (step: Step | ((prev: Step) => Step)) => void;
  setDraft: (draft: Draft | ((prev: Draft) => Draft)) => void;
  canNext: boolean;
  onCancel: () => void;
  onFinished: () => void;
  submit: () => Promise<void>;
}

const WizardContext = createContext<WizardContextValue | null>(null);

function useWizardContext() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("Wizard 서브 컴포넌트는 Wizard 내부에서만 사용할 수 있습니다.");
  }
  return context;
}

// Main Wizard Component (CCP 패턴)
interface WizardProps {
  onCancel: () => void;
  onFinished: () => void;
  children: React.ReactNode;
}

export default function CreateMeetingWizard({ onCancel, onFinished, children }: WizardProps) {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>({
    type: null,
    name: "",
    location: "",
    imageFile: null,
    startDate: undefined,
    endDate: undefined,
    capacity: "",
  });

  const createGatheringMutation = useCreateGathering();

  const canNext = useMemo(() => {
    if (step === 1) return !!draft.type;
    if (step === 2) return !!draft.name.trim() && !!draft.location.trim();
    if (step === 3) return !!draft.startDate && !!draft.endDate && !!draft.capacity;
    return false;
  }, [step, draft]);

  const submit = async () => {
    if (
      !draft.type ||
      !draft.name.trim() ||
      !draft.location ||
      !draft.startDate ||
      !draft.endDate ||
      !draft.capacity
    ) {
      return;
    }

    const formatDateTime = (date: Date): string => {
      // 로컬 시간을 그대로 YYYY-MM-DDTHH:MM:SS 형식으로 변환
      // 서버는 UTC/KST 구분 없이 날짜를 그대로 저장함
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const body: CreateGatheringBody = {
      location: draft.location as CreateGatheringBody["location"],
      type: draft.type,
      name: draft.name,
      dateTime: formatDateTime(draft.startDate),
      capacity: Number(draft.capacity),
      image: draft.imageFile || undefined,
      registrationEnd: formatDateTime(draft.endDate),
    };

    try {
      await createGatheringMutation.mutateAsync(body);
      onFinished();
    } catch (error) {
      console.error("모임 생성 실패:", error);
    }
  };

  const contextValue: WizardContextValue = {
    step,
    draft,
    setStep,
    setDraft,
    canNext,
    onCancel,
    onFinished,
    submit,
  };

  return (
    <WizardContext.Provider value={contextValue}>
      <div>{children}</div>
    </WizardContext.Provider>
  );
}

// Header Component
function WizardHeader() {
  const { step, onCancel } = useWizardContext();
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold dark:text-gray-100">모임 만들기 {step}/3</h2>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}
        className="cursor-pointer rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="모달 닫기"
      >
        <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
}
CreateMeetingWizard.Header = WizardHeader;

// Step 1: 모임 타입 선택
function WizardStep1() {
  const { step, draft, setDraft } = useWizardContext();

  if (step !== 1) return null;

  return (
    <div className="min-h-[400px]">
      <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">원하시는 모임 타입을 선택해주세요.</p>
      <div className="space-y-4">
        {TYPE_OPTIONS.map((opt) => {
          const active = draft.type === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => setDraft((d) => ({ ...d, type: opt.key }))}
              className={`flex h-auto w-full cursor-pointer items-center gap-4 rounded-xl p-4 transition-all ${
                active
                  ? "border-2 border-transparent bg-purple-100/70 dark:bg-purple-900/30 [background-image:linear-gradient(rgb(243_232_255_/_0.7),rgb(243_232_255_/_0.7)),linear-gradient(to_right,var(--color-purple-500),var(--color-blue-500))] dark:[background-image:linear-gradient(rgb(88_28_135_/_0.3),rgb(88_28_135_/_0.3)),linear-gradient(to_right,var(--color-purple-500),var(--color-blue-500))] [background-clip:padding-box,border-box] bg-origin-border"
                  : "border-2 border-gray-100 bg-gray-100 hover:border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center">
                <span aria-hidden className="text-4xl">
                  {opt.emoji}
                </span>
              </div>
              <div className="flex flex-1 flex-col items-start gap-1 text-left">
                <div className="text-base font-semibold text-gray-900 dark:text-gray-100">{opt.title}</div>
                <div className="text-sm font-normal text-slate-500 dark:text-slate-400">{opt.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
CreateMeetingWizard.Step1 = WizardStep1;

// Step 2: 모임 정보 입력
function WizardStep2() {
  const { step, draft, setDraft } = useWizardContext();

  if (step !== 2) return null;

  return (
    <div className="min-h-[400px]">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-3">
          <Label htmlFor="meeting-name">모임 이름</Label>
          <Input
            id="meeting-name"
            placeholder="모임 이름을 작성해주세요"
            value={draft.name}
            onChange={(e: any) => setDraft((d) => ({ ...d, name: e.target.value }))}
            size="lg"
          />
        </div>

        <div className="space-y-3">
          <Label>장소</Label>
          <SelectField
            value={draft.location}
            onChange={(value) => setDraft((d) => ({ ...d, location: value }))}
            items={LOCATION_OPTIONS}
            placeholder="장소를 선택해주세요"
            size="lg"
          />
        </div>

        <div className="space-y-3">
          <Label>이미지</Label>
          <FileField
            onFileSelect={(file) => setDraft((d) => ({ ...d, imageFile: file }))}
            size="lg"
            accept="image/*"
            placeholder="이미지를 첨부해주세요"
          />
        </div>
      </form>
    </div>
  );
}
CreateMeetingWizard.Step2 = WizardStep2;

// Step 3: 날짜 및 정원 입력
function WizardStep3() {
  const { step, draft, setDraft } = useWizardContext();

  if (step !== 3) return null;

  return (
    <div className="min-h-[400px]">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-3">
          <Label>모임 날짜</Label>
          <DateTimeField
            value={draft.startDate}
            onChange={(date) => setDraft((d) => ({ ...d, startDate: date }))}
            size="lg"
            placeholder="날짜와 시간을 선택해주세요"
          />
        </div>
        <div className="space-y-3">
          <Label>마감 날짜</Label>
          <DateTimeField
            value={draft.endDate}
            onChange={(date) => setDraft((d) => ({ ...d, endDate: date }))}
            size="lg"
            placeholder="마감 날짜와 시간을 선택해주세요"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="capacity">모임 정원</Label>
          <Input
            id="capacity"
            type="number"
            min={5}
            placeholder="정원을 입력해주세요 (최소 5명)"
            value={draft.capacity}
            onChange={(e: any) =>
              setDraft((d) => ({
                ...d,
                capacity: e.target.value === "" ? "" : Number(e.target.value),
              }))
            }
            size="lg"
          />
        </div>
      </form>
    </div>
  );
}
CreateMeetingWizard.Step3 = WizardStep3;

// Navigation Component (이전/다음/완료 버튼)
function WizardNavigation() {
  const { step, canNext, setStep, onCancel, submit } = useWizardContext();

  return (
    <div className="mt-10 grid grid-cols-2 gap-3">
      <Button
        variant="outlineSoft"
        onClick={step === 1 ? onCancel : () => setStep((s) => PREV[s])}
        size="sm"
        radius="lg"
        className="h-14 cursor-pointer text-base font-semibold md:h-14 md:text-lg"
      >
        {step === 1 ? "취소" : "이전"}
      </Button>
      {step < 3 ? (
        <Button
          disabled={!canNext}
          onClick={() => setStep((s) => NEXT[s])}
          size="sm"
          radius="lg"
          className="h-14 cursor-pointer text-base font-semibold md:h-14 md:text-lg"
        >
          다음
        </Button>
      ) : (
        <Button
          disabled={!canNext}
          onClick={submit}
          size="sm"
          radius="lg"
          className="h-14 cursor-pointer text-base font-semibold md:h-14 md:text-lg"
        >
          모임 만들기
        </Button>
      )}
    </div>
  );
}
CreateMeetingWizard.Navigation = WizardNavigation;
