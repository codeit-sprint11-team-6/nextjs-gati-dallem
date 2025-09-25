// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#F6F7F9]">
      {/* <div className="flex min-h-screen items-center justify-center bg-slate-50">{children}</div> */}
      <div className="mx-auto flex min-h-dvh max-w-[1200px] items-center px-6">{children}</div>
    </div>
  );
}
