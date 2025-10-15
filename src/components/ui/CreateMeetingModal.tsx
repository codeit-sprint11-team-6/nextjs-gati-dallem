"use client";

import { useState } from "react";
import Modal from "@/components/common/Modal";

type ServiceType = "달램핏" | "워케이션";


interface CreateMeetingModalProps {
  onClose: () => void;
}

export default function CreateMeetingModal({ onClose }: CreateMeetingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [service, setService] = useState<ServiceType | null>(null);
  const [region, setRegion] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [capacity, setCapacity] = useState<number | "">("");

  const next = () => setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
  const prev = () => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));

  const canNext =
    (step === 1 && !!service) ||
    (step === 2 && !!region) ||
    (step === 3 && !!date && !!deadline && !!capacity);

  const submit = async () => {
    onClose(); // 
  };

  return (
    <Modal className="w-[342px] md:w-[600px]">
      <Modal.Header>모임 만들기 {step}/3</Modal.Header>

      {step === 1 && <Step1Service value={service} onChange={setService} />}

      {step === 2 && (
        <Step2Options
          region={region}
          setRegion={setRegion}
          tags={tags}
          setTags={setTags}
        />
      )}

      {step === 3 && (
        <Step3Schedule
          date={date}
          setDate={setDate}
          deadline={deadline}
          setDeadline={setDeadline}
          capacity={capacity}
          setCapacity={setCapacity}
        />
      )}

      {step < 3 ? (
        <Modal.TwoButton
          rightBtnText="다음"
          rightBtnDisabled={!canNext}
          onRightBtnClick={next}
        />
      ) : (
        <Modal.TwoButton
          rightBtnText="모임 만들기"
          rightBtnDisabled={!canNext}
          onRightBtnClick={submit}
        />
      )}

      {step > 1 && (
        <button
          onClick={prev}
          className="mt-3 text-sm text-gray-500 underline"
          aria-label="이전 단계로 이동"
        >
          이전 단계로
        </button>
      )}
    </Modal>
  );
}


function Card({
  selected,
  children,
  onClick,
}: {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-2xl border p-4 md:p-5 ${
        selected ? "border-purple-500 bg-purple-50" : "border-gray-200 bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function Step1Service({
  value,
  onChange,
}: {
  value: ServiceType | null;
  onChange: (v: ServiceType) => void;
}) {
  const items: ServiceType[] = ["달램핏", "워케이션"];
  return (
    <div className="grid gap-3">
      {items.map((i) => (
        <Card key={i} selected={value === i} onClick={() => onChange(i)}>
          <span className="text-base md:text-lg">{i}</span>
          <span className="text-xs text-gray-500">서비스 선택</span>
        </Card>
      ))}
    </div>
  );
}

function Step2Options({
  region,
  setRegion,
  tags,
  setTags,
}: {
  region: string;
  setRegion: (v: string) => void;
  tags: string[];
  setTags: (v: string[]) => void;
}) {
  return (
    <div className="grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm text-gray-600">지역</span>
        <input
          className="rounded-xl border p-3"
          placeholder="지역을 입력하세요"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm text-gray-600">태그(쉼표 구분)</span>
        <input
          className="rounded-xl border p-3"
          placeholder="예: 요가, 소셜"
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(
              e.currentTarget.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
        />
      </label>
    </div>
  );
}

function Step3Schedule({
  date,
  setDate,
  deadline,
  setDeadline,
  capacity,
  setCapacity,
}: {
  date: string;
  setDate: (v: string) => void;
  deadline: string;
  setDeadline: (v: string) => void;
  capacity: number | "";
  setCapacity: (v: number | "") => void;
}) {
  return (
    <div className="grid gap-4">
      <Field label="모임 날짜">
        <input
          type="date"
          className="w-full rounded-xl border p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Field>

      <Field label="마감 날짜">
        <input
          type="date"
          className="w-full rounded-xl border p-3"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={date || undefined}
        />
      </Field>

      <Field label="정원">
        <input
          type="number"
          className="w-full rounded-xl border p-3"
          placeholder="예: 20"
          value={capacity}
          min={1}
          onChange={(e) =>
            setCapacity(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </Field>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-gray-600">{label}</span>
      {children}
    </label>
  );
}
