import { Input } from "@/components/common/Input";
import { ProfileDataType } from "./ProfileUpdateModal";

interface ProfileUpdateFormProps {
  profileData: ProfileDataType;
  onProfileDataChange: (name: string, value: string) => void;
}

export default function ProfileUpdateForm({
  profileData,
  onProfileDataChange,
}: ProfileUpdateFormProps) {
  const labelClassNm = "mx-1 font-medium text-slate-800";
  const inputClassNm =
    "bg-gray-50 text-slate-800 placeholder:text-slate-500 focus:ring-1 disabled:bg-gray-200 disabled:border-gray-300";

  return (
    <form className="grid justify-stretch gap-8">
      <div className="grid gap-2 md:gap-3">
        <label htmlFor="name" className={labelClassNm}>
          이름
        </label>
        <Input
          id="name"
          type="text"
          placeholder="이름을 입력해 주세요"
          className={inputClassNm}
          value={profileData.name}
          onChange={(e) => onProfileDataChange("name", e.target.value)}
          disabled
        />
      </div>
      <div className="grid gap-2 md:gap-3">
        <label htmlFor="companyName" className={labelClassNm}>
          회사
        </label>
        <Input
          id="companyName"
          type="text"
          placeholder="회사명을 입력해 주세요"
          className={inputClassNm}
          value={profileData.companyName}
          onChange={(e) => onProfileDataChange("companyName", e.target.value)}
        />
      </div>
      <div className="grid gap-2 md:gap-3">
        <label htmlFor="email" className={labelClassNm}>
          이메일
        </label>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          className={inputClassNm}
          value={profileData.email}
          onChange={(e) => onProfileDataChange("email", e.target.value)}
          disabled
        />
      </div>
    </form>
  );
}
