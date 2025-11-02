// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="box-border min-h-[calc(100dvh-49px)] bg-[#F6F7F9] px-6 py-12 max-sm:px-0 md:min-h-[calc(100dvh-89px)]">
      <div className="mx-auto flex min-h-full max-w-[1200px] items-center px-6 py-12 max-sm:px-0">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
