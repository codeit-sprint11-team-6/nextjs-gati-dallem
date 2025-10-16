"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { SelectField, DateField, FileField } from "@/components/fields/index";
import { Label } from "@/components/ui/Label";
import { useCreateGathering } from "@/apis/gatherings/gatherings.query";
import type { CreateGatheringBody } from "@/apis/gatherings/gatherings.schema";

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

interface Props {
  onCancel: () => void;
  onFinished: () => void;
}

const NEXT: Record<Step, Step> = { 1: 2, 2: 3, 3: 3 };
const PREV: Record<Step, Step> = { 1: 1, 2: 1, 3: 2 };

const TYPE_OPTIONS = [
  {
    key: "OFFICE_STRETCHING" as const,
    title: "오피스 스트레칭",
    desc: "업무 중 스트레칭",
    emoji: "🧘",
  },
  { key: "MINDFULNESS" as const, title: "마인드풀니스", desc: "명상과 힐링", emoji: "🧠" },
  { key: "WORKATION" as const, title: "워케이션", desc: "일과 휴가의 결합", emoji: "🏝️" },
] as const;

export default function CreateMeetingWizard({ onCancel, onFinished }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>({
    type: "OFFICE_STRETCHING",
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
    if (step === 2) return draft.name.trim() && draft.location.trim();
    if (step === 3) return !!draft.startDate && !!draft.endDate && !!draft.capacity;
    return false;
  }, [step, draft]);

  const submit = async () => {
    // 유효성 검사
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

    // 날짜를 ISO 형식 문자열로 변환 (YYYY-MM-DDTHH:MM:SS)
    const formatDateTime = (date: Date): string => {
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
      // 에러는 QueryCache에서 전역으로 처리됨
      console.error("모임 생성 실패:", error);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">모임 만들기 {step}/3</h2>

      <div className="min-h-[280px]">
        {step === 1 && (
          <>
            <p className="mb-4 text-sm text-slate-600">원하시는 모임 타입을 선택해주세요.</p>
            <div className="space-y-3">
              {TYPE_OPTIONS.map((opt) => {
                const active = draft.type === opt.key;
                return (
                  <Button
                    key={opt.key}
                    onClick={() => setDraft((d) => ({ ...d, type: opt.key }) as Draft)}
                    variant={active ? "selected" : "outlineWhite"}
                    size="lg"
                    radius="lg"
                    className="h-auto w-full justify-start py-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <span aria-hidden className="text-xl">
                        {opt.emoji}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{opt.title}</div>
                      <div className="text-xs font-normal text-slate-500">{opt.desc}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </>
        )}

        {step === 2 && (
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="meeting-name">모임 이름</Label>
              <Input
                id="meeting-name"
                placeholder="모임 이름을 작성해주세요"
                value={draft.name}
                onChange={(e: any) => setDraft((d) => ({ ...d, name: e.target.value }))}
                size="lg"
              />
            </div>

            <div className="space-y-2">
              <Label>장소</Label>
              <SelectField
                value={draft.location}
                onChange={(value) => setDraft((d) => ({ ...d, location: value }))}
                items={LOCATION_OPTIONS}
                placeholder="장소를 선택해주세요"
                size="lg"
              />
            </div>

            <div className="space-y-2">
              <Label>이미지</Label>
              <FileField
                onFileSelect={(file) => setDraft((d) => ({ ...d, imageFile: file }))}
                size="lg"
                accept="image/*"
                placeholder="이미지를 첨부해주세요"
              />
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label>모임 날짜</Label>
              <DateField
                value={draft.startDate}
                onChange={(date) => setDraft((d) => ({ ...d, startDate: date }))}
                size="lg"
                placeholder="날짜를 선택해주세요"
              />
            </div>
            <div className="space-y-2">
              <Label>마감 날짜</Label>
              <DateField
                value={draft.endDate}
                onChange={(date) => setDraft((d) => ({ ...d, endDate: date }))}
                size="lg"
                placeholder="마감 날짜를 선택해주세요"
              />
            </div>
            <div className="space-y-2">
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
        )}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3">
        <Button
          variant="outlineSoft"
          onClick={step === 1 ? onCancel : () => setStep((s) => PREV[s])}
          size="sm"
          radius="lg"
          className="h-14 text-base font-semibold md:h-14 md:text-lg"
        >
          {step === 1 ? "취소" : "이전"}
        </Button>
        {step < 3 ? (
          <Button
            disabled={!canNext}
            onClick={() => setStep((s) => NEXT[s])}
            size="sm"
            radius="lg"
            className="h-14 text-base font-semibold md:h-14 md:text-lg"
          >
            다음
          </Button>
        ) : (
          <Button
            disabled={!canNext}
            onClick={submit}
            size="sm"
            radius="lg"
            className="h-14 text-base font-semibold md:h-14 md:text-lg"
          >
            모임 만들기
          </Button>
        )}
      </div>
    </div>
  );
}
