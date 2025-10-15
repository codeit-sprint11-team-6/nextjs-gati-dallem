"use client";

import { useMemo, useRef, useState } from "react";
import {Button} from "@/components/common/Button";
import {Input} from "@/components/common/Input";

type Step = 1 | 2 | 3;
type MeetingType = "GENERAL" | "FLASH" | "WORKATION";

interface Draft {
  type: MeetingType | null;
  name: string;
  location: string;
  imageFile: File | null;
  startDate: string;
  endDate: string;
  capacity: number | "";
}

interface Props {
  onCancel: () => void;
  onFinished: (draft: Draft) => void;
}

const NEXT: Record<Step, Step> = { 1: 2, 2: 3, 3: 3 };
const PREV: Record<Step, Step> = { 1: 1, 2: 1, 3: 2 };

const TYPE_OPTIONS = [
  { key: "GENERAL",   title: "일반모임",  desc: "정기 스터디/소모임", emoji: "👥" },
  { key: "FLASH",     title: "번개모임",  desc: "번개 만남/모임",    emoji: "⚡️" },
  { key: "WORKATION", title: "워케이션",  desc: "원데이/취미 클래스", emoji: "🏝️" },
] as const;

export default function CreateMeetingWizard({ onCancel, onFinished }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>({
    type: "GENERAL",
    name: "",
    location: "",
    imageFile: null,
    startDate: "",
    endDate: "",
    capacity: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

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
                  <button
                    key={opt.key}
                    onClick={() => setDraft((d) => ({ ...d, type: opt.key } as Draft))}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                        <span aria-hidden>{opt.emoji}</span>
                      </div>
                      <div>
                        <div className="font-medium">{opt.title}</div>
                        <div className="text-xs text-slate-500">{opt.desc}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 2 && (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1 block text-sm text-slate-600">모임 이름</label>
              <Input
                placeholder="모임 이름을 작성해주세요"
                value={draft.name}
                onChange={(e: any) => setDraft((d) => ({ ...d, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-600">장소</label>
              <select
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                value={draft.location}
                onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
              >
                <option value="">장소를 선택해주세요</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="인천">인천</option>
                <option value="부산">부산</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-600">이미지</label>
              <div className="flex items-center gap-3">
                <Input readOnly value={draft.imageFile?.name ?? ""} placeholder="이미지를 첨부해주세요" />
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setDraft((d) => ({ ...d, imageFile: e.target.files?.[0] ?? null }))}
                />
                <Button type="button" variant="secondary" onClick={() => fileRef.current?.click()}>
                  파일 찾기
                </Button>
              </div>
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1 block text-sm text-slate-600">모임 날짜</label>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                value={draft.startDate}
                onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-600">마감 날짜</label>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
                value={draft.endDate}
                onChange={(e) => setDraft((d) => ({ ...d, endDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-600">모임 정원</label>
              <Input
                type="number"
                min={1}
                placeholder="정원을 입력해주세요"
                value={draft.capacity}
                onChange={(e: any) =>
                  setDraft((d) => ({ ...d, capacity: e.target.value === "" ? "" : Number(e.target.value) }))
                }
              />
            </div>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between">
        <Button variant="secondary" onClick={step === 1 ? onCancel : () => setStep((s) => PREV[s])}>
          {step === 1 ? "취소" : "이전"}
        </Button>
        {step < 3 ? (
          <Button disabled={!canNext} onClick={() => setStep((s) => NEXT[s])}>다음</Button>
        ) : (
          <Button disabled={!canNext} onClick={submit}>모임 만들기</Button>
        )}
      </div>
    </div>
  );
}
