import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "로그인 | 같이달램",
};

export default function LoginPage() {
  return (
    <main className="grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2">
      {/* 좌측: 이미지 자리에 임시 텍스트 */}
      <section className="flex justify-center md:justify-start">
        <div className="text-center select-none md:text-left">
          <div className="mb-4 text-3xl font-semibold text-slate-700">개발자 고민 여기서</div>
          <div className="text-4xl font-bold tracking-tight text-slate-900">같이달램</div>
          <p className="mt-4 text-slate-500">오늘도 같이 모각코에서 함께 해요.</p>
        </div>
      </section>

      {/* 우측: 로그인 카드 */}
      <section className="flex justify-center md:justify-end">
        <LoginForm />
      </section>
    </main>
  );
}
