"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { SelectField, DateField, FileField } from "@/components/fields/index";
import { Label } from "@/components/ui/Label";

type Step = 1 | 2 | 3;
type MeetingType = "GENERAL" | "FLASH" | "WORKATION";

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
  { label: "서울", value: "서울" },
  { label: "경기", value: "경기" },
  { label: "인천", value: "인천" },
  { label: "부산", value: "부산" },
];

interface Props {
  onCancel: () => void;
  onFinished: (draft: Draft) => void;
}

const NEXT: Record<Step, Step> = { 1: 2, 2: 3, 3: 3 };
const PREV: Record<Step, Step> = { 1: 1, 2: 1, 3: 2 };

const TYPE_OPTIONS = [
  { key: "GENERAL",   title: "스터디",  desc: "정기 스터디/소모임", emoji: "👥" },
  { key: "FLASH",     title: "네트워킹",  desc: "번개 만남/모임",    emoji: "⚡️" },
  { key: "WORKATION", title: "아무거나",  desc: "아무거나/아무거나", emoji: "🏝️" },
] as const;

export default function CreateMeetingWizard({ onCancel, onFinished }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>({
    type: "GENERAL",
    name: "",
    location: "",
    imageFile: null,
    startDate: undefined,
    endDate: undefined,
    capacity: "",
  });

  const canNext = useMemo(() => {
    if (step === 1) return !!draft.type;
    if (step === 2) return draft.name.trim() && draft.location.trim();
    if (step === 3) return !!draft.startDate && !!draft.endDate && !!draft.capacity;
    return false;
  }, [step, draft]);

  const submit = async () => {
    // TODO: API 연동 (FormData 권장)
    onFinished(draft);
  };

  return (
    <div>
      {/* Header (페이지/모달에서 타이틀 감싸줄 수 있어, 여기서는 최소화) */}
      <h2 className="mb-4 text-lg font-semibold">모임 만들기 {step}/3</h2>

      {/* Body */}
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
                    onClick={() => setDraft((d) => ({ ...d, type: opt.key } as Draft))}
                    variant={active ? "selected" : "outlineWhite"}
                    size="lg"
                    radius="lg"
                    className="w-full h-auto py-4 justify-start"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <span aria-hidden className="text-xl">{opt.emoji}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{opt.title}</div>
                      <div className="text-xs text-slate-500 font-normal">{opt.desc}</div>
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
                min={1}
                placeholder="정원을 입력해주세요"
                value={draft.capacity}
                onChange={(e: any) =>
                  setDraft((d) => ({ ...d, capacity: e.target.value === "" ? "" : Number(e.target.value) }))
                }
                size="lg"
              />
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 grid grid-cols-2 gap-3">
        <Button
          variant="outlineSoft"
          onClick={step === 1 ? onCancel : () => setStep((s) => PREV[s])}
          size="sm"
          radius="lg"
          className="h-14 text-base md:h-14 md:text-lg font-semibold"
        >
          {step === 1 ? "취소" : "이전"}
        </Button>
        {step < 3 ? (
          <Button disabled={!canNext} onClick={() => setStep((s) => NEXT[s])} size="sm" radius="lg" className="h-14 text-base md:h-14 md:text-lg font-semibold">
            다음
          </Button>
        ) : (
          <Button disabled={!canNext} onClick={submit} size="sm" radius="lg" className="h-14 text-base md:h-14 md:text-lg font-semibold">
            모임 만들기
          </Button>
        )}
      </div>
    </div>
  );
}
